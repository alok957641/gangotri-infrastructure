'use client';

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';

// ---- Live meter data -------------------------------------------------
// Each stat animates like a real inverter / monitoring-dashboard readout.
const METERS = [
  { label: 'INSTALLED CAPACITY', target: 150.4, decimals: 1, suffix: ' MW' },
  { label: 'ACTIVE SITES', target: 5247, decimals: 0, suffix: '' },
  { label: 'AVG. PAYBACK', target: 4.2, decimals: 1, suffix: ' YRS' },
  { label: 'PANEL WARRANTY', target: 25, decimals: 0, suffix: ' YRS' },
];

// ---- Sun-diagram ray coordinates, precomputed once at module load ----
// Fixed to 2 decimal places so the server-rendered HTML and the
// client's first render produce byte-identical numbers (avoids the
// float-precision hydration mismatch you'd get from calling
// Math.cos/Math.sin fresh on both sides).
const SUN_RAYS = Array.from({ length: 24 }).map((_, i) => {
  const angle = (i / 24) * 2 * Math.PI;
  const inner = 178;
  const outer = i % 3 === 0 ? 196 : 188;
  return {
    key: i,
    x1: (200 + inner * Math.cos(angle)).toFixed(2),
    y1: (200 + inner * Math.sin(angle)).toFixed(2),
    x2: (200 + outer * Math.cos(angle)).toFixed(2),
    y2: (200 + outer * Math.sin(angle)).toFixed(2),
    major: i % 3 === 0,
  };
});

function useCountUp(target: number, decimals: number, start: boolean, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return value.toFixed(decimals);
}

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  // Some mobile browsers ignore the `autoPlay` HTML attribute unless
  // `muted` is also set as a JS property (not just the attribute) before
  // calling play(). This makes autoplay reliable on phones.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked (rare, e.g. low-power mode) — poster image
        // stays visible as a graceful fallback, nothing else to do here.
      });
    }
  }, []);

  const sunY = useTransform(scrollY, [0, 800], [0, 120]);
  const gridOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0.35]);

  const [metersInView, setMetersInView] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMetersInView(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-88px)] overflow-hidden bg-[#0B1220] pt-[88px]"
    >
      {/* Local fonts — move to layout <head> if you already load fonts globally */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* ===== VIDEO BACKGROUND ===== */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          // @ts-ignore — legacy attribute some older mobile WebViews still check
          webkit-playsinline="true"
          preload="auto"
          poster="/videos/hero-poster.jpg"
          className="h-full w-full object-cover"
        >
          <source src="/solar-video.mp4" type="video/mp4" />
        </video>
        {/* Light wash — just enough to keep the meter panel/text readable, video stays visible */}
        <div className="absolute inset-0 bg-[#0B1220]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/15 to-[#0B1220]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/35 via-transparent to-transparent" />
      </div>

      {/* ===== BLUEPRINT GRID ===== */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.07)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      {/* Horizon line — one deliberate structural mark, not decoration */}
      <div className="pointer-events-none absolute left-0 right-0 top-[62%] h-px bg-gradient-to-r from-transparent via-[#F5A623]/25 to-transparent" />

      {/* ===== TECHNICAL SUN DIAGRAM ===== */}
      {/* Hidden on phones — the video background carries the visual on
          small screens, the sun diagram comes back from `sm:` up. */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : sunY }}
        className="pointer-events-none absolute -top-24 -right-16 hidden h-[520px] w-[520px] sm:-right-16 sm:-top-16 sm:block"
      >
        <motion.svg
          viewBox="0 0 400 400"
          className="h-full w-full"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <circle cx="200" cy="200" r="170" fill="none" stroke="#F5A623" strokeWidth="0.75" opacity="0.25" />
          <circle cx="200" cy="200" r="130" fill="none" stroke="#F5A623" strokeWidth="0.75" opacity="0.35" />
          <circle cx="200" cy="200" r="90" fill="none" stroke="#F5A623" strokeWidth="0.75" opacity="0.45" />
          {SUN_RAYS.map((ray) => (
            <line
              key={ray.key}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke="#F5A623"
              strokeWidth={ray.major ? 1.5 : 0.75}
              opacity={ray.major ? 0.6 : 0.3}
              strokeLinecap="round"
            />
          ))}
          <circle cx="200" cy="200" r="46" fill="#F5A623" opacity="0.12" />
          <circle cx="200" cy="200" r="46" fill="none" stroke="#F5A623" strokeWidth="1" opacity="0.5" />
        </motion.svg>
      </motion.div>

      {/* ===== CONTENT ===== */}
      <motion.div
        style={{ opacity: shouldReduceMotion ? 1 : contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[calc(100vh-88px)] w-full max-w-7xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
      >
        {/* Live status line */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5A623] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5A623]" />
          </span>
          5,247 SYSTEMS ONLINE — LIVE ACROSS INDIA
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-6 max-w-3xl font-['Space_Grotesk'] text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]"
          style={{ textShadow: '0 2px 24px rgba(11,18,32,0.55)' }}
        >
          Engineered for the
          <br />
          UP grid,
          <span className="text-[#F5A623]"> not the brochure.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-6 max-w-xl font-['Inter'] text-base leading-relaxed text-white/75 sm:text-lg"
          style={{ textShadow: '0 1px 16px rgba(11,18,32,0.6)' }}
        >
          Monsoon-rated mounting, DISCOM-approved net metering, and subsidy
          paperwork handled end to end — installed by crews who&apos;ve done
          this on 5,000+ UP rooftops.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button
            size="lg"
            className="rounded-md bg-[#F5A623] px-7 py-6 text-[15px] font-semibold text-[#0B1220] hover:bg-[#f6b046]"
            asChild
          >
            <a href="#quote">
              Check your rooftop
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <a
            href="/projects"
            className="group flex items-center gap-1.5 border-b border-white/30 pb-1 text-[15px] font-medium text-white/90 transition-colors hover:border-white/60 hover:text-white"
          >
            See completed projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* ===== LIVE METER PANEL — signature element ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="relative mt-16 max-w-3xl overflow-hidden rounded-lg border border-white/15 bg-[#0B1220]/55 backdrop-blur-md"
        >
          {/* one deliberate scan sweep, not scattered ambient motion */}
          {!shouldReduceMotion && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ delay: 1.1, duration: 1.4, ease: 'easeInOut' }}
              className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-[#F5A623]/10 to-transparent"
            />
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {METERS.map((m, i) => (
              <MeterCell key={m.label} meter={m} start={metersInView} divider={i !== 0} />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

function MeterCell({
  meter,
  start,
  divider,
}: {
  meter: (typeof METERS)[number];
  start: boolean;
  divider: boolean;
}) {
  const display = useCountUp(meter.target, meter.decimals, start);
  return (
    <div
      className={`flex flex-col gap-1.5 px-5 py-5 sm:px-6 ${
        divider ? 'border-t border-white/10 sm:border-l sm:border-t-0' : ''
      }`}
    >
      <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-white/50">
        {meter.label}
      </span>
      <span className="font-['IBM_Plex_Mono'] text-2xl font-medium text-white sm:text-[1.7rem]">
        {display}
        {meter.suffix}
      </span>
    </div>
  );
}

export default HeroSection;
