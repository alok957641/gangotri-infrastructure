'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CONTENT — swap details for your real contact information
// ============================================================

const contactMethods = [
  {
    icon: Phone,
    label: 'CALL US',
    value: '+91 98765 43210',
    sub: 'Mon–Sat, 9:00 AM – 7:00 PM',
    href: 'tel:+919876543210',
  },
  {
    icon: Mail,
    label: 'EMAIL US',
    value: 'hello@gangotriinfra.com',
    sub: 'Response within 24 business hours',
    href: 'mailto:hello@gangotriinfra.com',
  },
  {
    icon: MapPin,
    label: 'HEAD OFFICE',
    value: 'Nagpur, Maharashtra',
    sub: 'Site visits across 14 states',
    href: '#map',
  },
  {
    icon: Clock,
    label: 'WORKING HOURS',
    value: 'Mon – Sat',
    sub: '9:00 AM – 7:00 PM IST',
    href: undefined,
  },
];

const offices = [
  { city: 'Nagpur', role: 'Head Office', address: 'MIDC Industrial Area, Hingna Road, Nagpur, MH 440016' },
  { city: 'Pune', role: 'Regional Support Hub', address: 'Baner–Pashan Link Road, Pune, MH 411045' },
  { city: 'Nashik', role: 'Regional Support Hub', address: 'Ambad Industrial Estate, Nashik, MH 422010' },
  { city: 'Amravati', role: 'Regional Support Hub', address: 'Camp Area, Amravati, MH 444601' },
];

const faqs = [
  {
    q: 'Do you install outside Maharashtra?',
    a: 'Yes — we currently cover installations and maintenance across 14 states through our regional support network. Tell us your city in the form and we\'ll confirm coverage and timelines.',
  },
  {
    q: 'How soon can someone visit my site?',
    a: 'Site surveys are typically scheduled within 3–5 working days of your enquiry, depending on your location and current booking load.',
  },
  {
    q: 'Is the site survey actually free?',
    a: 'Yes, with no obligation to proceed. You\'ll get a written system size, cost, and subsidy estimate regardless of whether you go ahead.',
  },
  {
    q: 'I already have solar — can you just handle maintenance?',
    a: 'Yes. We take on maintenance contracts for systems we didn\'t originally install, including inverter checks and warranty claim support.',
  },
  {
    q: 'What if I have a warranty issue with an existing install?',
    a: 'Mention your consumer number and installation year in the message field — our support team will pull up your record and respond directly.',
  },
];

const interestOptions = [
  'Residential Solar',
  'Commercial Solar',
  'Industrial Solar',
  'Solar Maintenance',
  'EV Charging',
  'Not sure yet',
];

// ============================================================
// PAGE
// ============================================================

const ContactPage = () => {
  return (
    <main className="bg-white">
      <ContactHero />
      <ContactMethodsSection />
      <FormAndOfficesSection />
      <FaqSection />
    </main>
  );
};

// ===== HERO =====
function ContactHero() {
  return (
    <section className="relative flex h-[46vh] min-h-[360px] items-end overflow-hidden bg-black pt-[88px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Background image — swap the src below for your real photo (e.g. a rooftop install shot) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/projects/contact-hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover "
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = '0';
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-white/60"
        >
          <span className="h-px w-6 bg-white" />
          CONTACT
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-2xl font-['Space_Grotesk'] text-3xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
        >
          Tell us about your roof.
          We'll take it from there.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          A free site survey, a written quote, no pushy follow-up calls.
        </motion.p>
      </div>
    </section>
  );
}

// ===== QUICK CONTACT METHODS =====
function ContactMethodsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-white py-14 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-black/10 bg-black/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex h-full flex-col gap-3 bg-white p-6 transition-colors hover:bg-black/[0.02]">
                <Icon className="h-5 w-5 text-black/40" strokeWidth={1.75} />
                <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-black/40">
                  {method.label}
                </span>
                <span className="font-['Space_Grotesk'] text-base font-semibold text-black">
                  {method.value}
                </span>
                <span className="text-xs text-black/45">{method.sub}</span>
              </div>
            );
            return method.href ? (
              <a key={method.label} href={method.href}>
                {content}
              </a>
            ) : (
              <div key={method.label}>{content}</div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ===== FORM + OFFICES =====
function FormAndOfficesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    interest: interestOptions[0],
    message: '',
  });

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, sourcePage: '/contact' }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error || 'Could not send your message. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-[#FAFAFA] py-20 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-black/10 bg-white p-6 sm:p-10"
          >
            <h2 className="font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-black md:text-3xl">
              Get a free quote
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-black/55">
              Fill this in and our engineering team will call to confirm
              details before scheduling a site visit.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-black/10 bg-black/[0.02] py-14 text-center"
              >
                <CheckCircle2 className="h-8 w-8 text-black/60" strokeWidth={1.5} />
                <p className="font-['Space_Grotesk'] text-lg font-semibold text-black">
                  Message received.
                </p>
                <p className="max-w-xs text-sm text-black/55">
                  Someone from our team will call you within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="FULL NAME">
                    <input
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Your name"
                      className="w-full rounded-md border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                    />
                  </Field>
                  <Field label="PHONE NUMBER">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91"
                      className="w-full rounded-md border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="EMAIL">
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange('email')}
                      placeholder="you@example.com"
                      className="w-full rounded-md border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                    />
                  </Field>
                  <Field label="CITY">
                    <input
                      required
                      value={form.city}
                      onChange={handleChange('city')}
                      placeholder="Where's the site?"
                      className="w-full rounded-md border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                    />
                  </Field>
                </div>

                <Field label="I'M INTERESTED IN">
                  <select
                    value={form.interest}
                    onChange={handleChange('interest')}
                    className="w-full rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                  >
                    {interestOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="MESSAGE (OPTIONAL)">
                  <textarea
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="Roof size, monthly bill, existing system details — anything that helps us prepare"
                    rows={4}
                    className="w-full resize-none rounded-md border border-black/15 px-4 py-3 text-sm text-black outline-none focus:border-black/40"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full rounded-md bg-black py-6 text-[15px] font-semibold text-white hover:bg-black/85"
                >
                  {submitting ? 'Sending...' : 'Send message'}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
                {submitError ? (
                  <p className="text-center text-xs text-red-600">{submitError}</p>
                ) : null}
                <p className="text-center text-xs text-black/40">
                  We only use these details to get back to you. No spam.
                </p>
              </form>
            )}
          </motion.div>

          {/* Offices */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-black/45">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
              OUR OFFICES
            </div>
            <h3 className="mt-4 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-black">
              Nagpur HQ, regional hubs across the state.
            </h3>

            <div className="mt-8 space-y-5">
              {offices.map((office) => (
                <div key={office.city} className="border-b border-black/10 pb-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-['Space_Grotesk'] text-base font-semibold text-black">
                      {office.city}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.08em] text-black/40">
                      {office.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-black/55">{office.address}</p>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div
              id="map"
              className="relative mt-8 aspect-[4/3] scroll-mt-24 overflow-hidden rounded-lg border border-black/10 bg-black"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:24px_24px]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-white/50">
                <MapPin className="h-6 w-6" strokeWidth={1.5} />
                <span className="font-['IBM_Plex_Mono'] text-xs tracking-wide">
                  EMBED YOUR GOOGLE MAP HERE
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-black/45">
        {label}
      </span>
      {children}
    </label>
  );
}

// ===== FAQ =====
function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-white py-20 md:py-28">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-black/45">
            <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
            BEFORE YOU REACH OUT
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-black md:text-4xl">
            Quick answers, in case they help.
          </h2>
        </motion.div>

        <div className="divide-y divide-black/10 border-t border-black/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-['Space_Grotesk'] text-base font-semibold text-black">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-black/40 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 text-sm leading-relaxed text-black/55">{item.a}</p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
