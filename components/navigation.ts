import type { NavItem } from './types/navigation';

export const NAV_ITEMS: NavItem[] = [
  { type: 'link', label: 'Home', href: '/' },
  { type: 'link', label: 'About', href: '/about' },
  {
  label: 'Services',
  type: 'dropdown',
  children: [
    { label: 'Residential Solar', href: '/services#residential-solar' },
    { label: 'Commercial Solar', href: '/services#commercial-solar' },
    { label: 'Industrial Solar', href: '/services#industrial-solar' },
    { label: 'Solar Maintenance', href: '/services#solar-maintenance' },
    { label: 'EV Charging', href: '/services#ev-charging' },
  ],
},
  {
  type: 'dropdown',
  label: 'Products',
  children: [
    { label: 'Solar Panels', href: '/products#solar-panels' },
    { label: 'Inverters', href: '/products#inverters' },
    { label: 'Batteries', href: '/products#batteries' },
    { label: 'Mounting Structures', href: '/products#mounting-structures' },
    { label: 'Accessories', href: '/products#accessories' },
  ],
},
  {
    type: 'dropdown',
    label: 'Projects',
    children: [
     { label: 'Residential', href: '/projects#residential-projects' },
{ label: 'Commercial', href: '/projects#commercial-projects' },
{ label: 'Industrial', href: '/projects#industrial-projects' },
    ],
  },
  {
    type: 'dropdown',
    label: 'Resources',
    children: [
     { label: 'Solar Calculator', href: '/resources#solar-calculator' },
{ label: 'Government Subsidy', href: '/resources#government-subsidy' },
    ],
  },
  { type: 'link', label: 'Contact', href: '/contact' },
];