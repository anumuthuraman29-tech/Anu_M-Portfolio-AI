import { MotionConfig } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { AboutSection } from './components/AboutSection.tsx';
import { CertificatesSection } from './components/CertificatesSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { DigitalTwinWidget } from './components/DigitalTwinWidget.tsx';
import { DocumentCentreSection } from './components/DocumentCentreSection.tsx';
import { EducationSkillsSection } from './components/EducationSkillsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { HeroSection } from './components/HeroSection.tsx';
import { LeadershipSection } from './components/LeadershipSection.tsx';
import { Navbar } from './components/Navbar.tsx';
import { OwnerAdminModal } from './components/OwnerAdminModal.tsx';
import { ProcessExperienceSection } from './components/ProcessExperienceSection.tsx';
import { ProjectsSection } from './components/ProjectsSection.tsx';
import { RecruiterModeModal } from './components/RecruiterModeModal.tsx';
import { INITIAL_CERTIFICATES, INTERNSHIP } from './data/portfolioData.ts';
import type { CertificateItem, ProjectCaseStudy } from './types.ts';

const TRACKED_SECTIONS = [
  'home',
  'about',
  'projects',
  'education',
  'skills',
  'experience',
  'certificates',
  'documents',
  'leadership',
  'contact',
];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [certificates, setCertificates] = useState<CertificateItem[]>(INITIAL_CERTIFICATES);
  const [certsLoading, setCertsLoading] = useState<boolean>(true);

  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeCertificate, setActiveCertificate] = useState<CertificateItem | null>(null);
  const [recruiterOpen, setRecruiterOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Fetch live persisted certificates from Express backend
  useEffect(() => {
    let cancelled = false;
    fetch('/api/certificates')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { certificates?: CertificateItem[] } | null) => {
        if (!cancelled && data?.certificates && Array.isArray(data.certificates)) {
          setCertificates(data.certificates);
        }
      })
      .catch(() => {
        // Fallback to verified INITIAL_CERTIFICATES already in state
      })
      .finally(() => {
        if (!cancelled) setCertsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll-spy for active navigation highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    TRACKED_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((sectionId: string, highlight = false) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(sectionId);

    if (highlight) {
      el.classList.remove('section-highlighted');
      // Force reflow so repeat highlights animate cleanly
      void el.offsetWidth;
      el.classList.add('section-highlighted');
      window.setTimeout(() => el.classList.remove('section-highlighted'), 1900);
    }
  }, []);

  const handleViewInternshipCertificate = useCallback(() => {
    const found =
      certificates.find((c) => c.id === INTERNSHIP.certificateId) || certificates[0] || null;
    if (found) {
      setActiveCertificate(found);
    } else {
      scrollToSection('certificates', true);
    }
  }, [certificates, scrollToSection]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#080808] text-[#F5F5F5]">
        <Navbar
          activeSection={activeSection}
          onNavigate={(id) => scrollToSection(id)}
          onOpenRecruiterMode={() => setRecruiterOpen(true)}
        />

        <main>
          <HeroSection
            onExploreProjects={() => scrollToSection('projects')}
            onOpenRecruiterMode={() => setRecruiterOpen(true)}
          />

          <ProjectsSection
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
          />

          <EducationSkillsSection />

          <ProcessExperienceSection
            onViewInternshipCertificate={handleViewInternshipCertificate}
          />

          <AboutSection />

          <CertificatesSection
            certificates={certificates}
            loading={certsLoading}
            activeCertificate={activeCertificate}
            onSelectCertificate={setActiveCertificate}
            onOpenAdmin={() => setAdminOpen(true)}
          />

          <DocumentCentreSection
            certificates={certificates}
            onViewCertificate={setActiveCertificate}
          />

          <LeadershipSection />

          <ContactSection />
        </main>

        <Footer
          onOpenRecruiterMode={() => setRecruiterOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onScrollTop={() => scrollToSection('home')}
        />

        {/* Signature Interactive Digital Twin Widget */}
        <DigitalTwinWidget
          onNavigateAndHighlight={(id) => scrollToSection(id, true)}
          onOpenRecruiterMode={() => setRecruiterOpen(true)}
        />

        {/* Recruiter Mode Dashboard */}
        <RecruiterModeModal
          open={recruiterOpen}
          onClose={() => setRecruiterOpen(false)}
          certificates={certificates}
          onNavigateSection={(id) => scrollToSection(id, true)}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onSelectCertificate={(cert) => setActiveCertificate(cert)}
        />

        {/* Protected Owner Workspace (Certificates CRUD + Inquiries Inbox) */}
        <OwnerAdminModal
          open={adminOpen}
          onClose={() => setAdminOpen(false)}
          certificates={certificates}
          onCertificatesUpdated={setCertificates}
        />
      </div>
    </MotionConfig>
  );
}
