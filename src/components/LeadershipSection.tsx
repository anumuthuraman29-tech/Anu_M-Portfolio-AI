import { motion } from 'motion/react';
import { LEADERSHIP_ITEMS } from '../data/portfolioData.ts';

export function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="py-20 lg:py-28 bg-[#080808] border-b border-[#292929]"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-12 border-b border-[#292929]">
          <div>
            <p className="text-[11px] tracking-[0.22em] uppercase text-[#D20A24] font-semibold mb-2">
              07 · Campus Leadership &amp; Technical Events
            </p>
            <h2 className="font-display text-5xl sm:text-6xl tracking-[0.04em] text-[#F5F5F5] uppercase leading-none">
              BEYOND TECHNOLOGY.
            </h2>
          </div>
          <p className="text-xs tracking-[0.14em] uppercase text-[#929292]">
            Organization · Collaboration · Problem-Solving
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LEADERSHIP_ITEMS.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              className="bg-[#151515] border border-[#292929] p-6 sm:p-8 flex flex-col justify-between hover:border-[#D20A24]/60 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-4 pb-4 mb-4 border-b border-[#292929]">
                  <div>
                    <p className="text-[10px] tracking-[0.2em] uppercase text-[#D20A24] font-semibold mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-heading text-xl sm:text-2xl tracking-[0.04em] text-[#F5F5F5] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <span className="font-display text-4xl text-[#D20A24] leading-none tabular-nums shrink-0">
                    {item.number}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-[#B8B8B8] mb-5">
                  {item.description}
                </p>
              </div>

              <p className="text-[11px] font-mono text-[#929292] pt-4 border-t border-[#292929]">
                {item.skillsDemonstrated.join(' · ')}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
