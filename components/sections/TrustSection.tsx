'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Shield,
  Zap,
  Award,
  Clock,
  Users,
  Sun,
  Leaf,
  TrendingUp,
} from 'lucide-react';
import { cn } from '../lib/utils';

const features = [
  {
    icon: Shield,
    title: 'Premium Quality',
    description: 'ISO 9001:2025 certified panels with 25-year warranty and industry-leading efficiency.',
  },
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'Cutting-edge solar technology with AI-powered monitoring and smart energy management.',
  },
  {
    icon: Award,
    title: 'Trusted Excellence',
    description: '5,000+ successful installations across Uttar Pradesh with 98% customer satisfaction rating.',
  },
  {
    icon: Clock,
    title: 'Reliable Support',
    description: '24/7 customer support, rapid maintenance, and end-to-end project management.',
  },
];

const stats = [
  { label: 'PROJECTS', value: '500', suffix: '+', icon: Users },
  { label: 'INSTALLED CAPACITY', value: '150', suffix: ' MW', icon: Sun },
  { label: 'SATISFACTION', value: '98', suffix: '%', icon: TrendingUp },
  { label: 'CARBON OFFSET', value: '120K', suffix: ' TONS', icon: Leaf },
];

export const TrustSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // -------- SCROLL-DRIVEN EFFECTS (subtle) --------
  // Heading parallax – moves up
  const headingY = useTransform(scrollY, [0, 600], [0, -30]);

  // Background glow – moves horizontally & scales
  const glowX = useTransform(scrollY, [0, 600], ['-50%', '-10%']);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  // Grid opacity (scroll‑driven)
  const gridOpacity = useTransform(scrollY, [0, 800], [0, 1]);

  // Container variants for stats & cards stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' },
    },
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white py-20 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Same light background, just a real blueprint grid – now scroll‑driven */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,18,32,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]"
      />

      {/* Subtle scroll‑driven glow */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: glowX,
            scale: glowScale,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute top-0 h-[400px] w-[400px] -translate-y-1/3 rounded-full bg-[#F5A623]/10 blur-[120px]"
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header – parallax y + entry fade */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : headingY,
          }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5A623] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5A623]" />
            </span>
            WHY GANGOTRI INFRASTRUCTURE
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl lg:text-[3.2rem]">
            Built to survive
            <br />
            Uttar Pradesh&apos;s grid, not just its sun.
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-[#0B1220]/60 md:text-lg">
            Engineering discipline, transparent numbers, and support that
            doesn&apos;t disappear after installation.
          </p>
        </motion.div>

        {/* ===== STAT METER ROW — same instrument-panel language as Hero ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="mb-16 grid grid-cols-2 overflow-hidden rounded-lg border border-[#0B1220]/10 sm:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className={cn(
                'flex flex-col gap-2 px-6 py-6',
                index !== 0 && 'border-t border-[#0B1220]/10 sm:border-l sm:border-t-0'
              )}
            >
              <stat.icon className="h-4 w-4 text-[#F5A623]" strokeWidth={2} />
              <div className="font-['IBM_Plex_Mono'] text-2xl font-medium text-[#0B1220] md:text-3xl">
                {stat.value}
                <span className="text-lg text-[#0B1220]/40 md:text-xl">{stat.suffix}</span>
              </div>
              <div className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-[#0B1220]/40">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ===== FEATURE CARDS — solid, no glass/blur ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-px overflow-hidden rounded-lg border border-[#0B1220]/10 bg-[#0B1220]/10 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
              className="group relative flex flex-col bg-white p-7 transition-colors duration-300 hover:bg-[#FAF8F4]"
            >
              <feature.icon className="mb-4 h-6 w-6 text-[#F5A623]" strokeWidth={1.75} />
              <h3 className="mb-2 font-['Space_Grotesk'] text-lg font-semibold text-[#0B1220]">
                {feature.title}
              </h3>
              <p className="text-sm font-normal leading-relaxed text-[#0B1220]/55">
                {feature.description}
              </p>
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#F5A623] transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
