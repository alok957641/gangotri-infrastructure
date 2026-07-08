'use client';

import Link from 'next/link';
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
  return (
    <footer className="relative overflow-hidden bg-[#0B1220] pt-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="flex items-center gap-2.5">
              <svg width="28" height="28" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="#F5A623" strokeWidth="1.5" opacity="0.35" />
                <path d="M22 12L28 22L22 32L16 22L22 12Z" stroke="#F5A623" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
              <span className="font-['Space_Grotesk'] text-lg font-bold text-white">Gangotri</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              Engineering rooftop, commercial, and industrial solar systems
              across India — from site survey to net metering.
            </p>
            <div className="mt-6 space-y-2.5 font-['IBM_Plex_Mono'] text-sm text-white/50">
              <a href="tel:+911234567890" className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 text-[#F5A623]" /> +91 12345 67890
              </a>
              <a href="mailto:hello@gangotriinfra.in" className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-3.5 w-3.5 text-[#F5A623]" /> hello@gangotriinfra.in
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-3.5 w-3.5 text-[#F5A623]" /> Pan-India network
              </span>
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
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
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
          <p className="font-['IBM_Plex_Mono'] text-xs text-white/35">
            © {new Date().getFullYear()} Gangotri Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-['IBM_Plex_Mono'] text-xs text-white/35">
            <Link href="/privacy" className="hover:text-white/60">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white/60">Terms of Service</Link>
            <span className="text-white/20">ISO 9001:2025 Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};