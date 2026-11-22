import { ArrowRight, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { PROJECTS } from '../data/portfolioData.ts';
import type { ProjectCaseStudy } from '../types.ts';
import { ProjectVisual } from './ProjectVisual.tsx';

interface ProjectsSectionProps {
  selectedProject: ProjectCaseStudy | null;
  onSelectProject: (project: ProjectCaseStudy | null) => void;
}

export function ProjectsSection({ selectedProject, onSelectProject }: ProjectsSectionProps) {
  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onSelectProject(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedProject, onSelectProject]);

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Reference-style Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-12 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              02 · Machine Learning &amp; Data Science Work
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              SELECTED PROJECTS
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            Click any project for the full 11-part case study
          </p>
        </div>

        {/* Editorial Numbered Gallery (3-Column Primary Row + 4th Full Editorial Feature or 2x2 / 3+1) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              onClick={() => onSelectProject(project)}
              className={`group bg-[#151515] border border-[#292929] hover:border-[#D20A24] transition-colors duration-200 flex flex-col cursor-pointer ${
                index === 3 ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-12' : ''
              }`}
            >
              {/* Visual Frame */}
              <div
                className={`border-b border-[#292929] overflow-hidden ${
                  index === 3 ? 'lg:col-span-5 lg:border-b-0 lg:border-r' : ''
                }`}
              >
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <ProjectVisual type={project.visualType} compact />
                </div>
              </div>

              {/* Numbered Editorial Meta & CTA */}
              <div
                className={`p-6 flex flex-col justify-between flex-1 ${
                  index === 3 ? 'lg:col-span-7 lg:p-8' : ''
                }`}
              >
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <span className="font-display text-5xl leading-[0.85] text-[#D20A24] tabular-nums shrink-0">
                      {project.number}
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] tracking-[0.14em] uppercase text-[#929292] mb-1">
                        {project.category}
                      </p>
                      <h3 className="font-heading text-xl sm:text-2xl tracking-[0.06em] uppercase text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors leading-tight">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-[#B8B8B8] mb-5">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Unboxed technology metadata with clean separators */}
                  <p className="text-[11px] font-mono text-[#929292] pb-4 mb-4 border-b border-[#292929]">
                    {project.technologies.join(' · ')}
                  </p>

                  <div className="flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </button>

                    {project.featuredLabel && (
                      <span className="text-[10px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold">
                        {project.featuredLabel}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Detailed 11-Section Case Study Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => onSelectProject(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#080808] border border-[#292929] shadow-2xl"
            >
              {/* Sticky Modal Header */}
              <div className="sticky top-0 z-10 bg-[#080808]/95 backdrop-blur-md border-b border-[#292929] px-6 py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-display text-3xl text-[#D20A24] leading-none tabular-nums">
                    {selectedProject.number}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292] truncate">
                      {selectedProject.category}
                    </p>
                    <h3
                      id="case-study-title"
                      className="font-heading text-lg sm:text-2xl tracking-[0.06em] uppercase text-[#F5F5F5] truncate"
                    >
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectProject(null)}
                  className="inline-flex items-center justify-center w-10 h-10 border border-[#292929] bg-[#151515] text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#D20A24] transition-colors cursor-pointer shrink-0"
                  aria-label="Close case study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8">
                {/* 9. Visual Pipeline / Architecture Preview */}
                <div className="border border-[#292929]">
                  <ProjectVisual type={selectedProject.visualType} />
                </div>

                {/* 1 & 2: Overview & Problem Statement */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#151515] border border-[#292929] p-5">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                      01 · Project Overview
                    </p>
                    <p className="text-sm leading-relaxed text-[#D4D4D4]">
                      {selectedProject.overview}
                    </p>
                  </div>
                  <div className="bg-[#151515] border border-[#292929] p-5">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                      02 · Problem Statement
                    </p>
                    <p className="text-sm leading-relaxed text-[#D4D4D4]">
                      {selectedProject.problemStatement}
                    </p>
                  </div>
                </div>

                {/* 3. Dataset */}
                <div className="border-t border-[#292929] pt-6">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                    03 · Dataset
                  </p>
                  <p className="text-sm leading-relaxed text-[#D4D4D4]">
                    {selectedProject.dataset}
                  </p>
                </div>

                {/* 4 & 5: Data Preprocessing & Methodology */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#292929] pt-6">
                  <div>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-3">
                      04 · Data Preprocessing
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                      {selectedProject.dataPreprocessing.map((step) => (
                        <li key={step} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="text-[#D20A24] font-bold">—</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-3">
                      05 · Methodology
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                      {selectedProject.methodology.map((step) => (
                        <li key={step} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="text-[#D20A24] font-bold">—</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6 & 7: Algorithms & Evaluation Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#292929] pt-6">
                  <div className="bg-[#151515] border border-[#292929] p-5">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-3">
                      06 · Algorithms &amp; Techniques
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.algorithms.map((alg) => (
                        <span
                          key={alg}
                          className="px-2.5 py-1.5 text-xs font-mono border border-[#292929] bg-[#080808] text-[#F5F5F5]"
                        >
                          {alg}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#151515] border border-[#292929] p-5">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-3">
                      07 · Evaluation Metrics
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.evaluationMetrics.map((metric) => (
                        <span
                          key={metric}
                          className="px-2.5 py-1.5 text-xs font-mono border border-[#292929] bg-[#080808] text-[#F5F5F5]"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 8. Verified Results */}
                <div className="border-t border-[#292929] pt-6">
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                    08 · Verified Results
                  </p>
                  <p className="text-sm leading-relaxed text-[#D4D4D4]">
                    {selectedProject.verifiedResults}
                  </p>
                </div>

                {/* 10. GitHub Link & 11. What I Learned */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-[#292929] pt-6">
                  <div className="md:col-span-7">
                    <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-3">
                      11 · What I Learned
                    </p>
                    <ul className="space-y-2.5 text-sm text-[#D4D4D4]">
                      {selectedProject.whatILearned.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span aria-hidden="true" className="text-[#D20A24] font-bold">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-5 bg-[#151515] border border-[#292929] p-5 flex flex-col justify-between gap-4">
                    <div>
                      <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                        10 · GitHub Profile
                      </p>
                      <p className="text-xs text-[#929292] leading-relaxed">
                        {selectedProject.githubNote}
                      </p>
                    </div>
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
                    >
                      <span>Open GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
