import {
  Download,
  ExternalLink,
  Eye,
  FileText,
  RotateCcw,
  ShieldCheck,
  SlidersHorizontal,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import type { CertificateCategory, CertificateItem } from '../types.ts';

interface CertificatesSectionProps {
  certificates: CertificateItem[];
  loading: boolean;
  activeCertificate: CertificateItem | null;
  onSelectCertificate: (cert: CertificateItem | null) => void;
  onOpenAdmin: () => void;
}

const FILTER_OPTIONS: Array<'All' | CertificateCategory> = [
  'All',
  'Data Science',
  'Generative AI',
  'AI & Engineering',
  'Data Analytics',
];

export function CertificatesSection({
  certificates,
  loading,
  activeCertificate,
  onSelectCertificate,
  onOpenAdmin,
}: CertificatesSectionProps) {
  const [filter, setFilter] = useState<'All' | CertificateCategory>('All');
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>('image');

  useEffect(() => {
    setZoom(1);
    if (activeCertificate) {
      setViewMode(activeCertificate.previewUrl ? 'image' : 'pdf');
    }
  }, [activeCertificate]);

  useEffect(() => {
    if (!activeCertificate) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelectCertificate(null);
      if (e.key === '+' || e.key === '=') setZoom((z) => Math.min(2.4, Number((z + 0.25).toFixed(2))));
      if (e.key === '-') setZoom((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))));
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeCertificate, onSelectCertificate]);

  const visibleCertificates =
    filter === 'All'
      ? certificates
      : certificates.filter((cert) => cert.category === filter);

  const getDownloadUrl = (cert: CertificateItem) => {
    if (cert.fileUrl.startsWith('/api/certificates/files/')) {
      return `${cert.fileUrl}?download=1`;
    }
    return cert.fileUrl;
  };

  return (
    <section
      id="certificates"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 mb-8 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              05 · Verified Credentials &amp; Course Completions
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              PROFESSIONAL CERTIFICATIONS
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-[#929292] tabular-nums">
              {certificates.length} VERIFIED UPLOADS
            </span>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-[11px] font-medium tracking-[0.14em] uppercase border border-[#292929] bg-[#151515] text-[#D4D4D4] hover:border-[#D20A24] hover:text-[#F5F5F5] transition-colors cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
              <span>Manage Certificates</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Filter certificates by category"
          className="flex flex-wrap items-center gap-2 mb-10"
        >
          {FILTER_OPTIONS.map((option) => {
            const active = filter === option;
            return (
              <button
                key={option}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 text-xs font-medium tracking-[0.12em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                  active
                    ? 'bg-[#D20A24] border-[#D20A24] text-[#F5F5F5]'
                    : 'bg-[#151515] border-[#292929] text-[#929292] hover:text-[#F5F5F5] hover:border-[#444]'
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Loading or Empty State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-80 bg-[#151515] border border-[#292929] animate-pulse"
              />
            ))}
          </div>
        ) : visibleCertificates.length === 0 ? (
          <div className="bg-[#151515] border border-[#292929] p-12 text-center">
            <p className="text-sm text-[#929292]">
              No uploaded certificates match this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCertificates.map((cert, index) => (
              <motion.article
                key={cert.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.25) }}
                className="group bg-[#151515] border border-[#292929] hover:border-[#D20A24] transition-colors flex flex-col"
              >
                {/* Preview Surface */}
                <button
                  type="button"
                  onClick={() => onSelectCertificate(cert)}
                  className="relative aspect-[4/3] w-full bg-[#0D0D0D] border-b border-[#292929] overflow-hidden cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
                  aria-label={`Preview ${cert.title}`}
                >
                  {cert.previewUrl ? (
                    <img
                      src={cert.previewUrl}
                      alt={`${cert.title} certificate issued by ${cert.issuer}`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#111111]">
                      <FileText className="w-10 h-10 text-[#D20A24] mb-3" aria-hidden="true" />
                      <p className="text-xs font-mono uppercase tracking-[0.14em] text-[#F5F5F5]">
                        PDF Document
                      </p>
                      <p className="text-[11px] text-[#929292] mt-1">{cert.issuer}</p>
                    </div>
                  )}

                  {/* Hover Preview Overlay */}
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#080808]/95 border border-[#D20A24] text-[11px] font-semibold tracking-[0.14em] uppercase text-[#F5F5F5]">
                      <Eye className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                      <span>Preview</span>
                    </span>
                  </div>
                </button>

                {/* Certificate Metadata */}
                <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    <div className="flex items-center justify-between gap-2 text-[10px] tracking-[0.16em] uppercase text-[#929292] mb-2">
                      <span className="text-[#D20A24] font-semibold truncate">{cert.issuer}</span>
                      {cert.issueDate && (
                        <span className="shrink-0 tabular-nums">{cert.issueDate}</span>
                      )}
                    </div>

                    <h3 className="font-heading text-base tracking-[0.03em] text-[#F5F5F5] leading-snug line-clamp-2">
                      {cert.title}
                    </h3>

                    {cert.credentialId && (
                      <p className="font-mono text-[11px] text-[#929292] mt-2 truncate">
                        ID: {cert.credentialId}
                      </p>
                    )}
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3.5 border-t border-[#292929] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectCertificate(cert)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#080808] border border-[#292929] text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#D20A24] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Eye className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>View</span>
                    </button>
                    <a
                      href={getDownloadUrl(cert)}
                      download={cert.fileName}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      {/* Zoomable Certificate Preview Modal */}
      <AnimatePresence>
        {activeCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
            onClick={() => onSelectCertificate(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cert-viewer-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl max-h-[92vh] bg-[#080808] border border-[#292929] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Modal Top Toolbar */}
              <div className="px-5 py-4 border-b border-[#292929] bg-[#151515] flex flex-wrap items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-[#D20A24] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{activeCertificate.issuer}</span>
                    {activeCertificate.issueDate && (
                      <>
                        <span aria-hidden="true" className="text-[#444]">·</span>
                        <span className="text-[#929292]">{activeCertificate.issueDate}</span>
                      </>
                    )}
                  </div>
                  <h3
                    id="cert-viewer-title"
                    className="font-heading text-lg sm:text-xl tracking-[0.04em] text-[#F5F5F5] truncate mt-0.5"
                  >
                    {activeCertificate.title}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Switch between crisp zoomable image and embedded PDF if both exist */}
                  {activeCertificate.previewUrl && activeCertificate.fileType === 'pdf' && (
                    <div className="flex items-center border border-[#292929] bg-[#080808]">
                      <button
                        type="button"
                        onClick={() => setViewMode('image')}
                        className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] cursor-pointer ${
                          viewMode === 'image'
                            ? 'bg-[#D20A24] text-[#F5F5F5]'
                            : 'text-[#929292] hover:text-[#F5F5F5]'
                        }`}
                      >
                        Zoom View
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('pdf')}
                        className={`px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] cursor-pointer ${
                          viewMode === 'pdf'
                            ? 'bg-[#D20A24] text-[#F5F5F5]'
                            : 'text-[#929292] hover:text-[#F5F5F5]'
                        }`}
                      >
                        PDF File
                      </button>
                    </div>
                  )}

                  {viewMode === 'image' && (
                    <div className="flex items-center border border-[#292929] bg-[#080808]">
                      <button
                        type="button"
                        onClick={() =>
                          setZoom((z) => Math.max(0.75, Number((z - 0.25).toFixed(2))))
                        }
                        className="p-2 text-[#F5F5F5] hover:text-[#D20A24] cursor-pointer"
                        aria-label="Zoom out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <span className="px-2 text-xs font-mono text-[#D4D4D4] tabular-nums">
                        {Math.round(zoom * 100)}%
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setZoom((z) => Math.min(2.4, Number((z + 0.25).toFixed(2))))
                        }
                        className="p-2 text-[#F5F5F5] hover:text-[#D20A24] cursor-pointer"
                        aria-label="Zoom in"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setZoom(1)}
                        className="p-2 border-l border-[#292929] text-[#929292] hover:text-[#F5F5F5] cursor-pointer"
                        aria-label="Reset zoom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <a
                    href={getDownloadUrl(activeCertificate)}
                    download={activeCertificate.fileName}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Download</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectCertificate(null)}
                    className="inline-flex items-center justify-center w-9 h-9 border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#D20A24] cursor-pointer"
                    aria-label="Close certificate preview"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Viewport */}
              <div className="flex-1 overflow-auto bg-[#0D0D0D] p-4 sm:p-6 flex items-center justify-center min-h-[380px]">
                {viewMode === 'image' && activeCertificate.previewUrl ? (
                  <div className="overflow-auto max-w-full max-h-[68vh] flex items-center justify-center">
                    <img
                      src={activeCertificate.previewUrl}
                      alt={activeCertificate.title}
                      referrerPolicy="no-referrer"
                      style={{
                        transform: `scale(${zoom})`,
                        transformOrigin: 'center center',
                      }}
                      className="max-h-[64vh] w-auto object-contain transition-transform duration-150 border border-[#292929] bg-white shadow-xl"
                    />
                  </div>
                ) : (
                  <iframe
                    src={activeCertificate.fileUrl}
                    title={activeCertificate.title}
                    className="w-full h-[66vh] border border-[#292929] bg-white"
                  />
                )}
              </div>

              {/* Footer Details */}
              <div className="px-5 py-3.5 border-t border-[#292929] bg-[#151515] flex flex-wrap items-center justify-between gap-4 text-xs text-[#929292]">
                <div className="flex flex-wrap items-center gap-3">
                  <span>Category: {activeCertificate.category}</span>
                  {activeCertificate.credentialId && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono text-[#F5F5F5]">
                        Credential ID: {activeCertificate.credentialId}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href={activeCertificate.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#F5F5F5] hover:text-[#D20A24] transition-colors whitespace-nowrap"
                  >
                    <span>Open Original File</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  {activeCertificate.verifyUrl && (
                    <a
                      href={activeCertificate.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[#D20A24] hover:underline whitespace-nowrap"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
