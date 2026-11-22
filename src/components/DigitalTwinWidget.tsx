import { ArrowRight, MessageSquare, RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import {
  AVATAR_POSE_IMAGES,
  PROFILE,
  TWIN_PROMPTS,
} from '../data/portfolioData.ts';
import type { AvatarPose, TwinPrompt } from '../types.ts';

interface DigitalTwinWidgetProps {
  onNavigateAndHighlight: (sectionId: string) => void;
  onOpenRecruiterMode: () => void;
}

const WELCOME_MESSAGE =
  "Hey! Welcome to Anu's portfolio. I'm her digital twin. Let me show you around!";

const POSE_LABELS: Record<AvatarPose, string> = {
  idle: 'Ready to guide',
  waving: 'Welcoming',
  presenting: 'Presenting',
  thinking: 'Finding details...',
  excited: 'Highlighting work',
  celebrating: 'Verified milestone',
};

export function DigitalTwinWidget({
  onNavigateAndHighlight,
  onOpenRecruiterMode,
}: DigitalTwinWidgetProps) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pose, setPose] = useState<AvatarPose>('waving');
  const [activePrompt, setActivePrompt] = useState<TwinPrompt | null>(null);
  const [isThinking, setIsThinking] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 460);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  if (!visible && !open) {
    return null;
  }

  const handleOpen = () => {
    setOpen(true);
    setPose(activePrompt ? activePrompt.pose : 'waving');
  };

  const handleSelectPrompt = (prompt: TwinPrompt) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsThinking(true);
    setPose('thinking');

    timerRef.current = window.setTimeout(() => {
      setIsThinking(false);
      setActivePrompt(prompt);
      setPose(prompt.pose);
    }, 260);
  };

  const handleReset = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setIsThinking(false);
    setActivePrompt(null);
    setPose('idle');
  };

  const handleTriggerAction = (prompt: TwinPrompt) => {
    if (prompt.actionType === 'recruiter') {
      setOpen(false);
      onOpenRecruiterMode();
      return;
    }
    if (prompt.targetId) {
      onNavigateAndHighlight(prompt.targetId);
      // On narrow viewports, close drawer so the navigated section is immediately clear
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Guided Digital Twin Panel */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Anu M. Digital Twin Portfolio Guide"
            className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] max-h-[78vh] bg-[#080808] border border-[#292929] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#151515] border-b border-[#292929] flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold">
                  MEET MY DIGITAL TWIN
                </p>
                <p className="text-xs text-[#D4D4D4] truncate">
                  Interactive Portfolio Guide · {POSE_LABELS[pose]}
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {activePrompt && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="p-1.5 border border-[#292929] bg-[#080808] text-[#929292] hover:text-[#F5F5F5] hover:border-[#D20A24] cursor-pointer"
                    aria-label="Reset guide"
                    title="Reset guide"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="p-1.5 border border-[#292929] bg-[#080808] text-[#F5F5F5] hover:border-[#D20A24] hover:text-[#D20A24] cursor-pointer"
                  aria-label="Close digital twin guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live 6-Pose Avatar Stage + Speech Response */}
            <div className="p-4 bg-[#111111] border-b border-[#292929] flex items-start gap-4">
              <div className="relative w-24 h-28 bg-[#F5EFE6] border border-[#292929] overflow-hidden shrink-0">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={pose}
                    src={AVATAR_POSE_IMAGES[pose]}
                    alt={`Anu M. 3D Digital Twin — ${POSE_LABELS[pose]}`}
                    referrerPolicy="no-referrer"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1.07 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.18 }}
                    className="w-full h-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>

              <div className="flex-1 min-w-0 space-y-2.5">
                {isThinking ? (
                  <p className="text-xs text-[#929292] italic">
                    Pulling verified portfolio details...
                  </p>
                ) : activePrompt ? (
                  <>
                    <p className="text-[11px] font-mono text-[#D20A24]">
                      Q: {activePrompt.question}
                    </p>
                    <p className="text-xs leading-relaxed text-[#F5F5F5]">
                      {activePrompt.response}
                    </p>
                    {activePrompt.fact && (
                      <p className="text-[11px] leading-snug text-[#929292] border-t border-[#292929] pt-2">
                        {activePrompt.fact}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={() => handleTriggerAction(activePrompt)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase bg-[#D20A24] text-[#F5F5F5] hover:bg-[#8F1021] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{activePrompt.actionLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-xs leading-relaxed text-[#F5F5F5]">{WELCOME_MESSAGE}</p>
                    <p className="text-[11px] text-[#929292]">
                      Choose any topic below to explore verified projects, skills, credentials, or
                      Recruiter Mode.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Guided Questions */}
            <div className="p-4 overflow-y-auto space-y-2 bg-[#080808]">
              <p className="text-[10px] tracking-[0.18em] uppercase text-[#929292] mb-2">
                ASK YOUR GUIDE
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {TWIN_PROMPTS.map((item) => {
                  const selected = activePrompt?.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectPrompt(item)}
                      className={`w-full text-left px-3 py-2 text-xs border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        selected
                          ? 'bg-[#151515] border-[#D20A24] text-[#F5F5F5]'
                          : 'bg-[#111111] border-[#292929] text-[#D4D4D4] hover:border-[#D20A24]/70 hover:text-[#F5F5F5]'
                      }`}
                    >
                      <span className="truncate">{item.question}</span>
                      <ArrowRight
                        className={`w-3.5 h-3.5 shrink-0 ${
                          selected ? 'text-[#D20A24]' : 'text-[#666]'
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Compact Floating Trigger Bar (Always unobtrusive, <= 56px tall on mobile) */}
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : handleOpen())}
        className="group flex items-center gap-3 pl-1.5 pr-4 py-1.5 bg-[#151515] border border-[#D20A24]/80 hover:border-[#D20A24] text-[#F5F5F5] shadow-2xl transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D20A24]"
        aria-expanded={open}
        aria-label={open ? 'Close Digital Twin guide' : 'Meet Your Guide — Open Anu M. Digital Twin'}
      >
        <div className="w-10 h-10 bg-[#0B3A53] border border-[#292929] overflow-hidden shrink-0">
          <img
            src={PROFILE.avatarMainUrl}
            alt="Anu M. 3D Avatar"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="text-left">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#F5F5F5] leading-tight whitespace-nowrap">
            MEET YOUR GUIDE
          </p>
          <p className="hidden sm:block text-[10px] text-[#929292] leading-tight mt-0.5">
            Anu&apos;s Digital Twin
          </p>
        </div>
        <MessageSquare
          className="w-4 h-4 text-[#D20A24] shrink-0 hidden sm:block"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
