import { motion } from 'motion/react';
import { EDUCATION, INTERNSHIP, PROFILE } from '../data/portfolioData.ts';

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-12 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              01 · Profile &amp; Perspective
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              BEYOND THE CODE.
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            {PROFILE.location}
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Portrait Frame */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="relative flex-1 min-h-[380px] bg-[#151515] border border-[#292929] overflow-hidden">
              <img
                src={PROFILE.portraitUrl}
                alt="Formal portrait of Anu M."
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[50%_15%] scale-[1.13]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-[#292929]/80 bg-[#080808]/80 backdrop-blur-sm">
                <p className="font-heading text-sm tracking-[0.16em] uppercase text-[#F5F5F5]">
                  {PROFILE.fullName}
                </p>
                <p className="text-xs text-[#929292] mt-1">
                  {EDUCATION.degree} · {EDUCATION.institution}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Biography & Structured Facts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            <div className="space-y-5">
              <p className="text-base sm:text-lg leading-[1.75] text-[#F5F5F5] font-light">
                {PROFILE.aboutIntro}
              </p>
              <p className="text-sm sm:text-[15px] leading-[1.75] text-[#929292]">
                {PROFILE.aboutExtended}
              </p>
            </div>

            {/* Structured Editorial Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#292929] border border-[#292929]">
              <div className="bg-[#151515] p-5">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                  Academic Standing
                </p>
                <p className="text-sm font-medium text-[#F5F5F5]">{EDUCATION.degree}</p>
                <p className="text-xs text-[#929292] mt-1">
                  {EDUCATION.institution}
                </p>
                <p className="text-xs text-[#F5F5F5] mt-2 tabular-nums">
                  CGPA {EDUCATION.cgpa} ({EDUCATION.semester}) · Expected {EDUCATION.expectedGraduation}
                </p>
              </div>

              <div className="bg-[#151515] p-5">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                  Internship Experience
                </p>
                <p className="text-sm font-medium text-[#F5F5F5]">{INTERNSHIP.role}</p>
                <p className="text-xs text-[#929292] mt-1">
                  {INTERNSHIP.organization} · {INTERNSHIP.duration}
                </p>
                <p className="text-xs font-mono text-[#D4D4D4] mt-2">
                  Credential ID: {INTERNSHIP.credentialId}
                </p>
              </div>

              <div className="bg-[#151515] p-5">
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                  Core Strengths
                </p>
                <ul className="space-y-1.5 text-xs text-[#D4D4D4]">
                  {PROFILE.strengths.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span aria-hidden="true" className="text-[#D20A24] mt-0.5">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#151515] p-5 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] tracking-[0.18em] uppercase text-[#D20A24] font-semibold mb-2">
                    Areas of Specialization
                  </p>
                  <p className="text-xs text-[#D4D4D4] leading-relaxed">
                    Predictive Machine Learning · Data Preprocessing &amp; Imputation · Exploratory
                    Data Analysis · Generative AI &amp; Prompt Engineering
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#292929]">
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292] mb-1">
                    Languages
                  </p>
                  <p className="text-xs text-[#F5F5F5]">
                    {PROFILE.languages.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
