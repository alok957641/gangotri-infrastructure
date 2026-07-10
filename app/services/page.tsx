'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import {
  Home,
  Building2,
  Factory,
  Wrench,
  Zap,
  Check,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CONTENT — swap copy, numbers, and image paths for your data
// ============================================================

const services = [
  {
    id: '01',
    slug: 'residential-solar',
    icon: Home,
    tag: 'FOR HOMES',
    title: 'Residential Solar',
    lede:
      'Rooftop systems sized to your actual electricity bill, not a one-size panel count.',
    body: [
      'We start with twelve months of your DISCOM bills, not a rough estimate. That tells us your real load, your peak hours, and how many panels actually pay for themselves — instead of how many fit on the roof.',
      'Every residential install includes structural checks for your roof type, monsoon-rated mounting, and full net-metering paperwork filed with your DISCOM on your behalf.',
    ],
    features: [
      'Free load audit from past electricity bills',
      'Net-metering application handled end-to-end',
      'Monsoon and wind-rated roof mounting',
      '25-year panel performance warranty',
      'System monitoring app included',
    ],
    stat: { value: '5,000+', label: 'homes powered' },
    image: '/images/projects/residential-solar.jpg',
  },
  {
    id: '02',
    slug: 'commercial-solar',
    icon: Building2,
    tag: 'FOR BUSINESSES',
    title: 'Commercial Solar',
    lede:
      'Rooftop and canopy systems built around office hours, tariff slabs, and payback math.',
    body: [
      'Offices, retail spaces, and warehouses run on daytime loads — which is exactly when solar output peaks. We model your consumption curve against generation to size a system that offsets real demand, not nameplate capacity.',
      'Commercial clients get a written ROI projection, open-access and group-captive options where applicable, and a single point of contact through construction, commissioning, and compliance.',
    ],
    features: [
      'Consumption-matched system sizing, not guesswork',
      'Written payback period before you sign anything',
      'Open access and group-captive advisory',
      'Zero disruption to business hours during install',
      'Single-vendor accountability for the full project',
    ],
    stat: { value: '100 kW+', label: 'first commercial project, 2017' },
    image: '/images/projects/commercial-solar.jpg',
  },
  {
    id: '03',
    slug: 'industrial-solar',
    icon: Factory,
    tag: 'FOR FACTORIES',
    title: 'Industrial Solar',
    lede:
      'High-load, always-on installations engineered for factory floors and continuous machinery.',
    body: [
      'Industrial sites don\'t forgive underdesigned systems — machinery draws load around the clock, and downtime costs more than a delayed install ever would. Our industrial work covers ground-mount, rooftop, and hybrid arrays sized against continuous draw, not average draw.',
      'We handle heavy structural load calculations, HT/LT integration, and coordination with your existing electrical contractors so the solar install adds to your operation instead of interrupting it.',
    ],
    features: [
      'Ground-mount, rooftop, and hybrid array design',
      'Load calculations for continuous machinery draw',
      'HT/LT panel integration with existing infrastructure',
      'Phased rollout for multi-unit facilities',
      'Crossed 50 MW industrial capacity in 2021',
    ],
    stat: { value: '150 MW', label: 'installed capacity across Uttar Pradesh' },
    image: '/images/projects/industrial-solar.jpg',
  },
  {
    id: '04',
    slug: 'solar-maintenance',
    icon: Wrench,
    tag: 'FOR EXISTING SYSTEMS',
    title: 'Solar Maintenance',
    lede:
      'Panels lose output quietly. Scheduled maintenance is how you catch it before the bill does.',
    body: [
      'A dusty panel, a loose connection, or a failing string can cut output by double digits without ever tripping an alarm. Our maintenance contracts include scheduled cleaning, thermal imaging inspections, and inverter health checks — whether or not we installed the original system.',
      'We stay on record as your installer for the full 25-year warranty period, which means maintenance isn\'t an add-on service — it\'s the same team that sized and built the system in the first place.',
    ],
    features: [
      'Scheduled panel cleaning and visual inspection',
      'Thermal imaging to catch failing cells early',
      'Inverter and string-level health monitoring',
      'Warranty claim handling on your behalf',
      'Maintenance plans for third-party installs too',
    ],
    stat: { value: '25-yr', label: 'warranty-period accountability' },
    image: '/images/projects/solar-maintenance.jpg',
  },
  {
    id: '05',
    slug: 'ev-charging',
    icon: Zap,
    tag: 'FOR EVs',
    title: 'EV Charging',
    lede:
      'Charge points sized off your solar system, so the car runs on what the roof already makes.',
    body: [
      'EV charging added on top of an existing solar array is a load calculation problem before it\'s a hardware problem — we check whether your current system, or a resized one, can carry a charger without pulling extra grid power at peak tariff hours.',
      'We install both AC home chargers and higher-capacity setups for fleets and commercial parking, with the same net-metering and compliance handling that comes with every other install we do.',
    ],
    features: [
      'Load compatibility check against your solar system',
      'AC home charger and fleet-scale installs',
      'Smart charging scheduled to solar generation hours',
      'DISCOM compliance for combined solar + EV load',
      'Single warranty and support line for both systems',
    ],
    stat: { value: '2 systems', label: 'one point of contact' },
    image: '/images/projects/ev-charging.jpg',
  },
];

// ============================================================
// PAGE
// ============================================================

export const ServicesPage = () => {
  return (
    <main className="bg-white">
      <ServicesHero />
      {services.map((s, i) => (
        <ServiceSection key={s.id} service={s} index={i} />
      ))}
      <ClosingCta />
    </main>
  );
};

// ===== HERO =====
function ServicesHero() {
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

      {/* Always-visible fallback background — shows even if the real photo below is missing */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]" />

      {/* Banner image — drop your real rooftop/panel photo at this path */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : imgY }}
        className="absolute inset-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/service-hero.jpg"
          alt="Solar panel installation"
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
          WHAT WE BUILD
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-3xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
        >
          Five ways we put solar
          to work, roof to road.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          Homes, offices, factories, upkeep, and the car in your driveway —
          one engineering team, one warranty, one number to call.
        </motion.p>
      </div>
    </section>
  );
}

// ===== SERVICE SECTION (repeats 5x, image alternates sides) =====
function ServiceSection({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const isEven = index % 2 === 1;
  const isDark = index % 2 === 1;
  const Icon = service.icon;

  return (
    <section
      ref={ref}
      id={service.slug}
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
            {/* Swap in a real photo at the path below */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.image}
              alt={service.title}
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
              {service.id}
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
              {service.tag}
            </div>

            <h2
              className={`mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight md:text-4xl ${
                isDark ? 'text-white' : 'text-black'
              }`}
            >
              {service.title}
            </h2>

            <p
              className={`mt-3 text-lg font-medium leading-snug ${
                isDark ? 'text-white/70' : 'text-black/60'
              }`}
            >
              {service.lede}
            </p>

            <div
              className={`mt-5 space-y-4 text-[15px] leading-relaxed ${
                isDark ? 'text-white/55' : 'text-black/55'
              }`}
            >
              {service.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {service.features.map((f) => (
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
                  {service.stat.value}
                </div>
                <div
                  className={`font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] ${
                    isDark ? 'text-white/40' : 'text-black/40'
                  }`}
                >
                  {service.stat.label.toUpperCase()}
                </div>
              </div>

              <a
                href="/contact"
                className={`group ml-auto flex items-center gap-1.5 text-sm font-semibold ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                Get a quote for this
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
            Not sure which one you need?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-black/55">
            Tell us your roof, your bill, or your factory floor — we&apos;ll tell
            you which service actually fits, in writing, before you pay for
            anything.
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

export default ServicesPage;
