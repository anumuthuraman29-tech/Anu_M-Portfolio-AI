import { Briefcase, Download, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenRecruiterMode: () => void;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({ activeSection, onNavigate, onOpenRecruiterMode }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 border-b ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-[#292929]'
          : 'bg-[#080808]/85 backdrop-blur-sm border-[#292929]/50'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-6">
        {/* Brand Wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick('home');
          }}
          className="font-display text-2xl sm:text-[28px] tracking-[0.06em] text-[#D20A24] hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
          aria-label="ANU M. Home"
        >
          ANU M.
        </a>

        {/* Primary Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-6 text-[13px] font-normal text-[#C2C2C2]"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.id);
                }}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24] ${
                  isActive ? 'text-[#F5F5F5] font-medium' : 'hover:text-[#F5F5F5]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#D20A24]"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Actions matching Reference */}
        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href="/api/resume/download?doc=ai-ml"
            download="Anu_M_Resume.pdf"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-[#D20A24] bg-[#080808] text-[#D20A24] hover:bg-[#D20A24] hover:text-[#F5F5F5] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5F5F5]"
          >
            <span>Download Resume</span>
            <Download className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onOpenRecruiterMode}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-[#3A3A3A] bg-[#0F0F0F] text-[#F5F5F5] hover:border-[#F5F5F5] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
          >
            <span>Recruiter Mode</span>
            <Briefcase className="w-3.5 h-3.5 text-[#D4D4D4]" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="xl:hidden inline-flex items-center justify-center w-10 h-10 border border-[#292929] bg-[#151515] text-[#F5F5F5] hover:border-[#D20A24] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile & Tablet Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#080808] border-b border-[#292929] px-5 sm:px-8 py-5">
          <nav aria-label="Mobile Navigation" className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`px-3 py-2.5 text-xs font-medium border transition-colors ${
                    isActive
                      ? 'border-[#D20A24] bg-[#151515] text-[#F5F5F5]'
                      : 'border-[#292929] text-[#929292] hover:text-[#F5F5F5] hover:border-[#444]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex flex-wrap gap-2.5 pt-3 border-t border-[#292929]">
            <a
              href="/api/resume/download?doc=ai-ml"
              download="Anu_M_Resume.pdf"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold border border-[#D20A24] bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021]"
            >
              <Download className="w-4 h-4" aria-hidden="true" />
              <span>Download Resume</span>
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenRecruiterMode();
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium border border-[#3A3A3A] bg-[#151515] text-[#F5F5F5] hover:border-[#D20A24]"
            >
              <Briefcase className="w-4 h-4 text-[#D20A24]" aria-hidden="true" />
              <span>Recruiter Mode</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
