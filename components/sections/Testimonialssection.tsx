'use client';

import { useReducedMotion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

// ============================================================
// CONTENT — swap for your real customer reviews
// ============================================================
const testimonials = [
  {
    name: 'Rajesh Deshmukh',
    location: 'Nagpur, MH',
    system: '4 kW Residential',
    rating: 5,
    quote:
      'Bill went from ₹4,200 to ₹380 a month. The crew handled the net-metering paperwork with MSEDCL themselves — I didn\'t stand in a single queue.',
  },
  {
    name: 'Priya Kulkarni',
    location: 'Pune, MH',
    system: '6 kW Residential',
    rating: 5,
    quote:
      'First monsoon after install, zero leaks, zero loose panels. Their mounting held up better than the waterproofing on my actual roof.',
  },
  {
    name: 'Suresh Industries',
    location: 'Nashik, MH',
    system: '85 kW Commercial',
    rating: 5,
    quote:
      'We compared five vendors. Gangotri was the only one who sized the system around our actual HVAC load instead of just our roof area.',
  },
  {
    name: 'Anita Bhosale',
    location: 'Amravati, MH',
    system: '3 kW Residential',
    rating: 4,
    quote:
      'Subsidy landed in my account in about three weeks, exactly like they said. Follow-up call from their team, not the other way around.',
  },
  {
    name: 'Vikram Chauhan',
    location: 'Nagpur, MH',
    system: '5 kW Residential',
    rating: 5,
    quote:
      'Had a warranty issue with an inverter fan eighteen months in. Replaced within four days, no argument, no extra charge.',
  },
  {
    name: 'Meera Textiles Pvt. Ltd.',
    location: 'Amravati, MH',
    system: '210 kW Industrial',
    rating: 5,
    quote:
      'Ground-mount layout they proposed saved us roof access for HVAC servicing. Small detail, but it\'s the one none of the other quotes caught.',
  },
  {
    name: 'Sanjay Patil',
    location: 'Pune, MH',
    system: '4 kW Residential',
    rating: 5,
    quote:
      'Site survey was genuinely free and genuinely no-pressure. Took me four months to decide. They still honoured the original quote.',
  },
  {
    name: 'Kavita Joshi',
    location: 'Nashik, MH',
    system: '3.5 kW Residential',
    rating: 4,
    quote:
      'Cleaning reminder texts based on actual dust conditions near my pincode, not some generic 90-day calendar. Small thing that shows they know the field.',
  },
];

const row1 = [...testimonials.slice(0, 4), ...testimonials.slice(0, 4)];
const row2 = [...testimonials.slice(4, 8), ...testimonials.slice(4, 8)];

// ============================================================
// SECTION
// ============================================================
export const TestimonialsSection = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-black/10 bg-[#0B1220] py-20 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        @keyframes marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        .marquee-track {
          animation: marquee-left 46s linear infinite;
        }
        .marquee-track-reverse {
          animation: marquee-right 46s linear infinite;
        }
        .marquee-row:hover .marquee-track,
        .marquee-row:hover .marquee-track-reverse {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track, .marquee-track-reverse {
            animation: none;
          }
        }
      `}</style>

      {/* faint blueprint grid, consistent with hero */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 max-w-2xl">
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5A623] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5A623]" />
            </span>
            FIELD REPORTS — LIVE FROM 5,000+ ROOFTOPS
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-white md:text-4xl">
            What the meter says after we leave.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/55">
            Unedited feedback from residential, commercial, and industrial
            installs across Maharashtra — the same crews, month after month.
          </p>
        </div>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="marquee-row relative mt-2 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className={`marquee-track flex w-max gap-5 px-4 sm:px-6 ${shouldReduceMotion ? '!animate-none' : ''}`}>
          {row1.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right, offset for rhythm */}
      <div className="marquee-row relative mt-5 w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className={`marquee-track-reverse flex w-max gap-5 px-4 sm:px-6 ${shouldReduceMotion ? '!animate-none' : ''}`}>
          {row2.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  const initials = t.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="flex w-[340px] shrink-0 flex-col gap-4 rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:w-[380px]">
      <div className="flex items-start justify-between">
        <Quote className="h-5 w-5 text-[#F5A623]/60" strokeWidth={1.75} />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${i < t.rating ? 'fill-[#F5A623] text-[#F5A623]' : 'text-white/15'}`}
            />
          ))}
        </div>
      </div>

      <p className="text-[15px] leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>

      <div className="mt-1 flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F5A623]/40 bg-[#F5A623]/10 font-['IBM_Plex_Mono'] text-[11px] font-semibold text-[#F5A623]">
          {initials}
        </div>
        <div className="flex flex-col">
          <span className="font-['Space_Grotesk'] text-sm font-semibold text-white">{t.name}</span>
          <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.06em] text-white/40">
            {t.location} · {t.system}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;