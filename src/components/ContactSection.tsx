import { Download, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData.ts';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative min-h-[88vh] py-24 lg:py-32 bg-[#080808] border-b border-[#292929] flex items-center justify-center overflow-hidden editorial-grain"
    >
      {/* Subtle deep crimson editorial backdrop glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_50%_at_50%_45%,rgba(143,16,33,0.18),transparent_72%)]"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-script text-4xl sm:text-5xl text-[#F5F5F5] mb-3">
            With gratitude,
          </p>

          <h2
            className="font-display uppercase leading-[0.86] tracking-[0.03em] bg-gradient-to-b from-[#F5F5F5] via-[#E8E8E8] to-[#8F8F8F] bg-clip-text text-transparent"
            style={{ fontSize: 'clamp(72px, 14vw, 184px)' }}
          >
            THANK YOU<span className="text-[#D20A24]">.</span>
          </h2>

          <p className="font-heading text-sm sm:text-base tracking-[0.24em] uppercase text-[#D20A24] font-semibold mt-5">
            {PROFILE.name} &nbsp;·&nbsp; {PROFILE.fullName}
          </p>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-[#C9C9C9] font-light max-w-2xl mx-auto mt-6">
            Thank you for taking the time to explore my work in Python, Data Science, Artificial
            Intelligence, and Machine Learning. I appreciate your visit and would love to connect
            regarding internships, research collaborations, or technology opportunities.
          </p>

          {/* Verified Professional Social & Contact Links */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-3xl mx-auto">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group bg-[#151515]/90 border border-[#292929] hover:border-[#D20A24] px-5 py-5 flex flex-col items-center gap-3 transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-[#D20A24]/70 bg-[#080808] flex items-center justify-center group-hover:bg-[#D20A24] transition-colors">
                <Mail className="w-4 h-4 text-[#F5F5F5]" aria-hidden="true" />
              </span>
              <div className="min-w-0 w-full">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#929292]">Email</p>
                <p className="text-xs text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors mt-1 truncate">
                  {PROFILE.email}
                </p>
              </div>
            </a>

            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#151515]/90 border border-[#292929] hover:border-[#D20A24] px-5 py-5 flex flex-col items-center gap-3 transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-[#D20A24]/70 bg-[#080808] flex items-center justify-center group-hover:bg-[#D20A24] transition-colors">
                <Linkedin className="w-4 h-4 text-[#F5F5F5]" aria-hidden="true" />
              </span>
              <div className="min-w-0 w-full">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#929292]">LinkedIn</p>
                <p className="text-xs text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors mt-1 truncate">
                  in/anum-2904-bcagraduate
                </p>
              </div>
            </a>

            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#151515]/90 border border-[#292929] hover:border-[#D20A24] px-5 py-5 flex flex-col items-center gap-3 transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-[#D20A24]/70 bg-[#080808] flex items-center justify-center group-hover:bg-[#D20A24] transition-colors">
                <Github className="w-4 h-4 text-[#F5F5F5]" aria-hidden="true" />
              </span>
              <div className="min-w-0 w-full">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#929292]">GitHub</p>
                <p className="text-xs text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors mt-1 truncate">
                  anumuthuraman29-tech
                </p>
              </div>
            </a>

            <a
              href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              className="group bg-[#151515]/90 border border-[#292929] hover:border-[#D20A24] px-5 py-5 flex flex-col items-center gap-3 transition-colors"
            >
              <span className="w-11 h-11 rounded-full border border-[#D20A24]/70 bg-[#080808] flex items-center justify-center group-hover:bg-[#D20A24] transition-colors">
                <Phone className="w-4 h-4 text-[#F5F5F5]" aria-hidden="true" />
              </span>
              <div className="min-w-0 w-full">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#929292]">Phone</p>
                <p className="text-xs text-[#F5F5F5] group-hover:text-[#D20A24] transition-colors mt-1 tabular-nums">
                  {PROFILE.phone}
                </p>
              </div>
            </a>
          </div>

          {/* Resume Download & Location */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="/api/resume/download?doc=ai-ml"
              download="Anu_M_Resume.pdf"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors whitespace-nowrap"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>DOWNLOAD RESUME</span>
            </a>

            <span className="inline-flex items-center gap-2 text-xs tracking-[0.16em] uppercase text-[#929292]">
              <MapPin className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
              <span>{PROFILE.location}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
