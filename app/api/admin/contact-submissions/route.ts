import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/app/api/_lib/supabase-server';

export const runtime = 'nodejs';

function isAuthorized(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  const provided = req.headers.get('x-admin-password');

  return Boolean(adminPassword && provided && provided === adminPassword);
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .select(
        'id, created_at, name, phone, email, city, interest, message, monthly_bill, source_page, status'
      )
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) {
      console.error('Admin submissions fetch error:', error);
      return NextResponse.json({ error: 'Could not load submissions.' }, { status: 500 });
    }

    return NextResponse.json({ submissions: data ?? [] });
  } catch (error) {
    console.error('Admin submissions route error:', error);
    return NextResponse.json({ error: 'Admin API is not configured.' }, { status: 500 });
  }
}
