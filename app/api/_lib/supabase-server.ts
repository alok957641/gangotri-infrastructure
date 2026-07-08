import 'server-only';
import { createClient } from '@supabase/supabase-js';

function getServiceRoleKey() {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
    process.env.SUPABASE_SERVICE_KEY ??
    process.env.SUPABASE_SECRET_KEY
  );
}

export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = getServiceRoleKey();

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}

export function getSupabaseContactInsertClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    getServiceRoleKey() ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error('Missing Supabase URL or key environment variables.');
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
