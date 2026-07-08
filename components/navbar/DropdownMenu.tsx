'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownMenuProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  isScrolled?: boolean;
  isActive?: boolean;
}

export const DropdownMenu = ({ trigger, items, isScrolled, isActive }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
          'hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#F5A623]',
          isScrolled ? 'text-[#0B1220]/60 hover:text-[#0B1220]' : 'text-white/70 hover:text-white',
          (isOpen || isActive) && (isScrolled ? 'text-[#0B1220]' : 'text-white')
        )}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {trigger}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-1/2 top-full z-50 mt-2 min-w-[200px] -translate-x-1/2 overflow-hidden rounded-xl border border-[#0B1220]/10 bg-white p-1.5 shadow-2xl"
            role="menu"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-4 py-2.5 text-sm font-medium text-[#0B1220]/75 transition-all duration-200 hover:translate-x-0.5 hover:bg-[#FAF8F4] hover:text-[#B87211] focus:bg-[#FAF8F4] focus:outline-none"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};