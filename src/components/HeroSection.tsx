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
      className="relative w-full min-h-[calc(100vh-4rem)] lg:min-h-[760px] xl:min-h-[820px] pt-16 bg-[#080808] border-b border-[#292929] overflow-hidden flex flex-col justify-end editorial-grain"
    >
      {/* Subtle cinematic deep-crimson atmosphere behind the giant masthead */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_42%,rgba(143,16,33,0.16),transparent_72%)]"
      />

      {/* MAIN HERO CANVAS */}
      <div className="relative w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 flex-1 flex flex-col justify-end min-h-[640px] sm:min-h-[680px] lg:min-h-[720px] xl:min-h-[780px]">
        {/* 1. ENORMOUS BACKGROUND "PORTFOLIO" TYPOGRAPHY — Animates upward first */}
        <motion.div
          initial={{ y: 140, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.95, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="pointer-events-none select-none absolute inset-x-0 top-3 sm:top-4 lg:top-2 z-0 flex justify-center overflow-hidden"
        >
          <span
            className="block w-full text-center font-display uppercase leading-[0.82] tracking-[0.01em] bg-gradient-to-b from-[#E50914] via-[#B80B20] to-[#3B040A] bg-clip-text text-transparent"
            style={{
              fontSize: 'clamp(112px, 24.5vw, 375px)',
            }}
          >
            PORTFOLIO
          </span>
        </motion.div>

        {/* 2. FRAMELESS CENTERED TRANSPARENT PORTRAIT — Animates upward second, in front of PORTFOLIO */}
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.95, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-none select-none relative lg:absolute lg:inset-x-0 lg:bottom-0 z-10 flex justify-center items-end mt-16 sm:mt-20 lg:mt-0"
        >
          <img
            src="/assets/aistudio/Professional_Cutout_Portrait_of_Indian_Woman_17ddf9cb.png"
            alt="Anu M. in a black formal blazer and white collared shirt"
            referrerPolicy="no-referrer"
            className="w-[300px] sm:w-[390px] md:w-[440px] lg:w-[490px] xl:w-[565px] max-w-[92vw] h-auto object-contain object-bottom drop-shadow-[0_24px_45px_rgba(0,0,0,0.85)]"
          />
        </motion.div>

        {/* Seamless bottom blend vignette so portrait shoulders melt naturally into the obsidian floor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 sm:h-36 z-20 bg-gradient-to-t from-[#080808] via-[#080808]/65 to-transparent"
        />

        {/* 3. FOREGROUND EDITORIAL OVERLAY: LEFT IDENTITY + RIGHT INTRO & STATS */}
        <div className="relative z-30 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-8 sm:pb-10 lg:pb-12 pt-4 lg:pt-0">
          {/* LEFT COLUMN: Hello, I'm / ANU M. / Title / Quote / CTAs / Disciplines */}
          <motion.div
            initial={{ y: 44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <p className="font-script text-4xl sm:text-5xl text-[#F5F5F5] leading-none mb-1 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              Hello, I&apos;m
            </p>

            <h1 className="font-display text-7xl sm:text-8xl xl:text-[118px] leading-[0.86] tracking-[0.02em] text-[#F5F5F5] uppercase drop-shadow-[0_4px_18px_rgba(0,0,0,0.85)]">
              {PROFILE.name}
            </h1>

            <p className="font-heading text-sm sm:text-base xl:text-[18px] tracking-[0.06em] uppercase text-[#E0142E] font-semibold leading-snug mt-3 max-w-[360px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              BCA STUDENT | ASPIRING AI &amp;
              <br />
              MACHINE LEARNING PROFESSIONAL
            </p>

            <p className="italic text-sm sm:text-[15px] leading-relaxed text-[#EDEDED] mt-4 max-w-[360px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
              &ldquo;{PROFILE.tagline}&rdquo;
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreProjects}
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#A6081C] transition-colors cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5]"
              >
                <span>EXPLORE MY WORK</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <a
                href="/api/resume/download?doc=ai-ml"
                download="Anu_M_Resume.pdf"
                className="inline-flex items-center gap-2.5 px-6 py-3 text-xs font-medium tracking-[0.14em] uppercase border border-[#F5F5F5]/65 bg-[#080808]/75 backdrop-blur-xs text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#F5F5F5] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
              >
                <span>DOWNLOAD RESUME</span>
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Subtle Horizontal Discipline Line matching Reference */}
            <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#9E9E9E]">
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

          {/* CENTER SPACER (Leaves portrait completely unobstructed on desktop) */}
          <div className="hidden lg:block lg:col-span-4" aria-hidden="true" />

          {/* RIGHT COLUMN: Short Intro Statement + Three Professional Statistics */}
          <motion.div
            initial={{ y: 44, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 flex flex-col lg:items-end justify-end gap-8"
          >
            {/* Minimal Circular Accent + Intro Statement */}
            <div className="flex items-center gap-4 lg:pr-2">
              <span
                aria-hidden="true"
                className="w-12 h-12 rounded-full border border-[#D20A24]/45 bg-[#080808]/55 flex items-center justify-center shrink-0"
              >
                <Plus className="w-4 h-4 text-[#F5F5F5]/85 stroke-[1.5]" />
              </span>
              <p className="text-xs sm:text-[13px] leading-snug text-[#D4D4D4] font-light">
                Building
                <br />
                intelligent
                <br />
                solutions
              </p>
            </div>

            {/* Three Hairline-Separated Professional Statistics */}
            <div className="w-full max-w-[235px] divide-y divide-[#292929]">
              {HERO_STATS.map((stat) => (
                <div
                  key={stat.line1}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-4"
                >
                  <span className="font-display text-4xl sm:text-[42px] leading-none text-[#D20A24] tabular-nums w-[62px] shrink-0">
                    {stat.value}
                  </span>
                  <div className="text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-[#C9C9C9] leading-tight">
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
