import {
  ArrowRight,
  Award,
  Download,
  ExternalLink,
  FolderGit2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import {
  EDUCATION,
  INTERNSHIP,
  PROFILE,
  PROJECTS,
} from '../data/portfolioData.ts';
import type { CertificateItem, ProjectCaseStudy } from '../types.ts';

interface RecruiterModeModalProps {
  open: boolean;
  onClose: () => void;
  certificates: CertificateItem[];
  onNavigateSection: (sectionId: string) => void;
  onSelectProject: (project: ProjectCaseStudy) => void;
  onSelectCertificate: (cert: CertificateItem) => void;
}

const RECRUITER_CORE_SKILLS = [
  'Python',
  'SQL',
  'C',
  'Data Science',
  'Machine Learning',
  'Pandas',
  'NumPy',
  'Matplotlib',
  'Seaborn',
  'Scikit-learn',
  'LightGBM',
  'SMOTE',
  'Naive Bayes',
  'Decision Trees',
  'Logistic Regression',
  'K-Means',
  'Regression Models',
  'HTML / CSS / JS',
  'Git & GitHub',
];

export function RecruiterModeModal({
  open,
  onClose,
  certificates,
  onNavigateSection,
  onSelectProject,
  onSelectCertificate,
}: RecruiterModeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  const jumpTo = (sectionId: string) => {
    onClose();
    setTimeout(() => onNavigateSection(sectionId), 120);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/88 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="recruiter-mode-title"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl max-h-[92vh] bg-[#080808] border border-[#292929] flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Sticky Header */}
            <div className="px-6 py-4 bg-[#151515] border-b border-[#292929] flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold">
                  RECRUITER MODE · EXECUTIVE CANDIDATE SUMMARY
                </p>
                <h2
                  id="recruiter-mode-title"
                  className="font-display text-2xl sm:text-3xl tracking-[0.06em] text-[#F5F5F5] uppercase leading-none mt-1"
                >
                  ANU M. — AI, ML &amp; DATA SCIENCE CANDIDATE
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center w-10 h-10 border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#D20A24] cursor-pointer shrink-0"
                aria-label="Close Recruiter Mode"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scannable Executive Body */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {/* Top Overview Strip */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#151515] border border-[#292929] p-5 sm:p-6">
                <div className="md:col-span-3 flex items-center gap-4 md:block">
                  <div className="w-20 h-24 md:w-full md:aspect-[4/4.3] bg-[#080808] border border-[#292929] overflow-hidden shrink-0">
                    <img
                      src={PROFILE.portraitUrl}
                      alt="Anu M. professional portrait"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-[50%_14%] scale-[1.14]"
                    />
                  </div>
                </div>

                <div className="md:col-span-9 flex flex-col justify-between gap-4">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold">
                      PROFESSIONAL OVERVIEW
                    </p>
                    <h3 className="font-display text-4xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-tight mt-0.5">
                      {PROFILE.name}
                    </h3>
                    <p className="text-sm text-[#D4D4D4] font-medium">
                      BCA Student · {PROFILE.shortRole}
                    </p>
                    <p className="text-xs text-[#929292] mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                      <span>Bengaluru, Karnataka, India</span>
                    </p>
                  </div>

                  {/* Verified Contact Links */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-[#292929] text-xs">
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="flex items-center gap-2 text-[#D4D4D4] hover:text-[#D20A24] truncate"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <span className="truncate">{PROFILE.email}</span>
                    </a>
                    <a
                      href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
                      className="flex items-center gap-2 text-[#D4D4D4] hover:text-[#D20A24] tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <span>{PROFILE.phone}</span>
                    </a>
                    <a
                      href={PROFILE.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#D4D4D4] hover:text-[#D20A24] truncate"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <span className="truncate">{PROFILE.linkedinDisplay}</span>
                    </a>
                    <a
                      href={PROFILE.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[#D4D4D4] hover:text-[#D20A24] truncate"
                    >
                      <Github className="w-3.5 h-3.5 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <span className="truncate">{PROFILE.githubDisplay}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Education + Internship */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151515] border border-[#292929] p-5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-2">
                    EDUCATION
                  </p>
                  <p className="font-heading text-lg text-[#F5F5F5]">
                    {EDUCATION.degree}
                  </p>
                  <p className="text-xs text-[#B8B8B8] mt-0.5">{EDUCATION.institution}</p>
                  <div className="mt-3 pt-3 border-t border-[#292929] flex items-center justify-between text-xs">
                    <span className="text-[#F5F5F5] font-medium tabular-nums">
                      CGPA: {EDUCATION.cgpa} ({EDUCATION.semester})
                    </span>
                    <span className="text-[#929292]">Grad: {EDUCATION.expectedGraduation}</span>
                  </div>
                </div>

                <div className="bg-[#151515] border border-[#292929] p-5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-2">
                    INTERNSHIP
                  </p>
                  <p className="font-heading text-lg text-[#F5F5F5]">{INTERNSHIP.role}</p>
                  <p className="text-xs text-[#B8B8B8] mt-0.5">
                    {INTERNSHIP.organization} · {INTERNSHIP.duration}
                  </p>
                  <div className="mt-3 pt-3 border-t border-[#292929] flex items-center justify-between text-xs">
                    <span className="font-mono text-[#D4D4D4]">
                      ID: {INTERNSHIP.credentialId}
                    </span>
                    <span className="text-[#929292]">Python · Scikit-learn · EDA</span>
                  </div>
                </div>
              </div>

              {/* Technical Skills */}
              <div className="bg-[#151515] border border-[#292929] p-5">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-3">
                  TECHNICAL SKILLS
                </p>
                <div className="flex flex-wrap gap-2">
                  {RECRUITER_CORE_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs bg-[#080808] border border-[#292929] text-[#E5E5E5]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured Projects & Verified Certifications */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#151515] border border-[#292929] p-5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-3">
                    FEATURED PROJECTS ({PROJECTS.length})
                  </p>
                  <ul className="divide-y divide-[#292929]">
                    {PROJECTS.map((proj) => (
                      <li key={proj.id} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#F5F5F5] truncate">
                            <span className="font-mono text-[#D20A24] mr-2">{proj.number}</span>
                            {proj.shortTitle}
                          </p>
                          <p className="text-[11px] text-[#929292] truncate">
                            {proj.technologies.slice(0, 4).join(' · ')}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectProject(proj);
                          }}
                          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D20A24] hover:underline cursor-pointer shrink-0"
                        >
                          Case Study
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#151515] border border-[#292929] p-5">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-3">
                    VERIFIED CERTIFICATIONS ({certificates.length})
                  </p>
                  <ul className="divide-y divide-[#292929] max-h-56 overflow-y-auto pr-1">
                    {certificates.map((cert) => (
                      <li key={cert.id} className="py-2.5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#F5F5F5] truncate">
                            {cert.title}
                          </p>
                          <p className="text-[11px] text-[#929292] truncate">
                            {cert.issuer}
                            {cert.issueDate ? ` · ${cert.issueDate}` : ''}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            onSelectCertificate(cert);
                          }}
                          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#D20A24] hover:underline cursor-pointer shrink-0 inline-flex items-center gap-1"
                        >
                          <span>View</span>
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Recruiter Quick Action Bar */}
            <div className="px-6 py-4 bg-[#151515] border-t border-[#292929] flex flex-wrap items-center justify-between gap-3">
              <a
                href="/api/resume/download?doc=ai-ml"
                download="Anu_M_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                <span>DOWNLOAD RESUME</span>
              </a>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => jumpTo('projects')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-medium tracking-[0.12em] uppercase border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer whitespace-nowrap"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                  <span>VIEW PROJECTS</span>
                </button>
                <button
                  type="button"
                  onClick={() => jumpTo('certificates')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-medium tracking-[0.12em] uppercase border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer whitespace-nowrap"
                >
                  <Award className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                  <span>VIEW CERTIFICATIONS</span>
                </button>
                <button
                  type="button"
                  onClick={() => jumpTo('contact')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-[11px] font-medium tracking-[0.12em] uppercase border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer whitespace-nowrap"
                >
                  <span>CONTACT ANU</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
