import { Download, ExternalLink, Eye, FileText, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import {
  EDUCATION,
  INTERNSHIP,
  PROJECTS,
  RESUME_DOCUMENTS,
} from '../data/portfolioData.ts';
import type { CertificateItem, ResumeDocument } from '../types.ts';

interface DocumentCentreSectionProps {
  certificates: CertificateItem[];
  onViewCertificate: (cert: CertificateItem) => void;
}

export function DocumentCentreSection({
  certificates,
  onViewCertificate,
}: DocumentCentreSectionProps) {
  const [activeTab, setActiveTab] = useState<'resume' | 'certifications'>('resume');
  const [selectedDoc, setSelectedDoc] = useState<ResumeDocument>(RESUME_DOCUMENTS[0]);
  const [previewMode, setPreviewMode] = useState<'image' | 'pdf'>('image');

  return (
    <section
      id="documents"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              06 · Verified Resume &amp; Credentials Archive
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              MY PROFESSIONAL DOCUMENTS
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            Open Access · No Registration Required
          </p>
        </div>

        {/* Compact Verified Summary Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#292929] border border-[#292929] mb-10">
          <div className="bg-[#151515] p-5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
              Education
            </p>
            <p className="font-heading text-lg text-[#F5F5F5] mt-1 tabular-nums">
              BCA · {EDUCATION.cgpa}
            </p>
            <p className="text-xs text-[#929292] mt-0.5">RNS First Grade College</p>
          </div>
          <div className="bg-[#151515] p-5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
              Internship
            </p>
            <p className="font-heading text-lg text-[#F5F5F5] mt-1">
              {INTERNSHIP.organization}
            </p>
            <p className="text-xs text-[#929292] mt-0.5 tabular-nums">{INTERNSHIP.duration}</p>
          </div>
          <div className="bg-[#151515] p-5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
              Certifications
            </p>
            <p className="font-heading text-lg text-[#F5F5F5] mt-1 tabular-nums">
              {certificates.length} Verified Files
            </p>
            <p className="text-xs text-[#929292] mt-0.5">Glowlogics · Infosys · IBM · Coursera</p>
          </div>
          <div className="bg-[#151515] p-5">
            <p className="text-[10px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
              Academic Projects
            </p>
            <p className="font-heading text-lg text-[#F5F5F5] mt-1 tabular-nums">
              {PROJECTS.length} ML &amp; Data Studies
            </p>
            <p className="text-xs text-[#929292] mt-0.5">Regression, Classification &amp; EDA</p>
          </div>
        </div>

        {/* Two Primary Document Tabs */}
        <div
          role="tablist"
          aria-label="Professional Documents Tabs"
          className="flex items-center gap-2 mb-8"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'resume'}
            onClick={() => setActiveTab('resume')}
            className={`px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'resume'
                ? 'bg-[#D20A24] border-[#D20A24] text-[#F5F5F5]'
                : 'bg-[#151515] border-[#292929] text-[#929292] hover:text-[#F5F5F5]'
            }`}
          >
            TAB 01 — RESUME
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'certifications'}
            onClick={() => setActiveTab('certifications')}
            className={`px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'certifications'
                ? 'bg-[#D20A24] border-[#D20A24] text-[#F5F5F5]'
                : 'bg-[#151515] border-[#292929] text-[#929292] hover:text-[#F5F5F5]'
            }`}
          >
            TAB 02 — CERTIFICATIONS
          </button>
        </div>

        {/* TAB 01: RESUME */}
        {activeTab === 'resume' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Selector & Actions */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#151515] border border-[#292929] p-5 space-y-3">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
                  Uploaded Documents
                </p>
                {RESUME_DOCUMENTS.map((doc) => {
                  const isSelected = selectedDoc.id === doc.id;
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => setSelectedDoc(doc)}
                      className={`w-full text-left p-3.5 border transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#080808] border-[#D20A24]'
                          : 'bg-[#0D0D0D] border-[#292929] hover:border-[#444]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-heading text-sm tracking-[0.04em] text-[#F5F5F5]">
                          {doc.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-[#D20A24] shrink-0">
                          {doc.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#929292] mt-1 leading-snug">
                        {doc.subtitle}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="bg-[#151515] border border-[#292929] p-5 space-y-3">
                <a
                  href={`/api/resume/download?doc=${selectedDoc.id}`}
                  download={selectedDoc.downloadName}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>DOWNLOAD RESUME</span>
                </a>
                <a
                  href={selectedDoc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-medium tracking-[0.14em] uppercase border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-4 h-4 text-[#D20A24]" aria-hidden="true" />
                  <span>VIEW FULL RESUME</span>
                </a>
                <p className="text-[11px] font-mono text-[#929292] text-center pt-1">
                  Filename: {selectedDoc.downloadName}
                </p>
              </div>
            </div>

            {/* Right Clean Document Preview */}
            <div className="lg:col-span-8 bg-[#151515] border border-[#292929]">
              <div className="px-5 py-3.5 border-b border-[#292929] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <FileText className="w-4 h-4 text-[#D20A24] shrink-0" aria-hidden="true" />
                  <span className="text-xs font-medium text-[#F5F5F5] truncate">
                    {selectedDoc.title} — {selectedDoc.downloadName}
                  </span>
                </div>
                <div className="flex items-center border border-[#292929] bg-[#080808]">
                  <button
                    type="button"
                    onClick={() => setPreviewMode('image')}
                    className={`px-3 py-1 text-[11px] uppercase tracking-[0.12em] cursor-pointer ${
                      previewMode === 'image'
                        ? 'bg-[#D20A24] text-[#F5F5F5]'
                        : 'text-[#929292] hover:text-[#F5F5F5]'
                    }`}
                  >
                    Crisp Preview
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode('pdf')}
                    className={`px-3 py-1 text-[11px] uppercase tracking-[0.12em] cursor-pointer ${
                      previewMode === 'pdf'
                        ? 'bg-[#D20A24] text-[#F5F5F5]'
                        : 'text-[#929292] hover:text-[#F5F5F5]'
                    }`}
                  >
                    Embedded PDF
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 bg-[#0D0D0D] flex justify-center">
                {previewMode === 'image' ? (
                  <img
                    src={selectedDoc.previewUrl}
                    alt={`Preview of ${selectedDoc.title}`}
                    referrerPolicy="no-referrer"
                    className="w-full max-w-[740px] h-auto border border-[#292929] bg-white shadow-2xl"
                  />
                ) : (
                  <iframe
                    src={selectedDoc.fileUrl}
                    title={selectedDoc.title}
                    className="w-full h-[680px] border border-[#292929] bg-white"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* TAB 02: CERTIFICATIONS */
          <div className="bg-[#151515] border border-[#292929] divide-y divide-[#292929]">
            {certificates.map((cert, idx) => (
              <div
                key={cert.id}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1A1A1A] transition-colors"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <span className="font-display text-2xl text-[#D20A24] leading-none pt-0.5 tabular-nums shrink-0">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#929292]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <span className="text-[#D4D4D4] font-medium">{cert.issuer}</span>
                      {cert.issueDate && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{cert.issueDate}</span>
                        </>
                      )}
                      {cert.credentialId && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono text-[#F5F5F5]">ID: {cert.credentialId}</span>
                        </>
                      )}
                    </div>
                    <h3 className="font-heading text-base sm:text-lg tracking-[0.03em] text-[#F5F5F5] mt-1">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => onViewCertificate(cert)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                    <span>Preview</span>
                  </button>
                  <a
                    href={
                      cert.fileUrl.startsWith('/api/certificates/files/')
                        ? `${cert.fileUrl}?download=1`
                        : cert.fileUrl
                    }
                    download={cert.fileName}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
