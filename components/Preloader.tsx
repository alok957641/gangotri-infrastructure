'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND_LINE = 'GANGOTRI INFRASTRUCTURE';

// Only runs once, on the very first page load — shows the splash for
// this long, then fades out. No longer touches link clicks at all,
// so every <a> / <Link> on the site navigates instantly as normal.
const DISPLAY_TIME = 2400;

export const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), DISPLAY_TIME);
    return () => window.clearTimeout(timer);
  }, []);

  // Lock scroll while the preloader is up
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0B1220]"
        >
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
          `}</style>

          {/* Blueprint grid, consistent with the rest of the site */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.06)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative flex flex-col items-center px-6"
          >
            {/* ===== Animated mark ===== */}
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              {/* pulsing outer rings */}
              {[0, 1].map((ring) => (
                <motion.span
                  key={ring}
                  className="absolute rounded-full border border-[#F5A623]/25"
                  style={{ width: `${70 + ring * 26}px`, height: `${70 + ring * 26}px` }}
                  animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.1, 0.5] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: ring * 0.4 }}
                />
              ))}

              {/* rotating compass mark, echoes the Hero sun diagram */}
              <motion.svg
                viewBox="0 0 44 44"
                className="h-11 w-11 sm:h-12 sm:w-12"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              >
                <circle cx="22" cy="22" r="20" stroke="#F5A623" strokeWidth="1.5" opacity="0.3" />
                <circle cx="22" cy="22" r="14" stroke="#F5A623" strokeWidth="1.2" opacity="0.5" />
                <g stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="22" y1="4" x2="22" y2="10" opacity="0.7" />
                  <line x1="22" y1="34" x2="22" y2="40" opacity="0.7" />
                  <line x1="4" y1="22" x2="10" y2="22" opacity="0.7" />
                  <line x1="34" y1="22" x2="40" y2="22" opacity="0.7" />
                </g>
                <path d="M22 12L28 22L22 32L16 22L22 12Z" stroke="#F5A623" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M22 16L25 22L22 28L19 22L22 16Z" fill="#F5A623" opacity="0.35" stroke="none" />
              </motion.svg>
            </div>

            {/* ===== Brand name — letters fade in one by one ===== */}
            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-[0.15em]">
              {BRAND_LINE.split('').map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.025, duration: 0.4 }}
                  className="font-['Space_Grotesk'] text-lg font-semibold tracking-[0.08em] text-white sm:text-2xl"
                  style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            {/* ===== Loading meter bar ===== */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="mt-7 h-[2px] w-40 overflow-hidden rounded-full bg-white/10 sm:w-56"
            >
              <motion.div
                className="h-full rounded-full bg-[#F5A623]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: DISPLAY_TIME / 1000, ease: 'easeInOut' }}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.4 }}
              className="mt-4 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.2em] text-white/35 sm:text-[11px]"
            >
              PREPARING YOUR SOLAR EXPERIENCE
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;