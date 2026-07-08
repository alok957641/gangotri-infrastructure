'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, RefreshCw, Inbox, Phone, Mail, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ContactSubmission = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  city: string;
  interest: string | null;
  message: string | null;
  monthly_bill: string | null;
  source_page: string | null;
  status: string | null;
};

const statusColor: Record<string, string> = {
  new: '#F5A623',
  contacted: '#60A5FA',
  converted: '#34D399',
  closed: 'rgba(255,255,255,0.3)',
};

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasLoaded, setHasLoaded] = useState(false);

  async function loadSubmissions(e?: React.FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError('');

    const response = await fetch('/api/admin/contact-submissions', {
      headers: { 'x-admin-password': password },
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      setError(data.error || 'Could not load submissions.');
      setLoading(false);
      return;
    }

    setSubmissions(data.submissions || []);
    setHasLoaded(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0B1220] px-4 pb-16 pt-28 text-white sm:px-6 lg:px-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
      `}</style>

      {/* Blueprint grid backdrop, consistent with the rest of the site */}
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(245,166,35,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,166,35,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <div className="flex items-center gap-2 font-['IBM_Plex_Mono'] text-[11px] tracking-[0.15em] text-[#F5A623]/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F5A623] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F5A623]" />
              </span>
              ADMIN PANEL
            </div>
            <h1 className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold tracking-tight md:text-4xl">
              Contact enquiries
            </h1>
            {hasLoaded && (
              <p className="mt-1.5 font-['IBM_Plex_Mono'] text-xs text-white/40">
                {submissions.length} record{submissions.length !== 1 ? 's' : ''} loaded
              </p>
            )}
          </div>

          <form onSubmit={loadSubmissions} className="flex w-full gap-3 md:w-auto">
            <div className="relative min-w-0 flex-1 md:w-64">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/30" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="w-full rounded-md border border-white/15 bg-white/[0.03] py-3 pl-10 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#F5A623]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="shrink-0 rounded-md bg-[#F5A623] px-5 font-semibold text-[#0B1220] hover:bg-[#f6b046] disabled:opacity-60"
            >
              {loading ? <RefreshCw className="h-4 w-4 animate-spin" /> : 'Load'}
            </Button>
          </form>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5 font-['IBM_Plex_Mono'] text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* ===== Desktop table ===== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-8 hidden overflow-hidden rounded-lg border border-white/10 lg:block"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10 text-sm">
              <thead className="bg-white/[0.03] text-left font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.1em] text-white/40">
                <tr>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Contact</th>
                  <th className="px-4 py-3">City</th>
                  <th className="px-4 py-3">Interest</th>
                  <th className="px-4 py-3">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {submissions.length ? (
                  submissions.map((item, i) => (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.6) }}
                      className="align-top transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.08em]"
                          style={{ color: statusColor[item.status ?? 'new'] ?? statusColor.new }}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: statusColor[item.status ?? 'new'] ?? statusColor.new }}
                          />
                          {item.status || 'new'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-['IBM_Plex_Mono'] text-xs text-white/50">
                        {new Date(item.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 font-['Space_Grotesk'] font-medium text-white">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 text-white/70">
                        <div>{item.phone}</div>
                        {item.email ? <div className="text-white/40">{item.email}</div> : null}
                      </td>
                      <td className="px-4 py-4 text-white/70">{item.city}</td>
                      <td className="px-4 py-4 text-white/70">
                        <div>{item.interest || '-'}</div>
                        {item.monthly_bill ? (
                          <div className="text-white/40">Bill: {item.monthly_bill}</div>
                        ) : null}
                      </td>
                      <td className="max-w-md px-4 py-4 text-white/55">{item.message || '-'}</td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-16">
                      <EmptyState hasLoaded={hasLoaded} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ===== Mobile cards ===== */}
        <div className="mt-8 space-y-4 lg:hidden">
          {submissions.length ? (
            submissions.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.6) }}
                className="rounded-lg border border-white/10 bg-white/[0.02] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-['Space_Grotesk'] text-base font-semibold text-white">
                    {item.name}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-[0.08em]"
                    style={{ color: statusColor[item.status ?? 'new'] ?? statusColor.new }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: statusColor[item.status ?? 'new'] ?? statusColor.new }}
                    />
                    {item.status || 'new'}
                  </span>
                </div>
                <p className="mt-1 font-['IBM_Plex_Mono'] text-[11px] text-white/40">
                  {new Date(item.created_at).toLocaleString()}
                </p>

                <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/70">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-3.5 w-3.5 shrink-0 text-[#F5A623]" /> {item.phone}
                  </div>
                  {item.email && (
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-[#F5A623]" /> {item.email}
                    </div>
                  )}
                  <div className="flex items-center gap-2.5">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-[#F5A623]" /> {item.city}
                  </div>
                  {item.message && (
                    <div className="flex items-start gap-2.5">
                      <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F5A623]" />
                      <span className="text-white/55">{item.message}</span>
                    </div>
                  )}
                </div>

                {item.interest && (
                  <div className="mt-4 inline-block rounded-full border border-white/10 px-3 py-1 font-['IBM_Plex_Mono'] text-[10px] tracking-[0.05em] text-white/50">
                    {item.interest}
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="rounded-lg border border-white/10 bg-white/[0.02] py-14">
              <EmptyState hasLoaded={hasLoaded} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function EmptyState({ hasLoaded }: { hasLoaded: boolean }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <Inbox className="h-6 w-6 text-white/20" strokeWidth={1.5} />
      <p className="font-['IBM_Plex_Mono'] text-xs tracking-wide text-white/35">
        {hasLoaded ? 'No enquiries found.' : 'Enter the admin password and load enquiries.'}
      </p>
    </div>
  );
}