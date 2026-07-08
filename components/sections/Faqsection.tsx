'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

const faqs = [
  {
    q: 'How much can I actually save on my electricity bill?',
    a: 'Most residential customers cut their bill by 70–90%, depending on roof size, shading, and how much of your load is during daylight hours. We calculate your exact number during the free site survey — not before.',
  },
  {
    q: 'Does the government subsidy really apply, and who handles the paperwork?',
    a: 'Yes — residential rooftop systems typically qualify under the central subsidy scheme, applied through your DISCOM. We file the entire application on your behalf and keep you updated at each stage.',
  },
  {
    q: 'What happens during monsoon — do panels stop working or get damaged?',
    a: 'Panels are rated for monsoon conditions and mounting is engineered for wind load specific to your region. Output drops on heavily overcast days, same as any solar system, and recovers fully once skies clear.',
  },
  {
    q: 'What is actually covered under the 25-year warranty?',
    a: 'Panel performance (minimum output guarantee) is covered for 25 years, and manufacturing defects for 10–12 years depending on the brand installed. Inverters carry a separate 5–10 year warranty. We walk through the exact terms before you sign anything.',
  },
  {
    q: 'Can I pay in EMIs, or does it have to be upfront?',
    a: '0% EMI options are available through partner NBFCs for residential systems, alongside standard loans. Commercial and industrial projects are typically structured as capex or PPA — we help you compare both.',
  },
  {
    q: 'How long does installation take, start to finish?',
    a: 'Once the site survey is done and subsidy paperwork is filed, physical installation usually takes 3–5 days. Net metering approval and final switch-on from the DISCOM adds another 1–2 weeks depending on your state.',
  },
];

export const FaqSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,18,32,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <span className="h-px w-6 bg-[#F5A623]" />
            FREQUENTLY ASKED
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl lg:text-[3rem]">
            Questions people actually
            <br />
            ask before saying yes.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-lg border border-[#0B1220]/10"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={faq.q}
                className={i !== 0 ? 'border-t border-[#0B1220]/10' : ''}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors hover:bg-[#FAF8F4] sm:px-7"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-4">
                    <span className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-[#0B1220]/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-['Space_Grotesk'] text-[15px] font-semibold text-[#0B1220] sm:text-base">
                      {faq.q}
                    </span>
                  </span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-[#F5A623] transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pl-[3.35rem] pr-8 text-sm leading-relaxed text-[#0B1220]/55 sm:px-7 sm:pl-[3.6rem]">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-sm text-[#0B1220]/45"
        >
          Still have questions?{' '}
          <a href="#quote" className="font-medium text-[#B87211] underline underline-offset-2 hover:text-[#0B1220]">
            Talk to an engineer, not a salesperson.
          </a>
        </motion.p>
      </div>
    </section>
  );
};