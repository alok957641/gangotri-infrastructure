// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export const Logo = () => {
//   return (
//     <Link
//       href="/"
//       className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 focus:ring-offset-transparent"
//       aria-label="Gangotri Infrastructure – Home"
//     >
//       <motion.div
//         whileHover={{ scale: 1.04, rotate: -2 }}
//         transition={{ type: 'spring', stiffness: 400, damping: 10 }}
//         className="relative h-11 w-11 flex-shrink-0"
//       >
//         <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <circle cx="22" cy="22" r="20" stroke="url(#logoGrad)" strokeWidth="1.5" opacity="0.3" />
//           <circle cx="22" cy="22" r="14" stroke="url(#logoGrad)" strokeWidth="1.2" opacity="0.5" />
//           <g stroke="url(#logoGrad)" strokeWidth="1.8" strokeLinecap="round">
//             <line x1="22" y1="4" x2="22" y2="10" opacity="0.7" />
//             <line x1="22" y1="34" x2="22" y2="40" opacity="0.7" />
//             <line x1="4" y1="22" x2="10" y2="22" opacity="0.7" />
//             <line x1="34" y1="22" x2="40" y2="22" opacity="0.7" />
//             <line x1="8.4" y1="8.4" x2="12.6" y2="12.6" opacity="0.5" />
//             <line x1="31.4" y1="31.4" x2="35.6" y2="35.6" opacity="0.5" />
//             <line x1="8.4" y1="35.6" x2="12.6" y2="31.4" opacity="0.5" />
//             <line x1="31.4" y1="12.6" x2="35.6" y2="8.4" opacity="0.5" />
//           </g>
//           <path
//             d="M22 12L28 22L22 32L16 22L22 12Z"
//             stroke="url(#logoGrad)"
//             strokeWidth="1.4"
//             strokeLinejoin="round"
//           />
//           <path
//             d="M22 16L25 22L22 28L19 22L22 16Z"
//             fill="url(#logoGrad)"
//             opacity="0.3"
//             stroke="none"
//           />
//           <defs>
//             <linearGradient id="logoGrad" x1="4" y1="4" x2="40" y2="40">
//               <stop offset="0%" stopColor="#34d399" />
//               <stop offset="50%" stopColor="#0d9488" />
//               <stop offset="100%" stopColor="#059669" />
//             </linearGradient>
//           </defs>
//         </svg>
//       </motion.div>

//       <div className="flex flex-col leading-tight">
//         <span className="text-base font-bold tracking-tight text-white transition-colors group-hover:text-brand-400 sm:text-lg">
//           <span className="bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
//             Gangotri
//           </span>
//         </span>
//         <span className="text-[0.55rem] font-medium uppercase tracking-[0.2em] text-white/50 transition-colors group-hover:text-white/70 sm:text-xs">
//           Infrastructure
//         </span>
//       </div>
//     </Link>
//   );
// };