'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Target, Eye, HeartHandshake, ShieldCheck, Award, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const meters = [
  { label: 'FOUNDED', value: '2014' },
  { label: 'HEADQUARTERS', value: 'Nagpur, MH' },
  { label: 'STATES COVERED', value: '14' },
  { label: 'TEAM STRENGTH', value: '210+' },
];

const values = [
  {
    icon: Target,
    title: 'Engineering First',
    description: 'Every system is sized against your actual load and roof, not a catalog default — we design before we sell.',
  },
  {
    icon: Eye,
    title: 'Transparent Numbers',
    description: 'Payback period, subsidy amount, and warranty terms are shared in writing before you commit to anything.',
  },
  {
    icon: HeartHandshake,
    title: 'Long-Term Accountability',
    description: 'We stay on record as your installer for the full 25-year warranty period, not just the sale.',
  },
];

const timeline = [
  { year: '2014', title: 'Founded in Nagpur', desc: 'Started as a 4-person residential installation team covering Vidarbha.' },
  { year: '2017', title: 'Commercial expansion', desc: 'First 100 kW+ commercial rooftop project, moved into net-metering compliance work.' },
  { year: '2019', title: 'ISO 9001 certification', desc: 'Formalized quality management systems across installation and maintenance.' },
  { year: '2021', title: 'Industrial-scale projects', desc: 'Crossed 50 MW installed capacity with first factory-floor deployments.' },
  { year: '2023', title: 'Pan-India network', desc: 'Extended installation and support network to 14 states.' },
  { year: '2025', title: '150 MW milestone', desc: 'Crossed 5,000 installations and 150 MW of installed capacity nationwide.' },
];

const certifications = [
  { icon: ShieldCheck, label: 'ISO 9001:2025', sub: 'Quality Management' },
  { icon: FileCheck, label: 'MNRE Empanelled', sub: 'Approved Vendor' },
  { icon: Award, label: 'DISCOM Certified', sub: 'Net-Metering Partner' },
];

const leadership = [
  { role: 'Managing Director', dept: 'Founder, Operations' },
  { role: 'Chief Engineer', dept: 'Design & Compliance' },
  { role: 'Head of Projects', dept: 'Commercial & Industrial' },
  { role: 'Head of Support', dept: 'Maintenance & Service' },
];

export const AboutPage = () => {
  return (
    <main className="bg-white">
      <AboutHero />
      <StorySection />
      <ValuesSection />
      <TimelineSection />
      <CertificationsSection />
      <LeadershipSection />
      <ClosingCta />
    </main>
  );
};

// ===== 1. HERO — image banner, heading, company name =====
function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const imgY = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section ref={ref} className="relative flex h-[70vh] min-h-[520px] items-end overflow-hidden bg-[#0B1220] pt-[88px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Banner image — drop your real site/team photo at this path */}
      <motion.div
        style={{ y: shouldReduceMotion ? 0 : imgY }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.07)_1px,transparent_1px)] bg-[size:64px_64px]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/projects/team-site-visit.jpg"
          alt="Gangotri Infrastructure team on site"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-700 [&[src]]:opacity-100"
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/60 to-[#0B1220]/30" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80"
        >
          <span className="h-px w-6 bg-[#F5A623]" />
          ABOUT US
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-3xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
        >
          Eleven years of putting solar
          on Indian roofs that actually work.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 font-['Space_Grotesk'] text-lg font-semibold text-[#F5A623] sm:text-xl"
        >
          Gangotri Infrastructure
        </motion.p>
      </div>
    </section>
  );
}

// ===== 2. STORY — narrative + stat meter row =====
function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(11,18,32,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,18,32,0.035)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl">
              Started with four people
              <br />
              and a borrowed ladder.
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#0B1220]/60">
              <p>
                Gangotri Infrastructure began in 2014 in Nagpur, installing
                rooftop panels on homes across Vidarbha before net metering
                was common and before most electricians in the region had
                even seen a solar inverter up close.
              </p>
              <p>
                What started as residential installs grew into commercial
                and industrial work simply because customers kept asking —
                could you do this for our factory, our warehouse, our
                office building? Each project pushed the engineering further:
                monsoon-rated mounting, DISCOM paperwork, load calculations
                for machinery that never really shuts off.
              </p>
              <p>
                Today the same principle from that first rooftop still
                holds — size the system to the actual load, put it in
                writing, and stay on record as the installer for the full
                life of the warranty.
              </p>
            </div>
          </motion.div>

          {/* Stat meter panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="h-fit overflow-hidden rounded-lg border border-[#0B1220]/10"
          >
            <div className="grid grid-cols-2">
              {meters.map((m, i) => (
                <div
                  key={m.label}
                  className={`flex flex-col gap-1.5 px-6 py-6 ${
                    i % 2 === 1 ? 'border-l border-[#0B1220]/10' : ''
                  } ${i >= 2 ? 'border-t border-[#0B1220]/10' : ''}`}
                >
                  <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-[#0B1220]/40">
                    {m.label}
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xl font-medium text-[#0B1220] sm:text-2xl">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ===== 3. VALUES =====
function ValuesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F4] py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <span className="h-px w-6 bg-[#F5A623]" />
            HOW WE WORK
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl">
            Three things we don&apos;t compromise on.
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-[#0B1220]/10 bg-[#0B1220]/10 md:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="bg-white p-8"
            >
              <v.icon className="mb-4 h-6 w-6 text-[#F5A623]" strokeWidth={1.75} />
              <h3 className="mb-2 font-['Space_Grotesk'] text-lg font-semibold text-[#0B1220]">
                {v.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#0B1220]/55">{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== 4. TIMELINE — real chronological sequence, numbering earns its place =====
function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <span className="h-px w-6 bg-[#F5A623]" />
            OUR TIMELINE
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl">
            Eleven years, roof by roof.
          </h2>
        </motion.div>

        <div className="space-y-10 border-l border-[#0B1220]/10 pl-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="relative"
            >
              <span className="absolute -left-[calc(2rem+5px)] top-1 h-2.5 w-2.5 rounded-full bg-[#F5A623]" />
              <span className="font-['IBM_Plex_Mono'] text-sm text-[#B87211]">{item.year}</span>
              <h3 className="mt-1 font-['Space_Grotesk'] text-lg font-semibold text-[#0B1220]">
                {item.title}
              </h3>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#0B1220]/55">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== 5. CERTIFICATIONS =====
function CertificationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0B1220] py-16 md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {certifications.map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-4 rounded-lg border border-white/10 px-6 py-5"
            >
              <c.icon className="h-7 w-7 shrink-0 text-[#F5A623]" strokeWidth={1.5} />
              <div>
                <div className="font-['Space_Grotesk'] text-[15px] font-semibold text-white">{c.label}</div>
                <div className="font-['IBM_Plex_Mono'] text-[11px] tracking-[0.05em] text-white/40">{c.sub}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ===== 6. LEADERSHIP — placeholder cards, swap in real names/photos =====
function LeadershipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <span className="h-px w-6 bg-[#F5A623]" />
            LEADERSHIP
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl">
            The people signing off on your install.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {leadership.map((person, i) => (
            <motion.div
              key={person.role}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 + i * 0.08 }}
              className="overflow-hidden rounded-lg border border-[#0B1220]/10"
            >
              {/* Swap in a real headshot at /images/team/{i}.jpg */}
              <div className="relative aspect-square bg-[#0B1220]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.08)_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
              <div className="px-4 py-3">
                <div className="font-['Space_Grotesk'] text-sm font-semibold text-[#0B1220]">{person.role}</div>
                <div className="mt-0.5 font-['IBM_Plex_Mono'] text-[11px] text-[#0B1220]/45">{person.dept}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== 7. CLOSING CTA =====
function ClosingCta() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#FAF8F4] py-20 md:py-24">
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-[#0B1220] md:text-4xl">
            Want to see the same crew on your roof?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-[#0B1220]/55">
            Get a free site survey and a written quote — no obligation,
            no pushy follow-up calls.
          </p>
          <Button
            size="lg"
            className="mt-8 rounded-md bg-[#0B1220] px-8 py-6 text-[15px] font-semibold text-white hover:bg-[#151f36]"
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

export default AboutPage;