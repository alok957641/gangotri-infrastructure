'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { n: '01', title: 'Share your details', desc: 'Rooftop size, location, and current electricity bill.' },
  { n: '02', title: 'Free site survey', desc: 'Our engineer visits and measures your actual load.' },
  { n: '03', title: 'Design & subsidy filing', desc: 'We size the system and file the paperwork with DISCOM.' },
  { n: '04', title: 'Install & switch on', desc: 'Installed, inspected, and net-metered — usually in 10–15 days.' },
];

export const QuoteFormSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        phone: formData.get('phone'),
        city: formData.get('city'),
        propertyType: formData.get('propertyType'),
        bill: formData.get('bill'),
        message: formData.get('message'),
        sourcePage: '/',
      }),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setSubmitError(data.error || 'Could not send your request. Please try again.');
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section id="quote" ref={sectionRef} className="relative overflow-hidden bg-[#0B1220] py-20 md:py-28">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(245,166,35,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.06)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
          {/* ===== LEFT: pitch + process steps ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2.5 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80">
              <span className="h-px w-6 bg-[#F5A623]" />
              GET A QUOTE
            </div>
            <h2 className="mt-4 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Tell us about your roof.
              <br />
              We&apos;ll do the rest.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">
              No pushy sales calls — an engineer reviews your details and
              gets back to you with real numbers, not a quote inflated for
              negotiation.
            </p>

            {/* Process steps — genuine sequence, so numbering earns its place */}
            <div className="mt-10 space-y-6 border-l border-white/10 pl-6">
              {steps.map((step) => (
                <div key={step.n} className="relative">
                  <span className="absolute -left-[31px] top-0 flex h-6 w-6 items-center justify-center rounded-full border border-[#F5A623]/40 bg-[#0B1220] font-['IBM_Plex_Mono'] text-[10px] text-[#F5A623]">
                    {step.n}
                  </span>
                  <h3 className="font-['Space_Grotesk'] text-[15px] font-semibold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/45">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 font-['IBM_Plex_Mono'] text-sm text-white/60">
              <a href="tel:+911234567890" className="flex items-center gap-2.5 hover:text-white">
                <Phone className="h-4 w-4 text-[#F5A623]" /> +91 12345 67890
              </a>
              <a href="mailto:hello@gangotriinfra.in" className="flex items-center gap-2.5 hover:text-white">
                <Mail className="h-4 w-4 text-[#F5A623]" /> hello@gangotriinfra.in
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-[#F5A623]" /> Pan-India installation network
              </span>
            </div>
          </motion.div>

          {/* ===== RIGHT: form panel ===== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative rounded-lg border border-white/10 bg-white/[0.03] p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#F5A623]/40 bg-[#F5A623]/10">
                  <Check className="h-6 w-6 text-[#F5A623]" />
                </div>
                <h3 className="mt-5 font-['Space_Grotesk'] text-xl font-semibold text-white">
                  Request received
                </h3>
                <p className="mt-2 max-w-xs text-sm text-white/50">
                  An engineer will call you within one business day to
                  schedule your free site survey.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="FULL NAME" name="name" type="text" placeholder="Rohan Sharma" required />
                  <Field label="PHONE NUMBER" name="phone" type="tel" placeholder="98765 43210" required />
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="CITY / PINCODE" name="city" type="text" placeholder="Pune, 411001" required />
                  <div>
                    <label className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-white/40">
                      PROPERTY TYPE
                    </label>
                    <select
                      name="propertyType"
                      required
                      defaultValue=""
                      className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-[15px] text-white outline-none transition-colors focus:border-[#F5A623] [&>option]:bg-[#0B1220]"
                    >
                      <option value="" disabled>Select one</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                </div>
                <Field
                  label="MONTHLY ELECTRICITY BILL (₹)"
                  name="bill"
                  type="text"
                  placeholder="e.g. 4,500"
                />
                <div>
                  <label className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-white/40">
                    ANYTHING ELSE WE SHOULD KNOW?
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Roof shading, shed dimensions, timeline..."
                    className="mt-2 w-full resize-none border-b border-white/15 bg-transparent py-2 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#F5A623]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  className="w-full rounded-md bg-[#F5A623] py-6 text-[15px] font-semibold text-[#0B1220] hover:bg-[#f6b046]"
                >
                  {submitting ? 'Sending request...' : 'Request my free site survey'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {submitError ? (
                  <p className="text-center text-[12px] text-red-300">{submitError}</p>
                ) : null}
                <p className="text-center font-['IBM_Plex_Mono'] text-[11px] text-white/30">
                  No spam. No third-party calls. Just an engineer, once.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-['IBM_Plex_Mono'] text-[10px] tracking-[0.12em] text-white/40">
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-white/15 bg-transparent py-2 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#F5A623]"
      />
    </div>
  );
}
