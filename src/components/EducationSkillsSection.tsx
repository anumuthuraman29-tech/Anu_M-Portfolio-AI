import {
  BarChart3,
  Brain,
  Code2,
  Cpu,
  Globe,
  Layers,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';
import { EDUCATION, SIMULATION_EXPERIENCE, SKILL_GROUPS } from '../data/portfolioData.ts';

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Programming':
      return Code2;
    case 'Data Science':
      return BarChart3;
    case 'Machine Learning':
      return Brain;
    case 'Data Preprocessing':
      return Layers;
    case 'Generative AI & NLP':
      return Sparkles;
    case 'Web Development':
      return Globe;
    case 'Tools':
      return Wrench;
    default:
      return Cpu;
  }
}

export function EducationSkillsSection() {
  return (
    <section
      id="education"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-12 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              03 · Academic Foundation &amp; Technical Capabilities
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              EDUCATION &amp; SKILLS
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            Verified Academic &amp; Technical Stack
          </p>
        </div>

        {/* Two-Column Editorial Split matching Reference Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* LEFT COLUMN: EDUCATION */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div>
              <h3 className="font-heading text-sm tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-5">
                EDUCATION
              </h3>

              {/* Primary Degree Record */}
              <div className="bg-[#151515] border border-[#292929] p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[#292929]">
                  <div>
                    <h4 className="font-heading text-2xl tracking-[0.04em] text-[#F5F5F5] leading-snug">
                      {EDUCATION.degree}
                    </h4>
                    <p className="text-sm text-[#B8B8B8] mt-1">{EDUCATION.institution}</p>
                  </div>
                  <span className="font-mono text-xs text-[#D20A24] whitespace-nowrap shrink-0 tabular-nums">
                    2024 – 2027
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-5 mb-5 border-b border-[#292929]">
                  <div>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292]">
                      Academic CGPA
                    </p>
                    <p className="font-display text-4xl text-[#F5F5F5] leading-none mt-1 tabular-nums">
                      9.04<span className="text-xl text-[#D20A24]">/10</span>
                    </p>
                    <p className="text-[11px] text-[#929292] mt-1">{EDUCATION.semester}</p>
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292]">
                      Expected Graduation
                    </p>
                    <p className="font-heading text-xl text-[#F5F5F5] leading-snug mt-1.5">
                      {EDUCATION.expectedGraduation}
                    </p>
                    <p className="text-[11px] text-[#929292] mt-1">Autonomous Curriculum</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292] mb-3">
                    Core Academic Foundations
                  </p>
                  <ul className="space-y-2 text-xs text-[#D4D4D4]">
                    {EDUCATION.coreFoundations.map((course) => (
                      <li key={course} className="flex items-center gap-2">
                        <span aria-hidden="true" className="text-[#D20A24]">—</span>
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Ongoing Practical Simulation */}
            <div className="bg-[#151515] border border-[#292929] p-6">
              <div className="flex items-center justify-between gap-4 mb-2">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold">
                  Applied Learning Simulation
                </p>
                <span className="font-mono text-[11px] text-[#929292]">
                  {SIMULATION_EXPERIENCE.status}
                </span>
              </div>
              <h4 className="font-heading text-lg tracking-[0.04em] text-[#F5F5F5]">
                {SIMULATION_EXPERIENCE.title}
              </h4>
              <p className="text-xs text-[#929292] mt-0.5 mb-3">
                {SIMULATION_EXPERIENCE.organization}
              </p>
              <p className="text-xs leading-relaxed text-[#B8B8B8]">
                {SIMULATION_EXPERIENCE.summary}
              </p>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: TECHNICAL SKILLS */}
          <motion.div
            id="skills"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-7 scroll-mt-24"
          >
            <h3 className="font-heading text-sm tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-5">
              TECHNICAL SKILLS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group) => {
                const Icon = getCategoryIcon(group.category);
                return (
                  <div
                    key={group.category}
                    className="bg-[#151515] border border-[#292929] p-5 hover:border-[#3D3D3D] transition-colors"
                  >
                    <div className="flex items-center gap-2.5 pb-3 mb-3.5 border-b border-[#292929]">
                      <Icon className="w-4 h-4 text-[#D20A24] shrink-0" aria-hidden="true" />
                      <h4 className="font-heading text-xs tracking-[0.18em] uppercase text-[#F5F5F5]">
                        {group.category}
                      </h4>
                    </div>

                    {/* Reference-style crisp architectural rectangular skill tags (no percentages, no rounded candy pills) */}
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1.5 text-[11px] font-medium tracking-[0.04em] text-[#E5E5E5] bg-[#080808] border border-[#292929] hover:border-[#D20A24] hover:text-[#F5F5F5] transition-colors whitespace-nowrap"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
