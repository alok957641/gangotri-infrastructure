'use client';

import { useRef, useState } from 'react';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useReducedMotion,
  AnimatePresence,
} from 'framer-motion';
import { Home, Building2, Factory, MapPin, Zap, ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CONTENT — swap copy, numbers, and image paths for your data
// ============================================================

const categories = [
  {
    id: '01',
    slug: 'residential-projects',
    icon: Home,
    tag: 'ROOFTOP',
    title: 'Residential Projects',
    lede: 'Homes across Vidarbha and beyond, on-grid since as early as 2014.',
    accent: 'light' as const,
    projects: [
      {
        name: 'Shastri Nagar Bungalow',
        location: 'Nagpur, MH',
        capacity: '6.2 kW',
        year: '2023',
        image: '/images/projects/residential-01.jpg',
      },
      {
        name: 'Wardha Road Residence',
        location: 'Wardha, MH',
        capacity: '4.8 kW',
        year: '2022',
        image: '/images/projects/residential-02.jpg',
      },
      {
        name: 'Civil Lines Duplex',
        location: 'Nagpur, MH',
        capacity: '9.6 kW',
        year: '2024',
        image: '/images/projects/residential-03.jpg',
      },
    ],
  },
  {
    id: '02',
    slug: 'commercial-projects',
    icon: Building2,
    tag: 'ROOFTOP & CANOPY',
    title: 'Commercial Projects',
    lede: 'Offices, retail, and warehouses running on daytime generation.',
    accent: 'dark' as const,
    projects: [
      {
        name: 'MIDC Business Park',
        location: 'Butibori, MH',
        capacity: '120 kW',
        year: '2022',
        image: '/images/projects/commercial-01.jpg',
      },
      {
        name: 'Orange City Mall Annex',
        location: 'Nagpur, MH',
        capacity: '85 kW',
        year: '2023',
        image: '/images/projects/commercial-02.jpg',
      },
      {
        name: 'Amravati Cold Storage',
        location: 'Amravati, MH',
        capacity: '150 kW',
        year: '2024',
        image: '/images/projects/commercial-03.jpg',
      },
    ],
  },
  {
    id: '03',
    slug: 'industrial-projects',
    icon: Factory,
    tag: 'GROUND-MOUNT & HYBRID',
    title: 'Industrial Projects',
    lede: 'Factory-floor deployments engineered for continuous machinery load.',
    accent: 'light' as const,
    projects: [
      {
        name: 'Hingna MIDC Textile Unit',
        location: 'Hingna, MH',
        capacity: '480 kW',
        year: '2021',
        image: '/images/projects/industrial-01.jpg',
      },
      {
        name: 'Chandrapur Steel Works',
        location: 'Chandrapur, MH',
        capacity: '620 kW',
        year: '2023',
        image: '/images/projects/industrial-02.jpg',
      },
      {
        name: 'Nagpur Auto Components Plant',
        location: 'Nagpur, MH',
        capacity: '750 kW',
        year: '2025',
        image: '/images/projects/industrial-03.jpg',
      },
    ],
  },
];

// ============================================================
// PAGE
// ============================================================

export const ProjectsPage = () => {
  return (
    <main className="bg-white">
      <ProjectsHero />
      {categories.map((cat, i) => (
        <CategorySection key={cat.id} category={cat} index={i} />
      ))}
      <ClosingCta />
    </main>
  );
};

// ===== HERO =====
function ProjectsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative flex h-[74vh] min-h-[560px] items-end overflow-hidden bg-black pt-[88px]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Banner image — drop a real installed-project photo at this path */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : imgY }}
        className="absolute inset-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/hero-aerial.jpg"
          alt="Aerial view of an installed solar project"
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.opacity = '0';
          }}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/60"
        >
          <span className="h-px w-6 bg-white" />
          OUR WORK
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-3xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
        >
          5,000+ installs, three
          kinds of roof, one standard.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          From a 6 kW bungalow rooftop to a 750 kW factory floor — every
          project engineered before it was sold.
        </motion.p>

        {/* Quick category jump */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-9 flex flex-wrap gap-3"
        >
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`#${cat.slug}`}
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-['IBM_Plex_Mono'] text-xs tracking-wide text-white/75 transition-colors hover:border-white/50 hover:text-white"
            >
              <cat.icon className="h-3.5 w-3.5" strokeWidth={1.75} />
              {cat.title}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ===== CATEGORY SECTION (repeats 3x) =====
function CategorySection({
  category,
  index,
}: {
  category: (typeof categories)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const isDark = category.accent === 'dark';
  const Icon = category.icon;
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      id={category.slug}
      className={`relative scroll-mt-[88px] overflow-hidden border-t border-black/10 py-20 md:py-28 ${
        isDark ? 'bg-black' : 'bg-white'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)] ${
          isDark
            ? 'bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]'
            : 'bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)]'
        }`}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col justify-between gap-6 border-b pb-8 sm:flex-row sm:items-end lg:mb-16"
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          <div>
            <div
              className={`flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] ${
                isDark ? 'text-white/50' : 'text-black/45'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {category.tag}
            </div>
            <h2
              className={`mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight md:text-4xl ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {category.title}
            </h2>
            <p className={`mt-2 max-w-md text-[15px] leading-relaxed ${isDark ? 'text-white/55' : 'text-black/55'}`}>
              {category.lede}
            </p>
          </div>
          <span
            className={`font-['IBM_Plex_Mono'] text-7xl font-semibold leading-none tracking-tight ${
              isDark ? 'text-white/10' : 'text-black/10'
            }`}
          >
            {category.id}
          </span>
        </motion.div>

        {/* Project card grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {category.projects.map((project, i) => (
            <motion.button
              key={project.name}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.12 }}
              whileHover={{ y: -6 }}
              onClick={() => setActiveProject(i)}
              className={`group relative overflow-hidden rounded-lg border text-left ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Swap in a real project photo at the path below */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.name}
                  className="absolute inset-0 h-full w-full scale-100 object-cover opacity-0 grayscale transition-all duration-700 [&[src]]:opacity-100 group-hover:scale-[1.06]"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                />
                <div
                  className={`absolute inset-0 ${
                    isDark ? 'bg-white/[0.04]' : 'bg-black/[0.04]'
                  } bg-[linear-gradient(45deg,currentColor_1px,transparent_1px),linear-gradient(-45deg,currentColor_1px,transparent_1px)] bg-[size:20px_20px]`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-black/80 via-black/10' : 'from-black/70 via-black/5'
                  } to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  View details
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </motion.div>
              </div>

              <div className={`p-5 ${isDark ? 'bg-black' : 'bg-white'}`}>
                <h3 className={`font-['Space_Grotesk'] text-base font-semibold ${isDark ? 'text-white' : 'text-black'}`}>
                  {project.name}
                </h3>
                <div
                  className={`mt-2 flex items-center gap-3 font-['IBM_Plex_Mono'] text-[11px] tracking-wide ${
                    isDark ? 'text-white/45' : 'text-black/45'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {project.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3" /> {project.capacity}
                  </span>
                  <span>{project.year}</span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightweight detail overlay */}
      <AnimatePresence>
        {activeProject !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setActiveProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg overflow-hidden rounded-lg border border-black/10 bg-white"
            >
              <button
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={category.projects[activeProject].image}
                  alt={category.projects[activeProject].name}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-opacity duration-500 [&[src]]:opacity-100"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.opacity = '0';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-black">
                  {category.projects[activeProject].name}
                </h3>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-['IBM_Plex_Mono'] text-xs tracking-wide text-black/50">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5" /> {category.projects[activeProject].location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap className="h-3.5 w-3.5" /> {category.projects[activeProject].capacity} installed
                  </span>
                  <span>Commissioned {category.projects[activeProject].year}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-black/55">
                  Part of our {category.title.toLowerCase()} portfolio — engineered,
                  documented, and supported for the full warranty period.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ===== CLOSING CTA =====
function ClosingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-white py-20 md:py-24">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Want a roof like one of these?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-black/55">
            Every project above started with a free site survey. Yours can too —
            no obligation, no pushy follow-up calls.
          </p>
          <Button
            size="lg"
            className="mt-8 rounded-md bg-black px-8 py-6 text-[15px] font-semibold text-white hover:bg-black/85"
            asChild
          >
          <a href="/contact">
              Get your free quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default ProjectsPage;