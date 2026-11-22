import {
  CheckCircle2,
  Edit3,
  Inbox,
  KeyRound,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type ChangeEvent, type FormEvent, useCallback, useEffect, useState } from 'react';
import type { CertificateCategory, CertificateItem, ContactInquiry } from '../types.ts';

interface OwnerAdminModalProps {
  open: boolean;
  onClose: () => void;
  certificates: CertificateItem[];
  onCertificatesUpdated: (next: CertificateItem[]) => void;
}

const CATEGORIES: CertificateCategory[] = [
  'Data Science',
  'Generative AI',
  'AI & Engineering',
  'Data Analytics',
];

export function OwnerAdminModal({
  open,
  onClose,
  certificates,
  onCertificatesUpdated,
}: OwnerAdminModalProps) {
  const [statusLoading, setStatusLoading] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [envManaged, setEnvManaged] = useState(false);
  // Bearer token kept strictly in React memory (never persisted to localStorage)
  const [token, setToken] = useState<string | null>(null);
  const [passcode, setPasscode] = useState('');
  const [confirmPasscode, setConfirmPasscode] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authBusy, setAuthBusy] = useState(false);

  const [tab, setTab] = useState<'certificates' | 'inquiries'>('certificates');
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);

  // Add / Edit Certificate Form
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [credentialId, setCredentialId] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [category, setCategory] = useState<CertificateCategory>('Data Science');
  const [fileBase64, setFileBase64] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [formBusy, setFormBusy] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const checkAdminStatus = useCallback(async (activeToken: string | null) => {
    setStatusLoading(true);
    try {
      const headers: Record<string, string> = {};
      if (activeToken) headers.Authorization = `Bearer ${activeToken}`;
      const res = await fetch('/api/admin/status', { headers });
      if (res.ok) {
        const data = (await res.json()) as {
          configured: boolean;
          envManaged: boolean;
          authenticated: boolean;
        };
        setConfigured(data.configured);
        setEnvManaged(data.envManaged);
        if (!data.authenticated && activeToken) {
          setToken(null);
        }
      }
    } catch {
      // ignore
    } finally {
      setStatusLoading(false);
    }
  }, []);

  const loadInquiries = useCallback(async (activeToken: string) => {
    setInquiriesLoading(true);
    try {
      const res = await fetch('/api/inquiries', {
        headers: { Authorization: `Bearer ${activeToken}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { inquiries: ContactInquiry[] };
        setInquiries(data.inquiries || []);
      }
    } catch {
      // ignore
    } finally {
      setInquiriesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    checkAdminStatus(token);
    if (token) {
      loadInquiries(token);
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, token, checkAdminStatus, loadInquiries, onClose]);

  const resetCertForm = () => {
    setEditingId(null);
    setTitle('');
    setIssuer('');
    setIssueDate('');
    setCredentialId('');
    setVerifyUrl('');
    setCategory('Data Science');
    setFileBase64('');
    setFileName('');
  };

  const startEditing = (cert: CertificateItem) => {
    setEditingId(cert.id);
    setTitle(cert.title);
    setIssuer(cert.issuer);
    setIssueDate(cert.issueDate || '');
    setCredentialId(cert.credentialId || '');
    setVerifyUrl(cert.verifyUrl || '');
    setCategory(cert.category);
    setFileBase64('');
    setFileName('');
    setFormMessage(null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (!allowedTypes.includes(file.type)) {
      setFormMessage({ type: 'err', text: 'Only PDF, PNG, and JPG files are supported.' });
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setFormMessage({ type: 'err', text: 'File size must be under 8 MB.' });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setFileBase64(reader.result);
        setFileName(file.name);
        setFormMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSetupOrLogin = async (e: FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!configured && passcode !== confirmPasscode) {
      setAuthError('Passcodes do not match.');
      return;
    }

    setAuthBusy(true);
    try {
      const endpoint = configured ? '/api/admin/login' : '/api/admin/setup';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode }),
      });
      const data = (await res.json()) as { token?: string; error?: string };
      if (!res.ok || !data.token) {
        setAuthError(data.error || 'Authentication failed.');
        return;
      }
      setToken(data.token);
      setConfigured(true);
      setPasscode('');
      setConfirmPasscode('');
      loadInquiries(data.token);
    } catch {
      setAuthError('Unable to reach server. Please retry.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleLogout = async () => {
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    setToken(null);
    resetCertForm();
  };

  const handleSaveCertificate = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setFormMessage(null);

    if (!editingId && !fileBase64) {
      setFormMessage({ type: 'err', text: 'Please select a PDF, PNG, or JPG certificate file.' });
      return;
    }

    setFormBusy(true);
    try {
      const endpoint = editingId ? `/api/certificates/${editingId}` : '/api/certificates';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          issuer,
          issueDate,
          credentialId,
          verifyUrl,
          category,
          fileBase64: fileBase64 || undefined,
          fileName: fileName || undefined,
        }),
      });
      const data = (await res.json()) as {
        certificates?: CertificateItem[];
        error?: string;
      };
      if (!res.ok || !data.certificates) {
        setFormMessage({ type: 'err', text: data.error || 'Could not save certificate.' });
        return;
      }
      onCertificatesUpdated(data.certificates);
      setFormMessage({
        type: 'ok',
        text: editingId ? 'Certificate updated.' : 'New certificate uploaded and published.',
      });
      resetCertForm();
    } catch {
      setFormMessage({ type: 'err', text: 'Network error while saving certificate.' });
    } finally {
      setFormBusy(false);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!token) return;
    setFormMessage(null);
    try {
      const res = await fetch(`/api/certificates/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await res.json()) as {
        certificates?: CertificateItem[];
        error?: string;
      };
      if (res.ok && data.certificates) {
        onCertificatesUpdated(data.certificates);
        if (editingId === id) resetCertForm();
        setFormMessage({ type: 'ok', text: 'Certificate removed.' });
      } else {
        setFormMessage({ type: 'err', text: data.error || 'Failed to delete certificate.' });
      }
    } catch {
      setFormMessage({ type: 'err', text: 'Network error while removing certificate.' });
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!token) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = (await res.json()) as { inquiries: ContactInquiry[] };
        setInquiries(data.inquiries || []);
      }
    } catch {
      // ignore
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="owner-admin-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-4xl max-h-[90vh] bg-[#080808] border border-[#292929] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-[#151515] border-b border-[#292929] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Lock className="w-4 h-4 text-[#D20A24]" aria-hidden="true" />
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold">
                    Protected Owner Workspace
                  </p>
                  <h3
                    id="owner-admin-title"
                    className="font-heading text-lg tracking-[0.06em] uppercase text-[#F5F5F5]"
                  >
                    Certificate Management &amp; Inbox
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {token && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] border border-[#292929] bg-[#080808] text-[#929292] hover:text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Sign Out</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-9 h-9 border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer"
                  aria-label="Close owner workspace"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-6">
              {statusLoading ? (
                <p className="text-sm text-[#929292] py-12 text-center">
                  Checking workspace security status...
                </p>
              ) : !token ? (
                <div className="max-w-md mx-auto py-8">
                  <div className="bg-[#151515] border border-[#292929] p-6 sm:p-8">
                    <div className="flex items-center gap-2.5 mb-3">
                      <KeyRound className="w-5 h-5 text-[#D20A24]" aria-hidden="true" />
                      <h4 className="font-heading text-xl tracking-[0.06em] uppercase text-[#F5F5F5]">
                        {configured ? 'Owner Sign-In' : 'Claim Owner Passcode'}
                      </h4>
                    </div>

                    <p className="text-xs leading-relaxed text-[#929292] mb-6">
                      {configured
                        ? envManaged
                          ? 'Enter the configured ADMIN_PASSCODE to manage certificates and view contact inquiries.'
                          : 'Enter your owner passcode to add, edit, replace, or remove certificates.'
                        : 'First-time setup: create a secure owner passcode (minimum 8 characters) to lock certificate management and your contact inquiry inbox.'}
                    </p>

                    <form onSubmit={handleSetupOrLogin} className="space-y-4">
                      <div>
                        <label
                          htmlFor="admin-passcode"
                          className="block text-[11px] uppercase tracking-[0.14em] text-[#D4D4D4] mb-1.5"
                        >
                          {configured ? 'Passcode' : 'New Owner Passcode'}
                        </label>
                        <input
                          id="admin-passcode"
                          type="password"
                          required
                          minLength={configured ? 1 : 8}
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          placeholder={configured ? 'Enter owner passcode' : 'At least 8 characters'}
                          className="w-full px-3.5 py-2.5 text-sm bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                        />
                      </div>

                      {!configured && (
                        <div>
                          <label
                            htmlFor="admin-confirm-passcode"
                            className="block text-[11px] uppercase tracking-[0.14em] text-[#D4D4D4] mb-1.5"
                          >
                            Confirm Passcode
                          </label>
                          <input
                            id="admin-confirm-passcode"
                            type="password"
                            required
                            minLength={8}
                            value={confirmPasscode}
                            onChange={(e) => setConfirmPasscode(e.target.value)}
                            placeholder="Repeat passcode"
                            className="w-full px-3.5 py-2.5 text-sm bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                          />
                        </div>
                      )}

                      {authError && (
                        <p role="alert" className="text-xs text-[#F87171]">
                          {authError}
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={authBusy}
                        className="w-full py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] disabled:opacity-50 transition-colors cursor-pointer"
                      >
                        {authBusy
                          ? 'Verifying...'
                          : configured
                            ? 'Unlock Workspace'
                            : 'Claim & Unlock Workspace'}
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Authenticated Tabs */}
                  <div className="flex items-center gap-2 border-b border-[#292929] pb-4">
                    <button
                      type="button"
                      onClick={() => setTab('certificates')}
                      className={`px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] border cursor-pointer ${
                        tab === 'certificates'
                          ? 'bg-[#D20A24] border-[#D20A24] text-[#F5F5F5]'
                          : 'bg-[#151515] border-[#292929] text-[#929292] hover:text-[#F5F5F5]'
                      }`}
                    >
                      Certificates ({certificates.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTab('inquiries');
                        if (token) loadInquiries(token);
                      }}
                      className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] border cursor-pointer ${
                        tab === 'inquiries'
                          ? 'bg-[#D20A24] border-[#D20A24] text-[#F5F5F5]'
                          : 'bg-[#151515] border-[#292929] text-[#929292] hover:text-[#F5F5F5]'
                      }`}
                    >
                      <Inbox className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Contact Inquiries ({inquiries.length})</span>
                    </button>
                  </div>

                  {tab === 'certificates' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Add / Edit Form */}
                      <form
                        onSubmit={handleSaveCertificate}
                        className="lg:col-span-5 bg-[#151515] border border-[#292929] p-5 space-y-4 h-fit"
                      >
                        <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#292929]">
                          <h4 className="font-heading text-sm tracking-[0.14em] uppercase text-[#F5F5F5]">
                            {editingId ? 'Edit Certificate' : 'Add New Certificate'}
                          </h4>
                          {editingId && (
                            <button
                              type="button"
                              onClick={resetCertForm}
                              className="text-[11px] text-[#929292] hover:text-[#F5F5F5] cursor-pointer"
                            >
                              Cancel Edit
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                            Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Machine Learning Specialization"
                            className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                              Organization *
                            </label>
                            <input
                              type="text"
                              required
                              value={issuer}
                              onChange={(e) => setIssuer(e.target.value)}
                              placeholder="e.g., Infosys Springboard"
                              className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                              Issue Date
                            </label>
                            <input
                              type="text"
                              value={issueDate}
                              onChange={(e) => setIssueDate(e.target.value)}
                              placeholder="e.g., Feb 2026"
                              className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                              Category
                            </label>
                            <select
                              value={category}
                              onChange={(e) => setCategory(e.target.value as CertificateCategory)}
                              className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                            >
                              {CATEGORIES.map((c) => (
                                <option key={c} value={c}>
                                  {c}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                              Credential ID
                            </label>
                            <input
                              type="text"
                              value={credentialId}
                              onChange={(e) => setCredentialId(e.target.value)}
                              placeholder="Optional"
                              className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                            Verification URL
                          </label>
                          <input
                            type="url"
                            value={verifyUrl}
                            onChange={(e) => setVerifyUrl(e.target.value)}
                            placeholder="https://..."
                            className="w-full px-3 py-2 text-xs bg-[#080808] border border-[#292929] text-[#F5F5F5] focus:outline-none focus:border-[#D20A24]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] uppercase tracking-[0.12em] text-[#929292] mb-1">
                            {editingId
                              ? 'Replace File (Optional PDF/PNG/JPG)'
                              : 'Certificate File (PDF/PNG/JPG) *'}
                          </label>
                          <label className="flex items-center justify-center gap-2 px-3 py-3 text-xs border border-dashed border-[#3D3D3D] bg-[#080808] text-[#D4D4D4] hover:border-[#D20A24] cursor-pointer">
                            <Upload className="w-4 h-4 text-[#D20A24]" aria-hidden="true" />
                            <span className="truncate">
                              {fileName || 'Choose PDF, PNG, or JPG (max 8 MB)'}
                            </span>
                            <input
                              type="file"
                              accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>
                        </div>

                        {formMessage && (
                          <div
                            className={`flex items-center gap-2 text-xs p-2.5 border ${
                              formMessage.type === 'ok'
                                ? 'border-emerald-800 bg-emerald-950/40 text-emerald-300'
                                : 'border-red-900 bg-red-950/40 text-red-300'
                            }`}
                          >
                            {formMessage.type === 'ok' && (
                              <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                            )}
                            <span>{formMessage.text}</span>
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={formBusy}
                          className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] disabled:opacity-50 cursor-pointer"
                        >
                          <Plus className="w-4 h-4" aria-hidden="true" />
                          <span>
                            {formBusy
                              ? 'Saving...'
                              : editingId
                                ? 'Update Certificate'
                                : 'Upload Certificate'}
                          </span>
                        </button>
                      </form>

                      {/* Right: Existing Certificates List */}
                      <div className="lg:col-span-7 space-y-2.5">
                        {certificates.map((cert) => (
                          <div
                            key={cert.id}
                            className="bg-[#151515] border border-[#292929] p-4 flex items-center justify-between gap-4"
                          >
                            <div className="min-w-0">
                              <p className="text-[10px] uppercase tracking-[0.16em] text-[#D20A24]">
                                {cert.issuer} · {cert.issueDate || 'Verified'}
                              </p>
                              <p className="text-sm font-medium text-[#F5F5F5] truncate mt-0.5">
                                {cert.title}
                              </p>
                              {cert.credentialId && (
                                <p className="text-[11px] font-mono text-[#929292]">
                                  ID: {cert.credentialId}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => startEditing(cert)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer"
                                aria-label={`Edit ${cert.title}`}
                              >
                                <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCertificate(cert.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] border border-[#292929] bg-[#080808] text-[#F87171] hover:border-[#D20A24] cursor-pointer"
                                aria-label={`Delete ${cert.title}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiriesLoading ? (
                        <p className="text-xs text-[#929292]">Loading inquiries...</p>
                      ) : inquiries.length === 0 ? (
                        <div className="bg-[#151515] border border-[#292929] p-10 text-center">
                          <p className="text-sm text-[#929292]">
                            No contact inquiries submitted yet.
                          </p>
                        </div>
                      ) : (
                        inquiries.map((inq) => (
                          <div
                            key={inq.id}
                            className="bg-[#151515] border border-[#292929] p-5 space-y-2"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#292929]">
                              <div>
                                <span className="font-mono text-xs text-[#D20A24] mr-3">
                                  {inq.id}
                                </span>
                                <span className="text-sm font-medium text-[#F5F5F5]">
                                  {inq.name}
                                </span>
                                <span className="text-xs text-[#929292] ml-2">({inq.email})</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] font-mono text-[#929292]">
                                  {new Date(inq.submittedAt).toLocaleString()}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="text-xs text-[#F87171] hover:underline cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <p className="text-xs font-semibold text-[#F5F5F5]">
                              Subject: {inq.subject}
                            </p>
                            <p className="text-xs text-[#D4D4D4] whitespace-pre-wrap leading-relaxed">
                              {inq.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
