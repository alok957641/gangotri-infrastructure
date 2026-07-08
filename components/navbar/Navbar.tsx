'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu, X, ChevronDown, Home, Info, Briefcase, Package, FolderKanban,
  Calculator, Landmark, Newspaper, Mail, ArrowRight,
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '../../components/navigation';

export const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=IBM+Plex+Mono:wght@500&display=swap');
      `}</style>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed left-0 top-0 z-50 h-[80px] w-full border-b transition-all duration-500 sm:h-[88px]',
          isScrolled
            ? 'border-black/10 bg-white/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] backdrop-blur-2xl'
            : 'border-transparent bg-transparent shadow-none backdrop-blur-none'
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:gap-3" aria-label="Gangotri Infrastructure – Home">
            <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.5, ease: 'easeInOut' }} className="relative h-9 w-9 flex-shrink-0 sm:h-11 sm:w-11">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="22" cy="22" r="20" stroke="#F5A623" strokeWidth="1.5" opacity="0.3" />
                <circle cx="22" cy="22" r="14" stroke="#F5A623" strokeWidth="1.2" opacity="0.5" />
                <g stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round">
                  <line x1="22" y1="4" x2="22" y2="10" opacity="0.7" />
                  <line x1="22" y1="34" x2="22" y2="40" opacity="0.7" />
                  <line x1="4" y1="22" x2="10" y2="22" opacity="0.7" />
                  <line x1="34" y1="22" x2="40" y2="22" opacity="0.7" />
                  <line x1="8.4" y1="8.4" x2="12.6" y2="12.6" opacity="0.5" />
                  <line x1="31.4" y1="31.4" x2="35.6" y2="35.6" opacity="0.5" />
                  <line x1="8.4" y1="35.6" x2="12.6" y2="31.4" opacity="0.5" />
                  <line x1="31.4" y1="12.6" x2="35.6" y2="8.4" opacity="0.5" />
                </g>
                <path d="M22 12L28 22L22 32L16 22L22 12Z" stroke="#F5A623" strokeWidth="1.4" strokeLinejoin="round" />
                <path d="M22 16L25 22L22 28L19 22L22 16Z" fill="#F5A623" opacity="0.3" stroke="none" />
              </svg>
            </motion.div>
            <div className="flex flex-col leading-tight">
              <span className={cn('font-[\'Space_Grotesk\'] text-base font-bold tracking-tight transition-colors sm:text-lg', isScrolled ? 'text-[#0B1220]' : 'text-white')}>Gangotri</span>
              <span className={cn('font-[\'IBM_Plex_Mono\'] text-[0.5rem] font-medium uppercase tracking-[0.2em] transition-colors sm:text-[0.55rem]', isScrolled ? 'text-[#0B1220]/40' : 'text-white/50')}>Infrastructure</span>
            </div>
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_ITEMS.map((item) => {
              if (item.type === 'link') {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                      'hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]',
                      isScrolled ? 'text-[#0B1220]/60 hover:text-[#0B1220]' : 'text-white/70 hover:text-white',
                      isActive && (isScrolled ? 'text-[#0B1220]' : 'text-white'),
                      'after:absolute after:bottom-1 after:left-1/4 after:h-0.5 after:w-1/2 after:rounded-full after:bg-[#F5A623] after:transition-all after:duration-300',
                      isActive ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              if (item.type === 'dropdown') {
                const isChildActive = item.children?.some((c) => pathname === c.href || pathname?.startsWith(c.href.split('#')[0]));
                return (
                  <div key={item.label} className="relative" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                    <button
                      className={cn(
                        'flex items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                        'hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]',
                        isScrolled ? 'text-[#0B1220]/60 hover:text-[#0B1220]' : 'text-white/70 hover:text-white',
                        (activeDropdown === item.label || isChildActive) && (isScrolled ? 'text-[#0B1220]' : 'text-white')
                      )}
                      aria-haspopup="true"
                      aria-expanded={activeDropdown === item.label}
                    >
                      {item.label}
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-300', activeDropdown === item.label && 'rotate-180')} />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 8 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 8 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute left-1/2 top-full z-50 mt-2 min-w-[220px] -translate-x-1/2 overflow-hidden rounded-xl border border-[#0B1220]/10 bg-white p-1.5 shadow-2xl"
                          role="menu"
                        >
                          {item.children?.map((child) => {
                            const childActive = pathname === child.href;
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={cn(
                                  'block rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:translate-x-0.5 hover:bg-[#FAF8F4] hover:text-[#B87211] focus:outline-none focus-visible:bg-[#FAF8F4]',
                                  childActive ? 'bg-[#FAF8F4] text-[#B87211]' : 'text-[#0B1220]/75'
                                )}
                                role="menuitem"
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              return null;
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Button className="hidden rounded-md bg-[#F5A623] px-5 py-5 text-sm font-semibold text-[#0B1220] hover:bg-[#f6b046] lg:inline-flex" asChild>
              <a href="#quote">Get Free Quote<ArrowRight className="ml-1.5 h-3.5 w-3.5" /></a>
            </Button>
            <button onClick={() => setIsMobileOpen(true)} className={cn('flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden', isScrolled ? 'text-[#0B1220] hover:bg-black/5' : 'text-white hover:bg-white/10')} aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-40 bg-[#0B1220]/50 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 350 }} className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white p-6 shadow-2xl sm:max-w-md" role="dialog" aria-modal="true" aria-label="Mobile navigation">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-['Space_Grotesk'] text-lg font-bold text-[#0B1220]">Gangotri</span>
                  <span className="block font-['IBM_Plex_Mono'] text-[0.45rem] uppercase tracking-[0.2em] text-[#0B1220]/35">Infrastructure</span>
                </div>
                <button onClick={() => setIsMobileOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F5A623]" aria-label="Close menu">
                  <X className="h-5 w-5 text-[#0B1220]" />
                </button>
              </div>

              <nav className="mt-8 flex flex-1 flex-col gap-0.5 overflow-y-auto">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = item.type === 'link' && pathname === item.href;
                  return (
                    <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.04, duration: 0.3 }}>
                      {item.type === 'link' ? (
                        <Link href={item.href} onClick={() => setIsMobileOpen(false)} className={cn('flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-[#FAF8F4] hover:text-[#B87211] focus:outline-none focus-visible:bg-[#FAF8F4]', isActive ? 'bg-[#FAF8F4] text-[#B87211]' : 'text-[#0B1220]')}>
                          {item.label === 'Home' && <Home className="h-4 w-4 text-[#F5A623]" />}
                          {item.label === 'About' && <Info className="h-4 w-4 text-[#F5A623]" />}
                          {item.label === 'Solar Calculator' && <Calculator className="h-4 w-4 text-[#F5A623]" />}
                          {item.label === 'Government Subsidy' && <Landmark className="h-4 w-4 text-[#F5A623]" />}
                          {item.label === 'Blog' && <Newspaper className="h-4 w-4 text-[#F5A623]" />}
                          {item.label === 'Contact' && <Mail className="h-4 w-4 text-[#F5A623]" />}
                          {item.label}
                        </Link>
                      ) : (
                        <div className="rounded-xl px-4 py-3">
                          <div className="flex items-center gap-3 text-base font-medium text-[#0B1220]">
                            {item.label === 'Services' && <Briefcase className="h-4 w-4 text-[#F5A623]" />}
                            {item.label === 'Products' && <Package className="h-4 w-4 text-[#F5A623]" />}
                            {item.label === 'Projects' && <FolderKanban className="h-4 w-4 text-[#F5A623]" />}
                            {item.label}
                          </div>
                          <div className="mt-1 flex flex-col gap-0.5 pl-7">
                            {item.children?.map((child) => (
                              <Link key={child.href} href={child.href} onClick={() => setIsMobileOpen(false)} className={cn('block py-2 text-sm font-normal transition-colors hover:text-[#B87211]', pathname === child.href ? 'text-[#B87211]' : 'text-[#0B1220]/55')}>
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </nav>

              <div className="mt-auto pt-6">
                <Button className="w-full rounded-md bg-[#F5A623] py-6 text-base font-semibold text-[#0B1220] hover:bg-[#f6b046]" asChild>
                  <a href="#quote" onClick={() => setIsMobileOpen(false)}>Get Free Quote<ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
                <div className="mt-4 flex justify-center gap-6 font-['IBM_Plex_Mono'] text-xs text-[#0B1220]/35">
                  <span>ISO 9001:2025</span><span>•</span><span>5,000+ Installations</span>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};