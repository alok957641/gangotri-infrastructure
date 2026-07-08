'use client';

import { useMemo, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import {
  Sun,
  Calculator,
  Landmark,
  IndianRupee,
  Gauge,
  Clock,
  TrendingUp,
  CheckCircle2,
  FileText,
  ClipboardList,
  BadgeCheck,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CALCULATOR ASSUMPTIONS — indicative only, tune to your data
// ============================================================
const UNITS_PER_KW_PER_MONTH = 120;
const ASSUMED_TARIFF_PER_UNIT = 7.5;
const COST_PER_KW = 55000;

function calculateSubsidy(sizeKw: number) {
  if (sizeKw <= 2) return sizeKw * 30000;
  if (sizeKw <= 3) return 60000 + (sizeKw - 2) * 18000;
  return 78000; // capped for >3 kW, residential
}

// ============================================================
// GOVERNMENT SUBSIDY CONTENT — PM Surya Ghar Muft Bijli Yojana
// ============================================================
const subsidySlabs = [
  { size: 'Up to 1 kW', amount: '₹30,000', note: 'Flat rate per kW' },
  { size: 'Above 1 kW – 2 kW', amount: '₹30,000/kW', note: 'e.g. 2 kW = ₹60,000' },
  { size: 'Above 2 kW – 3 kW', amount: '₹18,000/kW extra', note: 'e.g. 3 kW = ₹78,000' },
  { size: 'Above 3 kW', amount: '₹78,000 (capped)', note: 'No additional subsidy beyond this' },
];

const eligibility = [
  'Applicant must be the registered owner of the residential property',
  'Property must have a valid, active electricity connection in the applicant\'s name',
  'Roof must be structurally suitable for rooftop panel mounting',
  'Household should not have availed rooftop solar subsidy previously on the same connection',
  'A bank account linked with Aadhaar is required for direct subsidy transfer (DBT)',
];

const applicationSteps = [
  {
    title: 'Register on the national portal',
    desc: 'Sign up on the PM Surya Ghar Muft Bijli Yojana portal with your state, DISCOM, and electricity consumer number.',
  },
  {
    title: 'Apply for rooftop solar',
    desc: 'Submit the application with your consumer details; the portal routes it to your local DISCOM for feasibility review.',
  },
  {
    title: 'Feasibility approval',
    desc: 'Once your DISCOM approves feasibility, you can proceed to install through any MNRE-empanelled vendor of your choice.',
  },
  {
    title: 'Installation',
    desc: 'The empanelled installer sizes, mounts, and commissions the system, then submits plant details back through the portal.',
  },
  {
    title: 'Net meter application and inspection',
    desc: 'Apply for a net meter through the portal. After installation, the DISCOM inspects the site and installs the net meter.',
  },
  {
    title: 'Commissioning certificate',
    desc: 'Once the net meter is installed and inspection clears, the portal generates a commissioning certificate.',
  },
  {
    title: 'Subsidy disbursal',
    desc: 'Submit bank account details after commissioning. The subsidy is credited directly to the applicant\'s account, typically within about 30 days.',
  },
];

const documents = [
  'Latest electricity bill (for consumer number and DISCOM verification)',
  'Aadhaar card of the applicant',
  'Bank passbook or cancelled cheque (Aadhaar-linked account)',
  'Property ownership proof or no-objection from the property owner',
  'Passport-size photograph of the applicant',
];

// ============================================================
// PAGE
// ============================================================

export const ResourcesPage = () => {
  return (
    <main className="bg-white">
      <ResourcesHero />
      <SolarCalculatorSection />
      <GovernmentSubsidySection />
      <ClosingCta />
    </main>
  );
};

// ===== HERO — animated sun =====
function ResourcesHero() {
  const shouldReduceMotion = useReducedMotion();
  const rayCount = 16;

  return (
    <section className="relative flex h-[78vh] min-h-[560px] flex-col items-center justify-center overflow-hidden bg-black pt-[88px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/projects/resources-hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover "
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = '0';
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="relative flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]">
        {[0, 1, 2].map((ring) => (
          <motion.span
            key={ring}
            className="absolute rounded-full border border-white/10"
            style={{
              width: `${100 + ring * 60}px`,
              height: `${100 + ring * 60}px`,
            }}
            animate={
              shouldReduceMotion
                ? {}
                : { scale: [1, 1.25, 1], opacity: [0.35, 0.05, 0.35] }
            }
            transition={{
              duration: 5 + ring,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ring * 0.6,
            }}
          />
        ))}

        <motion.svg
          viewBox="0 0 300 300"
          className="absolute h-full w-full"
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: rayCount }).map((_, i) => {
            const angle = (360 / rayCount) * i;
            const long = i % 2 === 0;
            return (
              <line
                key={i}
                x1="150"
                y1="150"
                x2="150"
                y2={long ? '18' : '40'}
                stroke="white"
                strokeOpacity={long ? 0.35 : 0.18}
                strokeWidth={long ? 1.4 : 1}
                strokeLinecap="round"
                transform={`rotate(${angle} 150 150)`}
              />
            );
          })}
        </motion.svg>

        <motion.div
          className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-white sm:h-[124px] sm:w-[124px]"
          animate={shouldReduceMotion ? {} : { boxShadow: [
            '0 0 40px 6px rgba(255,255,255,0.25)',
            '0 0 70px 14px rgba(255,255,255,0.4)',
            '0 0 40px 6px rgba(255,255,255,0.25)',
          ] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Sun className="h-10 w-10 text-black sm:h-12 sm:w-12" strokeWidth={1.5} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="relative z-10 mt-10 flex flex-col items-center px-4 text-center"
      >
        <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/60">
          <span className="h-px w-6 bg-white" />
          RESOURCES
          <span className="h-px w-6 bg-white" />
        </div>
        <h1 className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl">
          Work out the numbers
          before you commit to a roof.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
          A calculator for what your system could cost and save, and a full
          breakdown of the government subsidy that applies to it.
        </p>
      </motion.div>
    </section>
  );
}

// ===== SOLAR CALCULATOR =====
function SolarCalculatorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [mode, setMode] = useState<'bill' | 'units'>('bill');
  const [billValue, setBillValue] = useState(3500);
  const [unitsValue, setUnitsValue] = useState(450);

  const results = useMemo(() => {
    const monthlyUnits =
      mode === 'bill' ? billValue / ASSUMED_TARIFF_PER_UNIT : unitsValue;
    const monthlyBill =
      mode === 'bill' ? billValue : unitsValue * ASSUMED_TARIFF_PER_UNIT;

    const rawSizeKw = monthlyUnits / UNITS_PER_KW_PER_MONTH;
    const sizeKw = Math.max(1, Math.round(rawSizeKw * 2) / 2);

    const totalCost = sizeKw * COST_PER_KW;
    const subsidy = calculateSubsidy(sizeKw);
    const netCost = Math.max(totalCost - subsidy, 0);
    const monthlySavings = monthlyBill;
    const paybackYears = monthlySavings > 0 ? netCost / (monthlySavings * 12) : 0;
    const twentyFiveYearSavings = monthlySavings * 12 * 25 - netCost;

    return {
      sizeKw,
      totalCost,
      subsidy,
      netCost,
      monthlySavings,
      paybackYears,
      twentyFiveYearSavings,
    };
  }, [mode, billValue, unitsValue]);

  const fmt = (n: number) =>
    Math.round(n).toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <section
      id="calculator"
      ref={ref}
      className="relative scroll-mt-[80px] overflow-hidden border-t border-black/10 bg-white py-20 sm:scroll-mt-[88px] md:py-28"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-black/45">
            <Calculator className="h-4 w-4" strokeWidth={1.75} />
            SOLAR CALCULATOR
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-black md:text-4xl">
            What would your system actually cost?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-black/55">
            Enter your monthly electricity bill or units consumed. The
            numbers below are indicative, based on average generation and
            benchmark costs — a site survey gives you the exact figure.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="h-fit rounded-lg border border-black/10 p-6 sm:p-8"
          >
            <div className="flex rounded-md border border-black/10 p-1">
              <button
                onClick={() => setMode('bill')}
                className={`flex-1 rounded-[5px] py-2 text-sm font-semibold transition-colors ${
                  mode === 'bill' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
                }`}
              >
                Monthly bill
              </button>
              <button
                onClick={() => setMode('units')}
                className={`flex-1 rounded-[5px] py-2 text-sm font-semibold transition-colors ${
                  mode === 'units' ? 'bg-black text-white' : 'text-black/50 hover:text-black'
                }`}
              >
                Monthly units
              </button>
            </div>

            <div className="mt-6">
              {mode === 'bill' ? (
                <>
                  <label className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-black/45">
                    MONTHLY ELECTRICITY BILL (₹)
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-black/15 px-4 py-3">
                    <IndianRupee className="h-4 w-4 shrink-0 text-black/40" />
                    <input
                      type="number"
                      min={200}
                      step={100}
                      value={billValue}
                      onChange={(e) => setBillValue(Number(e.target.value) || 0)}
                      className="w-full bg-transparent font-['Space_Grotesk'] text-lg font-semibold text-black outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min={500}
                    max={25000}
                    step={100}
                    value={billValue}
                    onChange={(e) => setBillValue(Number(e.target.value))}
                    className="mt-4 w-full accent-black"
                  />
                </>
              ) : (
                <>
                  <label className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-black/45">
                    MONTHLY UNITS CONSUMED (kWh)
                  </label>
                  <div className="mt-2 flex items-center gap-2 rounded-md border border-black/15 px-4 py-3">
                    <Gauge className="h-4 w-4 shrink-0 text-black/40" />
                    <input
                      type="number"
                      min={30}
                      step={10}
                      value={unitsValue}
                      onChange={(e) => setUnitsValue(Number(e.target.value) || 0)}
                      className="w-full bg-transparent font-['Space_Grotesk'] text-lg font-semibold text-black outline-none"
                    />
                  </div>
                  <input
                    type="range"
                    min={60}
                    max={3000}
                    step={10}
                    value={unitsValue}
                    onChange={(e) => setUnitsValue(Number(e.target.value))}
                    className="mt-4 w-full accent-black"
                  />
                </>
              )}
            </div>

            <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-black/40">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              Assumes ~{UNITS_PER_KW_PER_MONTH} units/kW/month generation and a
              blended tariff of ₹{ASSUMED_TARIFF_PER_UNIT}/unit. Your actual
              DISCOM slab rate and roof orientation will change the real
              numbers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 sm:grid-cols-3"
          >
            <ResultCell label="RECOMMENDED SIZE" value={`${results.sizeKw} kW`} icon={Gauge} />
            <ResultCell label="SYSTEM COST" value={`₹${fmt(results.totalCost)}`} icon={IndianRupee} />
            <ResultCell label="SUBSIDY (EST.)" value={`₹${fmt(results.subsidy)}`} icon={Landmark} />
            <ResultCell label="NET COST" value={`₹${fmt(results.netCost)}`} icon={IndianRupee} highlight />
            <ResultCell label="MONTHLY SAVINGS" value={`₹${fmt(results.monthlySavings)}`} icon={TrendingUp} />
            <ResultCell
              label="PAYBACK PERIOD"
              value={`${results.paybackYears > 0 ? results.paybackYears.toFixed(1) : '—'} yrs`}
              icon={Clock}
            />
            <div className="col-span-2 flex flex-col justify-center gap-1 bg-black px-6 py-6 sm:col-span-3">
              <span className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.1em] text-white/45">
                ESTIMATED 25-YEAR SAVINGS
              </span>
              <span className="font-['Space_Grotesk'] text-3xl font-semibold text-white">
                ₹{fmt(Math.max(results.twentyFiveYearSavings, 0))}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ResultCell({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-2 px-5 py-6 ${highlight ? 'bg-black/[0.03]' : 'bg-white'}`}>
      <Icon className="h-4 w-4 text-black/35" strokeWidth={1.75} />
      <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-black/40">
        {label}
      </span>
      <span className="font-['Space_Grotesk'] text-xl font-semibold text-black sm:text-2xl">
        {value}
      </span>
    </div>
  );
}

// ===== GOVERNMENT SUBSIDY =====
function GovernmentSubsidySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section
      id="government-subsidy"
      ref={ref}
      className="relative scroll-mt-[80px] overflow-hidden border-t border-black/10 bg-black py-20 sm:scroll-mt-[88px] md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/50">
            <Landmark className="h-4 w-4" strokeWidth={1.75} />
            GOVERNMENT SUBSIDY
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-white md:text-4xl">
            PM Surya Ghar Muft Bijli Yojana, explained fully.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/55">
            The central government's rooftop solar subsidy scheme, aimed at
            covering 1 crore households with free electricity from rooftop
            solar. Here's what it actually pays, who qualifies, and the
            exact steps to claim it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="overflow-hidden rounded-lg border border-white/10"
        >
          <div className="grid grid-cols-3 border-b border-white/10 bg-white/[0.03] px-6 py-3 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-white/40">
            <span>SYSTEM SIZE</span>
            <span>CENTRAL SUBSIDY (CFA)</span>
            <span className="hidden sm:block">NOTE</span>
          </div>
          {subsidySlabs.map((row, i) => (
            <div
              key={row.size}
              className={`grid grid-cols-3 px-6 py-4 text-sm text-white/80 ${
                i !== subsidySlabs.length - 1 ? 'border-b border-white/10' : ''
              }`}
            >
              <span className="font-medium">{row.size}</span>
              <span className="font-['IBM_Plex_Mono']">{row.amount}</span>
              <span className="hidden text-white/45 sm:block">{row.note}</span>
            </div>
          ))}
        </motion.div>
        <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-white/35">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Figures reflect the Central Financial Assistance (CFA) structure
          for residential rooftop solar under PM Surya Ghar Muft Bijli
          Yojana. Some states add a top-up subsidy on top of the central
          amount. Confirm current rates on the official portal or with your
          DISCOM before budgeting, as government schemes are revised from
          time to time.
        </p>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/50">
              <BadgeCheck className="h-4 w-4" strokeWidth={1.75} />
              WHO QUALIFIES
            </div>
            <ul className="mt-5 space-y-3">
              {eligibility.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-white/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/50">
              <FileText className="h-4 w-4" strokeWidth={1.75} />
              DOCUMENTS YOU'LL NEED
            </div>
            <ul className="mt-5 space-y-3">
              {documents.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-white/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-16"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/50">
            <ClipboardList className="h-4 w-4" strokeWidth={1.75} />
            HOW TO APPLY, STEP BY STEP
          </div>

          <div className="mt-8 space-y-8 border-l border-white/15 pl-8">
            {applicationSteps.map((step, i) => (
              <div key={step.title} className="relative">
                <span className="absolute -left-[calc(2rem+13px)] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-black font-['IBM_Plex_Mono'] text-[11px] text-white/60">
                  {i + 1}
                </span>
                <h3 className="font-['Space_Grotesk'] text-base font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-white/55">{step.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-6"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-white/40" />
          <p className="text-sm leading-relaxed text-white/55">
            We handle the full application — portal registration, DISCOM
            coordination, net-metering, and subsidy follow-up — as part of
            every residential install. You don't need to navigate the
            portal alone.
          </p>
        </motion.div>
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
            Want the exact numbers for your roof?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-black/55">
            The calculator above is a starting point. A free site survey
            gives you the real system size, cost, and subsidy amount in
            writing.
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

export default ResourcesPage;