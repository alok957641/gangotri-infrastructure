'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

const columns = [
  {
    title: 'SERVICES',
    links: [
      { label: 'Residential Solar', href: '/services#residential-solar' },
      { label: 'Commercial Solar', href: '/services#commercial-solar' },
      { label: 'Industrial Solar', href: '/services#industrial-solar' },
      { label: 'EV Charging', href: '/services#ev-charging' },
    ],
  },
  {
    title: 'COMPANY',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Products', href: '/products' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Solar Calculator', href: '/resources#solar-calculator' },
      { label: 'Government Subsidy', href: '/resources#government-subsidy' },
      { label: 'Warranty Terms', href: '/contact#faq' },
      { label: 'FAQs', href: '/contact#faq' },
    ],
  },
];

export const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const isInView = useInView(footerRef, { once: true, amount: 0.15 });
  const shouldReduceMotion = useReducedMotion();

  // -------- SCROLL-DRIVEN EFFECTS (subtle) --------
  // Grid opacity – fades in as scroll reaches footer
  const gridOpacity = useTransform(scrollY, [0, 800], [0, 0.7]);

  // Glow movement – moves horizontally
  const glowX = useTransform(scrollY, [0, 1000], ['-30%', '10%']);
  const glowOpacity = useTransform(scrollY, [0, 800], [0, 0.6]);

  // Bottom bar – slides up (only once when in view)
  const barVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  // Container stagger for columns
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden bg-[#0B1220] pt-16"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
      `}</style>

      {/* Blueprint grid – scroll‑driven opacity */}
      <motion.div
        style={{ opacity: gridOpacity }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      {/* Subtle scroll‑driven glow */}
      {!shouldReduceMotion && (
        <motion.div
          style={{
            x: glowX,
            opacity: glowOpacity,
          }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -top-40 h-[400px] w-[400px] rounded-full bg-[#F5A623]/10 blur-[120px]"
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main grid – staggered fade-in */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]"
        >
          {/* Brand + contact */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#F5A623" strokeWidth="1.5" opacity="0.35" />
                <path d="M22 12L28 22L22 32L16 22L22 12Z" stroke="#F5A623" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-white">Gangotri</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Engineering rooftop, commercial, and industrial solar systems
              across Uttar Pradesh — from site survey to net metering.
            </p>
            <div className="mt-6 space-y-2.5 font-['IBM_Plex_Mono'] text-sm text-white/50">
              <a href="tel:+911234567890" className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-[#F5A623]" /> +91 91510 78495
              </a>
              <a href="mailto:gangotriinfrastructure1989@gmail.com" className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-3.5 w-3.5 text-[#F5A623]" /> gangotriinfrastructure1989@gmail.com
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-[#F5A623]" /> Uttar Pradesh service network
              </span>
            </div>
          </motion.div>

          {/* Link columns – each column fades in */}
          {columns.map((col) => (
            <motion.div key={col.title} variants={itemVariants}>
              <h4 className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.12em] text-white/35">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-[#F5A623]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar – slide up on view */}
        <motion.div
          variants={barVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row"
        >
          <p className="font-['IBM_Plex_Mono'] text-xs text-white/35">
            © {new Date().getFullYear()} Gangotri Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-['IBM_Plex_Mono'] text-xs text-white/35">
            <Link href="/privacy" className="hover:text-white/60">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60">Terms of Service</Link>
            <span className="text-white/20">ISO 9001:2025 Certified</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
