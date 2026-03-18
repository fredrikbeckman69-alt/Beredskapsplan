import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/api/exchange';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { to, subject, bodyText } = body;

    if (!to || !subject || !bodyText) {
      return NextResponse.json(
        { error: 'Missing required fields: to, subject, bodyText' },
        { status: 400 }
      );
    }

    const result = await sendEmail(to, subject, bodyText);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('API /api/emails/send Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send email' },
      { status: 500 }
    );
  }
}
