import { ArrowRight, Download, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData.ts';

interface HeroSectionProps {
  onExploreProjects: () => void;
  onOpenRecruiterMode: () => void;
}

const HERO_STATS = [
  { value: '03+', line1: 'PROJECTS', line2: 'COMPLETED' },
  { value: '01+', line1: 'INTERNSHIP', line2: 'EXPERIENCE' },
  { value: '05+', line1: 'CERTIFICATIONS', line2: '' },
];

const HERO_DISCIPLINES = [
  'PYTHON',
  'DATA SCIENCE',
  'MACHINE LEARNING',
  'AI',
  'WEB DEVELOPMENT',
];

export function HeroSection({ onExploreProjects }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative w-full pt-16 bg-[#080808] border-b border-[#292929] overflow-hidden editorial-grain"
    >
      {/* Subtle cinematic black & deep-crimson studio atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_62%_55%_at_54%_38%,rgba(165,12,30,0.18),transparent_72%)]"
      />

      {/* Full-width Editorial Cover Stage */}
      <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 lg:h-[640px] xl:h-[710px] flex flex-col justify-end">
        {/* 1. ENORMOUS EDGE-TO-EDGE "PORTFOLIO" BACKGROUND TYPOGRAPHY — Smooth upward reveal first */}
        <div
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-x-3 sm:inset-x-6 lg:inset-x-8 top-2 sm:top-3 lg:top-2 z-0 overflow-hidden"
        >
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            <svg
              viewBox="0 0 1320 430"
              preserveAspectRatio="none"
              className="w-full h-[155px] sm:h-[250px] md:h-[310px] lg:h-[430px] xl:h-[480px] block"
            >
              <defs>
                <linearGradient id="crimson-portfolio-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#E50914" />
                  <stop offset="48%" stopColor="#B80A1F" />
                  <stop offset="85%" stopColor="#4F040D" />
                  <stop offset="100%" stopColor="#140204" />
                </linearGradient>
              </defs>
              <text
                x="660"
                y="388"
                textAnchor="middle"
                textLength="1308"
                lengthAdjust="spacingAndGlyphs"
                fill="url(#crimson-portfolio-grad)"
                style={{
                  fontFamily: '"Bebas Neue", "Oswald", sans-serif',
                  fontSize: '465px',
                  fontWeight: 700,
                }}
              >
                PORTFOLIO
              </text>
            </svg>
          </motion.div>
        </div>

        {/* 2. FRAMELESS CENTERED ORIGINAL TRANSPARENT PORTRAIT — Smooth upward reveal second */}
        <div className="pointer-events-none select-none relative lg:absolute lg:bottom-0 lg:left-[54%] lg:-translate-x-1/2 z-10 flex justify-center items-end mt-12 sm:mt-16 lg:mt-0 lg:h-[95%] overflow-hidden">
          <motion.img
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            src="/assets/aistudio/Professional_Cutout_Portrait_of_Indian_Woman_17ddf9cb.png"
            alt="Anu M. in a black formal blazer and white collared shirt"
            referrerPolicy="no-referrer"
            className="w-[290px] sm:w-[370px] md:w-[420px] lg:w-auto lg:h-full max-w-[92vw] object-contain object-bottom drop-shadow-[0_18px_36px_rgba(0,0,0,0.8)]"
          />
        </div>

        {/* Ultra-subtle bottom edge blend so the blazer merges naturally into the section divider */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 z-20 bg-gradient-to-t from-[#080808] via-[#080808]/45 to-transparent"
        />

        {/* 3. FOREGROUND EDITORIAL CONTENT: LEFT IDENTITY/CTAs + RIGHT INTRO & STATS — Smooth upward reveal third */}
        <div className="relative z-30 w-full lg:h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-end pb-7 sm:pb-9 lg:pb-9 pt-4 lg:pt-0">
          {/* LEFT SIDE: Hello, I'm / ANU M. / Title / Quote / Buttons / Disciplines */}
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.78, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <p className="font-script text-4xl sm:text-5xl xl:text-[54px] text-[#F5F5F5] leading-none mb-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Hello, I&apos;m
            </p>

            <h1 className="font-display text-7xl sm:text-8xl lg:text-[98px] xl:text-[118px] leading-[0.86] tracking-[0.02em] text-[#F5F5F5] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {PROFILE.name}
            </h1>

            <p className="font-heading text-sm sm:text-base xl:text-[18px] tracking-[0.05em] uppercase text-[#E0142E] font-semibold leading-[1.25] mt-3 max-w-[360px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              BCA STUDENT | ASPIRING AI &amp;
              <br />
              MACHINE LEARNING PROFESSIONAL
            </p>

            <p className="italic text-sm sm:text-[15px] leading-relaxed text-[#EFEFEF] mt-4 max-w-[355px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
              &ldquo;{PROFILE.tagline}&rdquo;
            </p>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#A6081C] transition-colors cursor-pointer whitespace-nowrap rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="/api/resume/download?doc=ai-ml"
                download="Anu_M_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase border border-[#F5F5F5]/70 bg-[#080808]/80 text-[#F5F5F5] hover:border-[#D20A24] transition-colors whitespace-nowrap rounded-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
              >
                <span>DOWNLOAD RESUME</span>
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Bottom Discipline Strip matching Reference */}
            <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#9A9A9A]">
              {HERO_DISCIPLINES.map((discipline, idx) => (
                <span key={discipline} className="inline-flex items-center gap-2.5">
                  <span>{discipline}</span>
                  {idx < HERO_DISCIPLINES.length - 1 && (
                    <span aria-hidden="true" className="text-[#454545]">
                      |
                    </span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: Small Intro Statement + Three Professional Statistics */}
          <motion.div
            initial={{ y: 48, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.78, delay: 0.84, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 lg:col-start-10 flex flex-col lg:items-end justify-end gap-7 lg:pb-1"
          >
            {/* Intro Statement */}
            <div className="w-full lg:max-w-[235px] flex items-center gap-4">
              <span
                aria-hidden="true"
                className="w-12 h-12 rounded-full border border-[#D20A24]/40 bg-[#080808]/60 flex items-center justify-center shrink-0"
              >
                <Plus className="w-4 h-4 text-[#F5F5F5]/85 stroke-[1.5]" />
              </span>
              <p className="text-xs sm:text-[13px] leading-snug text-[#D8D8D8] font-light">
                Building
                <br />
                intelligent
                <br />
                solutions
              </p>
            </div>

            {/* Three Hairline-Separated Professional Statistics */}
            <div className="w-full lg:max-w-[235px] grid grid-cols-3 lg:grid-cols-1 gap-4 lg:gap-0 lg:divide-y lg:divide-[#292929]">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.line1}
                  className="lg:py-3.5 first:lg:pt-0 last:lg:pb-0 flex flex-col lg:flex-row lg:items-center gap-1.5 lg:gap-4"
                >
                  <span className="font-display text-4xl xl:text-[46px] leading-none text-[#D20A24] tabular-nums lg:w-[66px] shrink-0">
                    {stat.value}
                  </span>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.13em] uppercase text-[#CCCCCC] leading-tight">
                    <p>{stat.line1}</p>
                    {stat.line2 && <p className="mt-0.5">{stat.line2}</p>}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
