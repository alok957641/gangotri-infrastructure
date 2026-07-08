import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseContactInsertClient } from '@/app/api/_lib/supabase-server';

export const runtime = 'nodejs';

const recentSubmissions = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 30_000;
const NOTIFICATION_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'rajalok957641@gmail.com';

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  city?: unknown;
  interest?: unknown;
  message?: unknown;
  propertyType?: unknown;
  bill?: unknown;
  sourcePage?: unknown;
};

type CleanContactPayload = {
  name: string;
  phone: string;
  email: string;
  city: string;
  interest: string;
  message: string;
  bill: string;
  sourcePage: string;
};

function asCleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function validatePayload(body: ContactPayload):
  | { payload: CleanContactPayload }
  | { error: string } {
  const payload = {
    name: asCleanString(body.name),
    phone: asCleanString(body.phone),
    email: asCleanString(body.email),
    city: asCleanString(body.city),
    interest: asCleanString(body.interest || body.propertyType || 'Not sure yet'),
    message: asCleanString(body.message),
    bill: asCleanString(body.bill),
    sourcePage: asCleanString(body.sourcePage || '/contact'),
  };

  if (payload.name.length < 2) {
    return { error: 'Please enter a valid name.' };
  }

  if (!/^[0-9+\-\s()]{7,20}$/.test(payload.phone)) {
    return { error: 'Please enter a valid phone number.' };
  }

  if (payload.city.length < 2) {
    return { error: 'Please enter your city.' };
  }

  if (payload.email) {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!emailOk) {
      return { error: 'Please enter a valid email.' };
    }
  }

  return { payload };
}

function getRequesterIp(req: NextRequest) {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip')?.trim() ||
    'unknown'
  );
}

async function sendContactEmail(payload: CleanContactPayload) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn('Contact email skipped: RESEND_API_KEY is not configured.');
    return;
  }

  const subject = `New Gangotri enquiry from ${payload.name}`;
  const lines = [
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email || 'Not provided'}`,
    `City: ${payload.city}`,
    `Interest: ${payload.interest}`,
    payload.bill ? `Monthly bill: ${payload.bill}` : null,
    `Source page: ${payload.sourcePage}`,
    '',
    'Message:',
    payload.message || 'No message provided.',
  ].filter(Boolean);

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Gangotri Website <onboarding@resend.dev>',
      to: [NOTIFICATION_TO_EMAIL],
      reply_to: payload.email || undefined,
      subject,
      text: lines.join('\n'),
    }),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new Error(`Email notification failed: ${response.status} ${details}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactPayload;
    const result = validatePayload(body);

    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    const ip = getRequesterIp(req);
    const last = recentSubmissions.get(ip);
    const now = Date.now();

    if (last && now - last < RATE_LIMIT_WINDOW_MS) {
      return NextResponse.json(
        { error: 'Please wait a few seconds before submitting again.' },
        { status: 429 }
      );
    }

    recentSubmissions.set(ip, now);

    const payload = result.payload;
    const supabase = getSupabaseContactInsertClient();
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert({
        name: payload.name,
        phone: payload.phone,
        email: payload.email || null,
        city: payload.city,
        interest: payload.interest || 'Not sure yet',
        message: payload.message || null,
        monthly_bill: payload.bill || null,
        source_page: payload.sourcePage,
        status: 'new',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Something went wrong on our end. Please try again.' },
        { status: 500 }
      );
    }

    try {
      await sendContactEmail(payload);
    } catch (emailError) {
      console.error(emailError);
    }

    return NextResponse.json({ success: true, id: data?.id }, { status: 201 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
