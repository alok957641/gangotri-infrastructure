'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { NAV_ITEMS } from '../../components/navigation';
import { Button } from '@/components/ui/button';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer = ({ isOpen, onClose }: MobileDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-sm bg-white/90 p-6 shadow-2xl backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-black">
                  <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
                    Gangotri
                  </span>
                </span>
                <span className="block text-[0.5rem] uppercase tracking-[0.2em] text-black/30">
                  Infrastructure
                </span>
              </div>
              <button
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-brand-400"
                aria-label="Close menu"
              >
                <X className="h-5 w-5 text-black" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.type === 'link' ? (
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="block rounded-xl px-4 py-3 text-base font-medium text-black transition-colors hover:bg-brand-50 hover:text-brand-700 focus:bg-brand-50 focus:outline-none"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <div className="rounded-xl px-4 py-3 text-base font-medium text-black">
                      {item.label}
                      <div className="mt-1 flex flex-col gap-0.5 pl-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={onClose}
                            className="block py-2 text-sm font-normal text-black/60 transition-colors hover:text-brand-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </nav>

            <div className="absolute bottom-8 left-6 right-6">
              <Button className="w-full rounded-full py-6 text-base" asChild>
                <a href="#quote" onClick={onClose}>
                  Get Free Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};