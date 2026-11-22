import {
  Award,
  BarChart2,
  CheckCircle2,
  Code,
  Compass,
  RefreshCw,
} from 'lucide-react';
import { motion } from 'motion/react';
import { INTERNSHIP, PROCESS_STAGES } from '../data/portfolioData.ts';

interface ProcessExperienceSectionProps {
  onViewInternshipCertificate: () => void;
}

const STAGE_ICONS = [Compass, BarChart2, Code, CheckCircle2, RefreshCw];

export function ProcessExperienceSection({
  onViewInternshipCertificate,
}: ProcessExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-12 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              04 · Methodology &amp; Verified Industry Experience
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              MY PROFESSIONAL JOURNEY.
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            Structured ML Process · Verified Internship
          </p>
        </div>

        {/* Two-Part Spread: Left Numbered Timeline + Right Crimson Editorial Internship Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT: Numbered Vertical Work Process Timeline */}
          <div className="lg:col-span-7 bg-[#151515] border border-[#292929] p-6 sm:p-8">
            <p className="font-heading text-xs tracking-[0.22em] uppercase text-[#929292] mb-6">
              FIVE-STAGE ANALYTICAL WORKFLOW
            </p>

            <ol className="relative space-y-6">
              {PROCESS_STAGES.map((stage, index) => {
                const Icon = STAGE_ICONS[index] || Compass;
                const isLast = index === PROCESS_STAGES.length - 1;
                return (
                  <motion.li
                    key={stage.number}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="relative flex items-start gap-4 sm:gap-6"
                  >
                    {/* Vertical Hairline Connector */}
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute left-[50px] sm:left-[62px] top-12 bottom-[-24px] w-px bg-[#292929]"
                      />
                    )}

                    {/* Number */}
                    <span className="font-display text-3xl text-[#D20A24] leading-none pt-1.5 w-7 shrink-0 tabular-nums">
                      {stage.number}
                    </span>

                    {/* Crimson-Ringed Icon Node (matching reference Work Process aesthetic) */}
                    <div className="w-11 h-11 rounded-full border border-[#D20A24]/70 bg-[#080808] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#F5F5F5]" aria-hidden="true" />
                    </div>

                    {/* Text Body */}
                    <div className={`flex-1 pb-6 ${!isLast ? 'border-b border-[#292929]/70' : ''}`}>
                      <h3 className="font-heading text-lg tracking-[0.12em] uppercase text-[#F5F5F5]">
                        {stage.title}
                      </h3>
                      <p className="text-sm text-[#D4D4D4] font-medium mt-1">
                        {stage.summary}
                      </p>
                      <p className="text-xs leading-relaxed text-[#929292] mt-1.5">
                        {stage.detail}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
            </ol>
          </div>

          {/* RIGHT: Verified Internship + Signature Crimson Editorial Statement */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Verified Internship Dossier */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55 }}
              className="bg-[#151515] border border-[#292929] p-6 sm:p-8 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-5 border-b border-[#292929]">
                  <span className="text-[11px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold">
                    Verified Internship
                  </span>
                  <span className="font-mono text-xs text-[#929292] tabular-nums">
                    {INTERNSHIP.duration}
                  </span>
                </div>

                <h3 className="font-display text-4xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-tight">
                  {INTERNSHIP.role}
                </h3>
                <p className="font-heading text-base tracking-[0.12em] uppercase text-[#D20A24] mt-1">
                  {INTERNSHIP.organization}
                </p>

                <p className="font-mono text-xs text-[#D4D4D4] mt-3 pb-4 border-b border-[#292929]">
                  Credential ID: <span className="text-[#F5F5F5]">{INTERNSHIP.credentialId}</span>
                </p>

                <ul className="mt-5 space-y-3 text-xs sm:text-[13px] leading-relaxed text-[#D4D4D4]">
                  {INTERNSHIP.highlights.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="text-[#D20A24] font-bold">—</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-5 border-t border-[#292929]">
                <button
                  type="button"
                  onClick={onViewInternshipCertificate}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Award className="w-4 h-4" aria-hidden="true" />
                  <span>VIEW VERIFIED INTERNSHIP CERTIFICATE</span>
                </button>
              </div>
            </motion.div>

            {/* Reference-Inspired Deep Crimson Editorial Quote Block */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="bg-gradient-to-br from-[#8F1021] via-[#6B0B17] to-[#26060A] border border-[#D20A24]/40 p-7 sm:p-8 flex flex-col justify-between min-h-[210px]"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl text-[#F5F5F5]/40 leading-none select-none"
              >
                &ldquo;
              </span>
              <p className="text-lg sm:text-xl leading-snug text-[#F5F5F5] font-light my-3">
                Good machine learning is not only about complex algorithms—it starts with honest
                data preparation and clear evaluation.
              </p>
              <div className="flex items-end justify-between gap-4 pt-3 border-t border-white/15">
                <span className="font-script text-3xl text-[#F5F5F5]">Anu M.</span>
                <span className="text-[10px] tracking-[0.18em] uppercase text-[#F5F5F5]/80">
                  Confidence in Design · Intelligence in Tech
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
