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
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// ============================================================
// CONTENT — swap details for your real contact information
// ============================================================

const contactMethods = [
  {
    icon: Phone,
    label: 'WHATSAPP / PHONE',
    value: '+91 91510 78495',
    sub: 'Monday - Sunday, 10:00 AM - 8:00 PM',
    href: 'https://wa.me/919151078495',
    external: true,
  },
  {
    icon: Mail,
    label: 'EMAIL US',
    value: 'gangotriinfrastructure1989@gmail.com',
    sub: 'Response within 24 hours',
    href: 'mailto:gangotriinfrastructure1989@gmail.com',
    external: false,
  },
  {
    icon: MapPin,
    label: 'OUR OFFICE',
    value: 'Shahjahanpur, Uttar Pradesh',
    sub: 'Main location with Lucknow support',
    href: '#map',
    external: false,
  },
  {
    icon: Clock,
    label: 'WORKING HOURS',
    value: 'Monday - Sunday',
    sub: '10:00 AM - 8:00 PM IST',
    href: undefined,
    external: false,
  },
];

const offices = [
  { city: 'Shahjahanpur', role: 'Main Office', address: 'Shyam Vatika Colony, Lodhipur, Shahjahanpur, Uttar Pradesh' },
  { city: 'Lucknow', role: 'Primary City Support', address: 'Lucknow, Uttar Pradesh' },
  { city: 'Moradabad', role: 'Service Area', address: 'Moradabad, Uttar Pradesh' },
  { city: 'Bareilly', role: 'Service Area', address: 'Bareilly, Uttar Pradesh' },
];

const faqs = [
  {
    q: 'Do you install outside Shahjahanpur?',
    a: 'Yes. We serve Shahjahanpur, Moradabad, Lucknow, Bareilly and nearby Uttar Pradesh cities. Tell us your city in the form and we will confirm coverage and timelines.',
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
    <section className="relative flex h-[46vh] min-h-[380px] items-end overflow-hidden bg-[#0B1220] pt-[80px] sm:pt-[88px]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Background image — swap the src below for your real photo (e.g. a rooftop install shot) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/projects/contact-hero-bg.jpg"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.opacity = '0';
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B1220] via-[#0B1220]/75 to-[#0B1220]/40" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_85%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80"
        >
          <span className="h-px w-6 bg-[#F5A623]" />
          CONTACT
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="mt-4 max-w-2xl font-['Space_Grotesk'] text-[1.9rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-4xl md:text-5xl"
        >
          Tell us about your roof.
          We&apos;ll take it from there.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 sm:mt-5 sm:text-base md:text-lg"
        >
          Solar support for Shahjahanpur, Lucknow, Moradabad and nearby Uttar Pradesh cities.
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
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#0B1220]/10 bg-[#0B1220]/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {contactMethods.map((method) => {
            const Icon = method.icon;
            const content = (
              <div className="flex h-full min-w-0 flex-col gap-3 bg-white p-6 transition-colors hover:bg-[#FAF8F4]">
                <Icon className="h-5 w-5 shrink-0 text-[#F5A623]" strokeWidth={1.75} />
                <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-[#0B1220]/40">
                  {method.label}
                </span>
                <span className="break-words font-['Space_Grotesk'] text-sm font-semibold leading-snug text-[#0B1220] sm:text-base">
                  {method.value}
                </span>
                <span className="text-xs text-[#0B1220]/45">{method.sub}</span>
              </div>
            );
            return method.href ? (
              <a
                key={method.label}
                href={method.href}
                {...(method.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
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

    try {
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
    } catch {
      setSubmitError('Network error — please check your connection and try again.');
      setSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-[#FAFAFA] py-16 md:py-28">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="rounded-lg border border-[#0B1220]/10 bg-white p-5 sm:p-8 md:p-10"
          >
            <h2 className="font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-[#0B1220] sm:text-2xl md:text-3xl">
              Get a free quote
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[#0B1220]/55">
              Fill this in and our engineering team will call to confirm
              details before scheduling a site visit.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 flex flex-col items-center gap-3 rounded-lg border border-[#0B1220]/10 bg-[#0B1220]/[0.02] py-14 text-center"
              >
                <CheckCircle2 className="h-8 w-8 text-[#F5A623]" strokeWidth={1.5} />
                <p className="font-['Space_Grotesk'] text-lg font-semibold text-[#0B1220]">
                  Message received.
                </p>
                <p className="max-w-xs text-sm text-[#0B1220]/55">
                  Someone from our team will call you within one business day.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-7 space-y-5 sm:mt-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="FULL NAME">
                    <input
                      required
                      value={form.name}
                      onChange={handleChange('name')}
                      placeholder="Your name"
                      className="w-full rounded-md border border-[#0B1220]/15 px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
                    />
                  </Field>
                  <Field label="PHONE NUMBER">
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      placeholder="+91"
                      className="w-full rounded-md border border-[#0B1220]/15 px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
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
                      className="w-full rounded-md border border-[#0B1220]/15 px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
                    />
                  </Field>
                  <Field label="CITY">
                    <input
                      required
                      value={form.city}
                      onChange={handleChange('city')}
                      placeholder="Where's the site?"
                      className="w-full rounded-md border border-[#0B1220]/15 px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
                    />
                  </Field>
                </div>

                <Field label="I'M INTERESTED IN">
                  <select
                    value={form.interest}
                    onChange={handleChange('interest')}
                    className="w-full rounded-md border border-[#0B1220]/15 bg-white px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
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
                    className="w-full resize-none rounded-md border border-[#0B1220]/15 px-4 py-3 text-sm text-[#0B1220] outline-none transition-colors focus:border-[#F5A623]"
                  />
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full rounded-md bg-[#F5A623] py-6 text-[15px] font-semibold text-[#0B1220] hover:bg-[#f6b046] disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      Sending...
                      <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {submitError ? (
                  <p className="text-center text-xs text-red-600">{submitError}</p>
                ) : null}
                <p className="text-center text-xs text-[#0B1220]/40">
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
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
              <Building2 className="h-4 w-4" strokeWidth={1.75} />
              OUR OFFICES
            </div>
            <h3 className="mt-4 font-['Space_Grotesk'] text-xl font-semibold tracking-tight text-[#0B1220] sm:text-2xl">
              Shahjahanpur office, Lucknow support, and nearby UP service areas.
            </h3>

            <div className="mt-7 space-y-5 sm:mt-8">
              {offices.map((office) => (
                <div key={office.city} className="border-b border-[#0B1220]/10 pb-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="font-['Space_Grotesk'] text-base font-semibold text-[#0B1220]">
                      {office.city}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.08em] text-[#0B1220]/40">
                      {office.role.toUpperCase()}
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#0B1220]/55">{office.address}</p>
                </div>
              ))}
            </div>

            <div
              id="map"
              className="relative mt-8 aspect-[4/3] scroll-mt-[88px] overflow-hidden rounded-lg border border-[#0B1220]/10 bg-[#0B1220]"
            >
              <iframe
                title="Gangotri Infrastructure office map"
                src="https://www.google.com/maps?q=Shyam%20Vatika%20Colony%2C%20Lodhipur%2C%20Shahjahanpur%2C%20Uttar%20Pradesh&output=embed"
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-6 rounded-lg border border-[#0B1220]/10 bg-white p-5">
              <div className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-[#0B1220]/45">
                SERVICE AREAS
              </div>
              <p className="mt-2 break-words text-sm font-medium text-[#0B1220]">
                Shahjahanpur · Moradabad · Lucknow
              </p>
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
      <span className="mb-1.5 block font-['IBM_Plex_Mono'] text-[10px] tracking-[0.1em] text-[#0B1220]/45">
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
    <section ref={ref} className="relative overflow-hidden border-t border-black/10 bg-white py-16 md:py-28">
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10"
        >
          <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#B87211]">
            <HelpCircle className="h-4 w-4" strokeWidth={1.75} />
            BEFORE YOU REACH OUT
          </div>
          <h2 className="mt-4 font-['Space_Grotesk'] text-2xl font-semibold tracking-tight text-[#0B1220] sm:text-3xl md:text-4xl">
            Quick answers, in case they help.
          </h2>
        </motion.div>

        <div className="divide-y divide-[#0B1220]/10 border-t border-[#0B1220]/10">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="font-['Space_Grotesk'] text-[15px] font-semibold text-[#0B1220] sm:text-base">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-[#F5A623] transition-transform duration-300 ${
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
                  <p className="pb-5 text-sm leading-relaxed text-[#0B1220]/55">{item.a}</p>
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