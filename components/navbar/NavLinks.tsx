'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '../lib/utils';
import { NAV_ITEMS } from '../../components/navigation';
import { DropdownMenu } from '../navbar/DropdownMenu';
import { ChevronDown } from 'lucide-react';

interface NavLinksProps {
  className?: string;
  isScrolled?: boolean;
}

export const NavLinks = ({ className, isScrolled }: NavLinksProps) => {
  const pathname = usePathname();

  return (
    <nav className={cn('items-center gap-0.5', className)} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => {
        if (item.type === 'link') {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300',
                'hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#F5A623]',
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
          const isChildActive = item.children?.some((c) => c.href === pathname);
          return (
            <DropdownMenu
              key={item.label}
              isScrolled={isScrolled}
              isActive={isChildActive}
              trigger={
                <span className="flex items-center gap-1">
                  {item.label}
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-300" />
                </span>
              }
              items={item.children?.map((child) => ({
                label: child.label,
                href: child.href,
              })) ?? []}
            />
          );
        }

        return null;
      })}
    </nav>
  );
};