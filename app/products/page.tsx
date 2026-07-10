'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  SunMedium,
  Cpu,
  BatteryCharging,
  Layers,
  Cable,
  Check,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CONTENT — swap copy, numbers, and image paths for your data
// ============================================================

const products = [
  {
    id: '01',
    slug: 'solar-panels',
    icon: SunMedium,
    tag: 'GENERATION',
    title: 'Solar Panels',
    lede:
      'Mono PERC and bifacial panels rated for Indian rooftop conditions, not lab conditions.',
    body: [
      'We stock and install mono PERC and bifacial modules from manufacturers with an actual India-based service presence — so a warranty claim doesn\'t mean waiting months for a reply from a plant overseas.',
      'Every panel is chosen against your roof\'s real sun hours, shading pattern, and dust load, not a generic wattage recommendation.',
    ],
    features: [
      'Mono PERC and bifacial module options',
      'Manufacturers with India-based service support',
      '25-year linear performance warranty',
      'Tested against dust, heat, and monsoon load',
      'Panel wattage matched to your roof, not upsold',
    ],
    stat: { value: '21.8%', label: 'peak module efficiency' },
    image: '/images/projects/solar-panels.jpg',
  },
  {
    id: '02',
    slug: 'inverters',
    icon: Cpu,
    tag: 'CONVERSION',
    title: 'Inverters',
    lede:
      'String and hybrid inverters sized to your load — the part that decides how much power you actually use.',
    body: [
      'The inverter is where most underperforming systems fail quietly. We size string inverters for standard grid-tied homes and offices, and hybrid inverters wherever backup power or battery storage is part of the plan.',
      'Every inverter install comes with app-based monitoring so you can see generation and consumption in real time, not just at the end of the month.',
    ],
    features: [
      'String inverters for grid-tied residential and commercial',
      'Hybrid inverters for battery-backed systems',
      'Real-time generation monitoring via app',
      'MPPT tracking tuned to your panel configuration',
      '5 to 10 year manufacturer warranty depending on model',
    ],
    stat: { value: '98%+', label: 'conversion efficiency' },
    image: '/images/projects/inverters.jpg',
  },
  {
    id: '03',
    slug: 'batteries',
    icon: BatteryCharging,
    tag: 'STORAGE',
    title: 'Batteries',
    lede:
      'Lithium storage sized for real outage hours, so backup isn\'t a guess when the grid actually goes down.',
    body: [
      'We size battery banks against your evening load and typical outage duration in your area — not a flat "one battery per household" default. Lithium iron phosphate (LFP) is our default chemistry for cycle life and heat tolerance.',
      'Batteries are integrated with your hybrid inverter and existing solar array, with priority-load configuration so essentials stay powered first during an outage.',
    ],
    features: [
      'LFP battery banks sized to your outage hours',
      'Seamless integration with hybrid inverters',
      'Priority-load configuration for essential circuits',
      'Rated for Indian ambient temperature ranges',
      '6,000+ cycle life on standard LFP packs',
    ],
    stat: { value: '10-yr', label: 'typical battery warranty' },
    image: '/images/projects/batteries.jpg',
  },
  {
    id: '04',
    slug: 'mounting-structures',
    icon: Layers,
    tag: 'STRUCTURE',
    title: 'Mounting Structures',
    lede:
      'Galvanized structures engineered against your actual roof type and regional wind load.',
    body: [
      'A panel is only as reliable as what it\'s bolted to. We fabricate hot-dip galvanized mounting structures rated for regional wind speeds, with separate designs for RCC roofs, tin sheds, ground-mount, and elevated structures over parking or open yards.',
      'Every structure is checked against roof waterproofing before install, so penetrations are sealed properly instead of left to leak after the first monsoon.',
    ],
    features: [
      'Hot-dip galvanized steel, corrosion-rated',
      'Separate designs for RCC, tin shed, and ground-mount',
      'Wind-load engineering for your specific region',
      'Elevated structures for parking and open-yard canopies',
      'Roof waterproofing checked before and after install',
    ],
    stat: { value: '150 km/h', label: 'wind-load rated designs' },
    image: '/images/projects/mounting-structures.jpg',
  },
  {
    id: '05',
    slug: 'accessories',
    icon: Cable,
    tag: 'BALANCE OF SYSTEM',
    title: 'Accessories',
    lede:
      'DC cables, combiner boxes, connectors, and monitoring hardware — the parts that quietly determine system life.',
    body: [
      'The balance-of-system components rarely get asked about, but they\'re where cheap installs fail early. We use UV-stabilized DC cabling, MC4 connectors rated for outdoor exposure, and combiner boxes with proper surge protection built in.',
      'Every install includes earthing kits and lightning arrestors sized to local code, plus optional smart monitoring hardware if you want panel-level data instead of just system-level output.',
    ],
    features: [
      'UV-stabilized DC cabling and outdoor-rated connectors',
      'Combiner boxes with built-in surge protection',
      'Earthing kits and lightning arrestors to local code',
      'Optional panel-level smart monitoring hardware',
      'Genuine parts only — no unbranded substitutes',
    ],
    stat: { value: '100%', label: 'code-compliant earthing' },
    image: '/images/projects/accessories.jpg',
  },
];

// ============================================================
// PAGE
// ============================================================

export const ProductsPage = () => {
  return (
    <main className="bg-white">
      <ProductsHero />
      {products.map((p, i) => (
        <ProductSection key={p.id} product={p} index={i} />
      ))}
      <ClosingCta />
    </main>
  );
};

// ===== HERO =====
function ProductsHero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section
      ref={ref}
      className="relative flex h-[72vh] min-h-[540px] items-end overflow-hidden bg-black pt-[88px]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Banner image — drop your real product/hardware photo at this path */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : imgY }}
        className="absolute inset-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/hero-hardware.jpg"
          alt="Solar panels, inverters, and batteries"
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
          WHAT WE INSTALL
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-3xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
        >
          Every component, chosen
          for your roof, not a catalog.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Panels, inverters, batteries, structures, and the balance-of-system
          parts nobody asks about until they fail.
        </motion.p>
      </div>
    </section>
  );
}

// ===== PRODUCT SECTION (repeats 5x, image alternates sides) =====
function ProductSection({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 1;
  const isDark = index % 2 === 1;
  const Icon = product.icon;

  return (
    <section
      ref={ref}
      id={product.slug}
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
        <div
          className={`grid items-center gap-14 lg:grid-cols-2 lg:gap-20 ${
            isEven ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`relative aspect-[4/3] overflow-hidden rounded-lg border ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            {/* Swap in a real product photo at the path below */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 h-full w-full object-cover opacity-0 grayscale transition-opacity duration-700 [&[src]]:opacity-100"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.opacity = '0';
              }}
            />
            <div
              className={`absolute inset-0 ${
                isDark ? 'bg-white/[0.03]' : 'bg-black/[0.03]'
              } bg-[linear-gradient(45deg,currentColor_1px,transparent_1px),linear-gradient(-45deg,currentColor_1px,transparent_1px)] bg-[size:22px_22px]`}
            />
            <span
              className={`absolute bottom-5 left-5 font-['IBM_Plex_Mono'] text-6xl font-semibold tracking-tight ${
                isDark ? 'text-white/15' : 'text-black/10'
              }`}
            >
              {product.id}
            </span>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div
              className={`flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] ${
                isDark ? 'text-white/50' : 'text-black/45'
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.75} />
              {product.tag}
            </div>

            <h2
              className={`mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight md:text-4xl ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {product.title}
            </h2>

            <p
              className={`mt-3 text-lg font-medium leading-snug ${
                isDark ? 'text-white/70' : 'text-black/60'
              }`}
            >
              {product.lede}
            </p>

            <div
              className={`mt-5 space-y-4 text-[15px] leading-relaxed ${
                isDark ? 'text-white/55' : 'text-black/55'
              }`}
            >
              {product.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {product.features.map((f) => (
                <li
                  key={f}
                  className={`flex items-start gap-2 text-sm leading-snug ${
                    isDark ? 'text-white/75' : 'text-black/70'
                  }`}
                >
                  <Check
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      isDark ? 'text-white/50' : 'text-black/40'
                    }`}
                    strokeWidth={2}
                  />
                  {f}
                </li>
              ))}
            </ul>

            <div
              className={`mt-8 flex flex-wrap items-center gap-6 border-t pt-6 ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <div>
                <div
                  className={`font-['IBM_Plex_Mono'] text-2xl font-medium ${
                    isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {product.stat.value}
                </div>
                <div
                  className={`font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}
                >
                  {product.stat.label.toUpperCase()}
                </div>
              </div>

              <a
                href="/contact"
                className={`group ml-auto flex items-center gap-1.5 text-sm font-semibold ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Ask about this component
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
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
            Not sure which brands or specs you need?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-black/55">
            Send us your roof size or last bill — we&apos;ll put together the
            exact panel, inverter, and battery spec sheet before you commit
            to anything.
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

export default ProductsPage;
