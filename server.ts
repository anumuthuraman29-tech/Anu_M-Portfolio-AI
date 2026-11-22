import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import express, { type NextFunction, type Request, type Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { INITIAL_CERTIFICATES } from './src/data/portfolioData.ts';
import type { CertificateCategory, CertificateItem, ContactInquiry } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');
const UPLOAD_DIR = path.resolve(DATA_DIR, 'uploads');
const CERTS_FILE = path.resolve(DATA_DIR, 'certificates.json');
const INQUIRIES_FILE = path.resolve(DATA_DIR, 'inquiries.json');
const ADMIN_FILE = path.resolve(DATA_DIR, 'admin.json');
const PUBLIC_ASSETS_DIR = path.resolve(__dirname, 'public', 'assets', 'aistudio');

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Session signing secret: read from environment or generate ephemeral 32-byte key in memory
const SESSION_SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.length >= 16
    ? process.env.SESSION_SECRET
    : crypto.randomBytes(32).toString('hex');

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours
const revokedTokens = new Set<string>();

// Simple in-memory rate limiter for contact & auth routes
interface RateEntry {
  count: number;
  resetAt: number;
}
const rateBuckets = new Map<string, RateEntry>();

function checkRateLimit(key: string, maxRequests: number, windowMs: number): boolean {
  const now = Date.now();
  const existing = rateBuckets.get(key);
  if (!existing || now > existing.resetAt) {
    rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (existing.count >= maxRequests) {
    return false;
  }
  existing.count += 1;
  return true;
}

function getClientIp(req: Request): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

// Persistent JSON helpers
function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJsonAtomic(filePath: string, data: unknown): void {
  const tmpPath = `${filePath}.${crypto.randomBytes(6).toString('hex')}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tmpPath, filePath);
}

// Seed certificates store on first boot
if (!fs.existsSync(CERTS_FILE)) {
  writeJsonAtomic(CERTS_FILE, INITIAL_CERTIFICATES);
}

interface StoredAdminCredential {
  salt: string;
  hash: string;
  createdAt: string;
}

function getEnvPasscode(): string {
  return (process.env.ADMIN_PASSCODE || '').trim();
}

function getStoredAdmin(): StoredAdminCredential | null {
  return readJsonFile<StoredAdminCredential | null>(ADMIN_FILE, null);
}

function hashPasscode(passcode: string, salt: string): string {
  return crypto.scryptSync(passcode, salt, 64).toString('hex');
}

function verifyPasscode(candidate: string): boolean {
  const envPasscode = getEnvPasscode();
  if (envPasscode.length > 0) {
    const expectedDigest = crypto.createHash('sha256').update(envPasscode).digest();
    const candidateDigest = crypto.createHash('sha256').update(candidate).digest();
    return crypto.timingSafeEqual(expectedDigest, candidateDigest);
  }
  const stored = getStoredAdmin();
  if (!stored) return false;
  const candidateHash = Buffer.from(hashPasscode(candidate, stored.salt), 'hex');
  const storedHash = Buffer.from(stored.hash, 'hex');
  if (candidateHash.length !== storedHash.length) return false;
  return crypto.timingSafeEqual(candidateHash, storedHash);
}

function createSessionToken(): string {
  const payload = Buffer.from(
    JSON.stringify({
      sub: 'owner',
      jti: crypto.randomUUID(),
      exp: Date.now() + SESSION_TTL_MS,
    })
  ).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySessionToken(token: string | undefined): { valid: boolean; jti?: string } {
  if (!token || !token.includes('.')) return { valid: false };
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return { valid: false };
  const expectedSig = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(payload)
    .digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false };
  }
  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf-8')) as {
      sub?: string;
      jti?: string;
      exp?: number;
    };
    if (parsed.sub !== 'owner' || !parsed.exp || Date.now() > parsed.exp) {
      return { valid: false };
    }
    if (parsed.jti && revokedTokens.has(parsed.jti)) {
      return { valid: false };
    }
    return { valid: true, jti: parsed.jti };
  } catch {
    return { valid: false };
  }
}

function extractBearerToken(req: Request): string | undefined {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return undefined;
  return header.slice(7).trim();
}

function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const token = extractBearerToken(req);
  const check = verifySessionToken(token);
  if (!check.valid) {
    res.status(401).json({ error: 'Owner authentication required.' });
    return;
  }
  next();
}

const ALLOWED_CATEGORIES: CertificateCategory[] = [
  'Data Science',
  'Generative AI',
  'AI & Engineering',
  'Data Analytics',
];

function sanitizeOptionalUrl(raw: unknown): string | undefined {
  if (typeof raw !== 'string' || raw.trim().length === 0) return undefined;
  const trimmed = raw.trim();
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return undefined;
    }
    return parsed.toString();
  } catch {
    return undefined;
  }
}

function validateAndSaveUpload(
  fileBase64: string,
  originalName: string
): { fileUrl: string; previewUrl: string; fileType: 'pdf' | 'image'; fileName: string } {
  const cleanBase64 = fileBase64.includes(',') ? fileBase64.split(',')[1] : fileBase64;
  const buffer = Buffer.from(cleanBase64, 'base64');

  if (buffer.length === 0 || buffer.length > 8 * 1024 * 1024) {
    throw new Error('File must be between 1 byte and 8 MB.');
  }

  // Magic-byte signature detection (strictly PDF, PNG, JPEG only)
  const isPdf = buffer.subarray(0, 5).toString('ascii') === '%PDF-';
  const isPng =
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47;
  const isJpeg = buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;

  if (!isPdf && !isPng && !isJpeg) {
    throw new Error('Only verified PDF, PNG, or JPG certificate files are supported.');
  }

  const ext = isPdf ? '.pdf' : isPng ? '.png' : '.jpg';
  const safeStoredName = `cert_${crypto.randomUUID()}${ext}`;
  const destPath = path.resolve(UPLOAD_DIR, safeStoredName);

  if (!destPath.startsWith(UPLOAD_DIR + path.sep)) {
    throw new Error('Invalid upload target path.');
  }

  fs.writeFileSync(destPath, buffer);

  const safeDownloadName =
    (originalName || `Certificate${ext}`)
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .slice(0, 80) || `Certificate${ext}`;

  const servedUrl = `/api/certificates/files/${safeStoredName}`;

  return {
    fileUrl: servedUrl,
    previewUrl: isPdf ? '' : servedUrl,
    fileType: isPdf ? 'pdf' : 'image',
    fileName: safeDownloadName.endsWith(ext) ? safeDownloadName : `${safeDownloadName}${ext}`,
  };
}

const RESUME_ALLOWLIST: Record<string, { diskFile: string; downloadName: string }> = {
  'ai-ml': {
    diskFile: 'Anu_M_RESUME_AI_3b1b51e1.pdf',
    downloadName: 'Anu_M_Resume.pdf',
  },
  'applied-science': {
    diskFile: 'Anu_M_RESUME_88f1a52e.pdf',
    downloadName: 'Anu_M_Data_Science_Resume.pdf',
  },
  'genai-analytics': {
    diskFile: 'Anu_M_GenAI_Data_Analytics_Resume_b61c6df6.pdf',
    downloadName: 'Anu_M_GenAI_Analytics_Resume.pdf',
  },
  'cover-letter': {
    diskFile: 'Anu_M_GenAI_Data_Analytics_Cover_Letter_2e1e2ea9.pdf',
    downloadName: 'Anu_M_Cover_Letter.pdf',
  },
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.disable('x-powered-by');
  app.use(express.json({ limit: '12mb' }));

  // ---------------------------------------------------------------------------
  // Public Resume Download Route (Strict Allowlist, Exact Filename)
  // ---------------------------------------------------------------------------
  app.get('/api/resume/download', (req: Request, res: Response) => {
    const docKey = typeof req.query.doc === 'string' ? req.query.doc : 'ai-ml';
    const entry = RESUME_ALLOWLIST[docKey] || RESUME_ALLOWLIST['ai-ml'];
    const targetPath = path.resolve(PUBLIC_ASSETS_DIR, entry.diskFile);

    if (!targetPath.startsWith(PUBLIC_ASSETS_DIR + path.sep) || !fs.existsSync(targetPath)) {
      res.status(404).json({ error: 'Resume file not found.' });
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Disposition', `attachment; filename="${entry.downloadName}"`);
    res.sendFile(targetPath);
  });

  // ---------------------------------------------------------------------------
  // Public Contact Form Submission (Real Server Persistence + Validation)
  // ---------------------------------------------------------------------------
  app.post('/api/contact', (req: Request, res: Response) => {
    const ip = getClientIp(req);
    if (!checkRateLimit(`contact:${ip}`, 10, 15 * 60 * 1000)) {
      res.status(429).json({
        error: 'Too many messages sent recently. Please try again in a few minutes.',
      });
      return;
    }

    const { name, email, subject, message } = req.body as Record<string, unknown>;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof subject !== 'string' ||
      typeof message !== 'string'
    ) {
      res.status(400).json({ error: 'All fields (Name, Email, Subject, Message) are required.' });
      return;
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    if (cleanName.length < 2 || cleanName.length > 120) {
      res.status(400).json({ error: 'Please enter a valid name (2–120 characters).' });
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(cleanEmail) || cleanEmail.length > 180) {
      res.status(400).json({ error: 'Please enter a valid email address.' });
      return;
    }
    if (cleanSubject.length < 3 || cleanSubject.length > 180) {
      res.status(400).json({ error: 'Please provide a clear subject (3–180 characters).' });
      return;
    }
    if (cleanMessage.length < 10 || cleanMessage.length > 3000) {
      res.status(400).json({ error: 'Message must be between 10 and 3000 characters.' });
      return;
    }

    const inquiry: ContactInquiry = {
      id: `INQ-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      name: cleanName,
      email: cleanEmail,
      subject: cleanSubject,
      message: cleanMessage,
      submittedAt: new Date().toISOString(),
    };

    try {
      const existing = readJsonFile<ContactInquiry[]>(INQUIRIES_FILE, []);
      existing.unshift(inquiry);
      writeJsonAtomic(INQUIRIES_FILE, existing.slice(0, 200));

      res.status(201).json({
        ok: true,
        referenceId: inquiry.id,
        submittedAt: inquiry.submittedAt,
        message: 'Your message has been delivered and recorded for Anu M.',
      });
    } catch {
      res.status(500).json({ error: 'Unable to record inquiry right now. Please email Anu directly.' });
    }
  });

  // ---------------------------------------------------------------------------
  // Public Certificates Read & Confined File Delivery
  // ---------------------------------------------------------------------------
  app.get('/api/certificates', (_req: Request, res: Response) => {
    const certs = readJsonFile<CertificateItem[]>(CERTS_FILE, INITIAL_CERTIFICATES);
    res.json({ certificates: certs });
  });

  app.get('/api/certificates/files/:filename', (req: Request, res: Response) => {
    const rawName = String(req.params.filename || '');
    const safeBase = path.basename(rawName);
    if (safeBase !== rawName || !/^[a-zA-Z0-9._-]+$/.test(safeBase)) {
      res.status(400).json({ error: 'Invalid file identifier.' });
      return;
    }

    const resolved = path.resolve(UPLOAD_DIR, safeBase);
    if (!resolved.startsWith(UPLOAD_DIR + path.sep) || !fs.existsSync(resolved)) {
      res.status(404).json({ error: 'Certificate file not found.' });
      return;
    }

    const ext = path.extname(safeBase).toLowerCase();
    const mimeMap: Record<string, string> = {
      '.pdf': 'application/pdf',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
    };
    const contentType = mimeMap[ext];
    if (!contentType) {
      res.status(400).json({ error: 'Unsupported file type.' });
      return;
    }

    res.setHeader('Content-Type', contentType);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.query.download === '1') {
      res.setHeader('Content-Disposition', `attachment; filename="${safeBase}"`);
    }
    res.sendFile(resolved);
  });

  // ---------------------------------------------------------------------------
  // Owner Authentication (First-Run Claim or ADMIN_PASSCODE Env)
  // ---------------------------------------------------------------------------
  app.get('/api/admin/status', (req: Request, res: Response) => {
    const envManaged = getEnvPasscode().length > 0;
    const claimed = Boolean(getStoredAdmin());
    const auth = verifySessionToken(extractBearerToken(req));
    res.json({
      configured: envManaged || claimed,
      envManaged,
      authenticated: auth.valid,
    });
  });

  app.post('/api/admin/setup', (req: Request, res: Response) => {
    if (getEnvPasscode().length > 0 || getStoredAdmin()) {
      res.status(409).json({ error: 'Owner passcode is already configured. Please sign in.' });
      return;
    }

    const { passcode } = req.body as Record<string, unknown>;
    if (typeof passcode !== 'string' || passcode.trim().length < 8 || passcode.length > 128) {
      res.status(400).json({ error: 'Choose an owner passcode with at least 8 characters.' });
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const hash = hashPasscode(passcode.trim(), salt);
    writeJsonAtomic(ADMIN_FILE, {
      salt,
      hash,
      createdAt: new Date().toISOString(),
    });

    const token = createSessionToken();
    res.status(201).json({ ok: true, token });
  });

  app.post('/api/admin/login', (req: Request, res: Response) => {
    const ip = getClientIp(req);
    if (!checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000)) {
      res.status(429).json({ error: 'Too many sign-in attempts. Please wait before retrying.' });
      return;
    }

    if (getEnvPasscode().length === 0 && !getStoredAdmin()) {
      res.status(400).json({ error: 'Owner passcode is not set up yet.' });
      return;
    }

    const { passcode } = req.body as Record<string, unknown>;
    if (typeof passcode !== 'string' || !verifyPasscode(passcode.trim())) {
      res.status(401).json({ error: 'Invalid owner passcode.' });
      return;
    }

    const token = createSessionToken();
    res.json({ ok: true, token });
  });

  app.post('/api/admin/logout', (req: Request, res: Response) => {
    const token = extractBearerToken(req);
    const check = verifySessionToken(token);
    if (check.jti) {
      revokedTokens.add(check.jti);
    }
    res.json({ ok: true });
  });

  // ---------------------------------------------------------------------------
  // Protected Owner Certificate Management & Inquiry Inbox
  // ---------------------------------------------------------------------------
  app.post('/api/certificates', requireAdmin, (req: Request, res: Response) => {
    const {
      title,
      issuer,
      issueDate,
      credentialId,
      verifyUrl,
      category,
      fileBase64,
      fileName,
    } = req.body as Record<string, unknown>;

    if (
      typeof title !== 'string' ||
      title.trim().length < 2 ||
      typeof issuer !== 'string' ||
      issuer.trim().length < 2
    ) {
      res.status(400).json({ error: 'Certificate title and issuing organization are required.' });
      return;
    }

    if (typeof fileBase64 !== 'string' || fileBase64.length === 0) {
      res.status(400).json({ error: 'Please upload a certificate file (PDF, PNG, or JPG).' });
      return;
    }

    const safeCategory: CertificateCategory = ALLOWED_CATEGORIES.includes(
      category as CertificateCategory
    )
      ? (category as CertificateCategory)
      : 'Data Science';

    try {
      const saved = validateAndSaveUpload(
        fileBase64,
        typeof fileName === 'string' ? fileName : 'Certificate'
      );

      const newCert: CertificateItem = {
        id: `cert-${crypto.randomUUID().slice(0, 8)}`,
        title: title.trim().slice(0, 140),
        issuer: issuer.trim().slice(0, 100),
        issueDate: typeof issueDate === 'string' ? issueDate.trim().slice(0, 50) : '',
        credentialId:
          typeof credentialId === 'string' && credentialId.trim()
            ? credentialId.trim().slice(0, 80)
            : undefined,
        verifyUrl: sanitizeOptionalUrl(verifyUrl),
        category: safeCategory,
        fileUrl: saved.fileUrl,
        previewUrl: saved.previewUrl,
        fileType: saved.fileType,
        fileName: saved.fileName,
        isUploadedCustom: true,
      };

      const certs = readJsonFile<CertificateItem[]>(CERTS_FILE, INITIAL_CERTIFICATES);
      certs.push(newCert);
      writeJsonAtomic(CERTS_FILE, certs);

      res.status(201).json({ certificate: newCert, certificates: certs });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unable to save uploaded certificate.';
      res.status(400).json({ error: msg });
    }
  });

  app.put('/api/certificates/:id', requireAdmin, (req: Request, res: Response) => {
    const id = String(req.params.id || '');
    const certs = readJsonFile<CertificateItem[]>(CERTS_FILE, INITIAL_CERTIFICATES);
    const index = certs.findIndex((c) => c.id === id);

    if (index === -1) {
      res.status(404).json({ error: 'Certificate not found.' });
      return;
    }

    const existing = certs[index];
    const {
      title,
      issuer,
      issueDate,
      credentialId,
      verifyUrl,
      category,
      fileBase64,
      fileName,
    } = req.body as Record<string, unknown>;

    const updated: CertificateItem = {
      ...existing,
      title:
        typeof title === 'string' && title.trim().length >= 2
          ? title.trim().slice(0, 140)
          : existing.title,
      issuer:
        typeof issuer === 'string' && issuer.trim().length >= 2
          ? issuer.trim().slice(0, 100)
          : existing.issuer,
      issueDate:
        typeof issueDate === 'string' ? issueDate.trim().slice(0, 50) : existing.issueDate,
      credentialId:
        typeof credentialId === 'string'
          ? credentialId.trim().slice(0, 80) || undefined
          : existing.credentialId,
      verifyUrl:
        typeof verifyUrl === 'string'
          ? verifyUrl.trim() === ''
            ? undefined
            : sanitizeOptionalUrl(verifyUrl) ?? existing.verifyUrl
          : existing.verifyUrl,
      category: ALLOWED_CATEGORIES.includes(category as CertificateCategory)
        ? (category as CertificateCategory)
        : existing.category,
    };

    if (typeof fileBase64 === 'string' && fileBase64.length > 0) {
      try {
        const saved = validateAndSaveUpload(
          fileBase64,
          typeof fileName === 'string' ? fileName : existing.fileName
        );
        updated.fileUrl = saved.fileUrl;
        updated.previewUrl = saved.previewUrl;
        updated.fileType = saved.fileType;
        updated.fileName = saved.fileName;
        updated.isUploadedCustom = true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Invalid replacement file.';
        res.status(400).json({ error: msg });
        return;
      }
    }

    certs[index] = updated;
    writeJsonAtomic(CERTS_FILE, certs);
    res.json({ certificate: updated, certificates: certs });
  });

  app.delete('/api/certificates/:id', requireAdmin, (req: Request, res: Response) => {
    const id = String(req.params.id || '');
    const certs = readJsonFile<CertificateItem[]>(CERTS_FILE, INITIAL_CERTIFICATES);
    const target = certs.find((c) => c.id === id);

    if (!target) {
      res.status(404).json({ error: 'Certificate not found.' });
      return;
    }

    // Safely delete custom uploaded file if confined inside UPLOAD_DIR
    if (target.isUploadedCustom && target.fileUrl.startsWith('/api/certificates/files/')) {
      const fileBase = path.basename(target.fileUrl);
      const resolved = path.resolve(UPLOAD_DIR, fileBase);
      if (resolved.startsWith(UPLOAD_DIR + path.sep) && fs.existsSync(resolved)) {
        try {
          fs.unlinkSync(resolved);
        } catch {
          // ignore cleanup failure
        }
      }
    }

    const nextCerts = certs.filter((c) => c.id !== id);
    writeJsonAtomic(CERTS_FILE, nextCerts);
    res.json({ ok: true, certificates: nextCerts });
  });

  app.get('/api/inquiries', requireAdmin, (_req: Request, res: Response) => {
    const inquiries = readJsonFile<ContactInquiry[]>(INQUIRIES_FILE, []);
    res.json({ inquiries });
  });

  app.delete('/api/inquiries/:id', requireAdmin, (req: Request, res: Response) => {
    const id = String(req.params.id || '');
    const inquiries = readJsonFile<ContactInquiry[]>(INQUIRIES_FILE, []);
    const next = inquiries.filter((item) => item.id !== id);
    writeJsonAtomic(INQUIRIES_FILE, next);
    res.json({ ok: true, inquiries: next });
  });

  // ---------------------------------------------------------------------------
  // Frontend Serving (Vite Dev Middleware vs Production dist/)
  // ---------------------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ANU M. Crimson Editorial Portfolio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
