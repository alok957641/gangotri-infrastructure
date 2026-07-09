'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, MapPin } from 'lucide-react';

const projects = [
  {
    code: 'PRJ-041',
    image: '/images/projects/residential-pune.jpeg',
    type: 'RESIDENTIAL',
    location: 'Pune, Maharashtra',
    capacity: '8.2 kW',
  },
  {
    code: 'PRJ-038',
    image: '/images/projects/commercial-ahmedabad.webp',
    type: 'COMMERCIAL',
    location: 'Ahmedabad, Gujarat',
    capacity: '64 kW',
  },
  {
    code: 'PRJ-052',
    image: '/images/projects/industrial-nagpur.jpeg',
    type: 'INDUSTRIAL',
    location: 'Nagpur, Maharashtra',
    capacity: '410 kW',
  },
  {
    code: 'PRJ-047',
    image: '/images/projects/residential-jaipur.jpg',
    type: 'RESIDENTIAL',
    location: 'Jaipur, Rajasthan',
    capacity: '6 kW',
  },
  {
    code: 'PRJ-033',
    image: '/images/projects/commercial-indore.jpg',
    type: 'COMMERCIAL',
    location: 'Indore, Madhya Pradesh',
    capacity: '110 kW',
  },
  {
    code: 'PRJ-029',
    image: '/images/projects/ev-charging-mumbai.jpg',
    type: 'EV CHARGING',
    location: 'Mumbai, Maharashtra',
    capacity: '4 bays',
  },
];

export const ProjectsGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const shouldReduceMotion = useReducedMotion();

  // -------- SCROLL-DRIVEN EFFECTS (subtle) --------
  // Heading parallax – moves up & fades slightly
  const headingY = useTransform(scrollY, [0, 600], [0, -30]);
  const headingOpacity = useTransform(scrollY, [0, 500], [1, 0.7]);

  // Background glow – moves horizontally with scroll
  const glowX = useTransform(scrollY, [0, 600], ['-50%', '-10%']);
  const glowScale = useTransform(scrollY, [0, 600], [1, 1.2]);

  // Grid opacity (scroll‑driven)
  const gridOpacity = useTransform(scrollY, [0, 800], [0, 1]);

  // Container variants for gallery items stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.15,
      },
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

      {/* Blueprint grid – scroll‑driven opacity */}
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
        {/* Header – with parallax */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : headingY,
            opacity: shouldReduceMotion ? 1 : headingOpacity,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
              <span className="h-px w-6 bg-[#F5A623]" />
              FIELD LOG
            </div>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl lg:text-[3.2rem]">
              Sites we&apos;ve wired,
              <br />
              not renders we&apos;ve made.
            </h2>
          </div>
          <a
            href="/projects"
            className="group flex shrink-0 items-center gap-1.5 border-b border-[#0B1220]/20 pb-1 text-[15px] font-medium text-[#0B1220]/80 transition-colors hover:border-[#0B1220] hover:text-[#0B1220]"
          >
            View all 500+ projects
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Gallery grid – stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.code}
              variants={itemVariants}
              whileHover={{
                y: -4,
                transition: { type: 'spring', stiffness: 400, damping: 15 },
              }}
              className="group relative overflow-hidden rounded-lg border border-[#0B1220]/10 bg-[#0B1220]"
            >
              {/* Photo frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.08)_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-white/15" strokeWidth={1.5} />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={`${project.type} solar installation in ${project.location}`}
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 [&[src]]:opacity-100"
                />

                {/* corner brackets */}
                <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-white/40" />
                <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-white/40" />
                <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-white/40" />
                <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-white/40" />

                <span className="absolute left-3 top-3 translate-y-4 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-white/70">
                  {project.code}
                </span>
              </div>

              {/* Caption bar */}
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
                <div>
                  <div className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-[#F5A623]">
                    {project.type}
                  </div>
                  <div className="mt-0.5 text-sm text-white/70">{project.location}</div>
                </div>
                <div className="font-['IBM_Plex_Mono'] text-sm font-medium text-white">
                  {project.capacity}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
