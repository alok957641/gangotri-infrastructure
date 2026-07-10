'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CtaSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-black/10 bg-white py-24 md:py-32"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* faint blueprint grid, consistent with hero + testimonials */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,18,32,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      {/* slow-drifting glow, one deliberate ambient touch */}
      {!shouldReduceMotion && (
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.08, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#F5A623]/15 blur-[100px]"
        />
      )}

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]"
        >
          <span className="h-px w-6 bg-[#F5A623]" />
          READY WHEN YOU ARE
          <span className="h-px w-6 bg-[#F5A623]" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-5 font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-black sm:text-5xl"
        >
          Your roof is already
          <br />
          generating a bill. <span className="text-[#F5A623]">Flip it.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-black/55 sm:text-lg"
        >
          A free site survey gets you an exact system size, cost, and
          subsidy amount in writing — no obligation, no pushy follow-up
          calls.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-md bg-black px-8 py-6 text-[15px] font-semibold text-white hover:bg-black/85"
            asChild
          >
            <a href="/contact">
              Get your free quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <a
            href="tel:+919151078495"
            className="group flex items-center gap-2 rounded-md border border-black/15 px-6 py-[13px] text-[15px] font-medium text-black/75 transition-colors hover:border-black/30 hover:text-black"
          >
            <PhoneCall className="h-4 w-4 text-[#F5A623]" />
            +91 91510 78495
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mx-auto mt-14 flex max-w-2xl flex-wrap items-center justify-center gap-x-10 gap-y-3 border-t border-black/10 pt-8 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-black/40"
        >
          <span>ISO 9001:2025</span>
          <span className="h-1 w-1 rounded-full bg-black/20" />
          <span>5,000+ INSTALLATIONS</span>
          <span className="h-1 w-1 rounded-full bg-black/20" />
          <span>UP SERVICE AREAS</span>
          <span className="h-1 w-1 rounded-full bg-black/20" />
          <span>25-YEAR PANEL WARRANTY</span>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
