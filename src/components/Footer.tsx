import { ArrowUp, Github, Linkedin, Lock, Mail } from 'lucide-react';
import { PROFILE } from '../data/portfolioData.ts';

interface FooterProps {
  onOpenRecruiterMode: () => void;
  onOpenAdmin: () => void;
  onScrollTop: () => void;
}

export function Footer({ onOpenRecruiterMode, onOpenAdmin, onScrollTop }: FooterProps) {
  return (
    <footer className="bg-[#080808] py-10 pb-24 sm:pb-12">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-[#292929]">
          <div>
            <p className="font-display text-3xl tracking-[0.1em] text-[#F5F5F5]">
              ANU M<span className="text-[#D20A24]">.</span>
            </p>
            <p className="text-xs text-[#929292] mt-1">
              Confidence in Design · Intelligence in Technology · Personality in Every Detail
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#929292]">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
              <span>Email</span>
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
              <span>LinkedIn</span>
            </a>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors"
            >
              <Github className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
              <span>GitHub</span>
            </a>
            <button
              type="button"
              onClick={onOpenRecruiterMode}
              className="hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              Recruiter Mode
            </button>
            <button
              type="button"
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-[#F5F5F5] transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#929292]" aria-hidden="true" />
              <span>Owner Workspace</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#929292]">
          <p>
            &copy; {new Date().getFullYear()} {PROFILE.fullName}. All verified academic &amp;
            professional records belong to Anu M.
          </p>

          <button
            type="button"
            onClick={onScrollTop}
            className="inline-flex items-center gap-1.5 uppercase tracking-[0.16em] text-[#D4D4D4] hover:text-[#D20A24] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#D20A24]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
