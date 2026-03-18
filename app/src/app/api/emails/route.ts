import { NextResponse } from 'next/server';
import { getInbox } from '@/lib/api/exchange';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limitParam = url.searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 20;

    const emails = await getInbox(limit);
    return NextResponse.json({ emails });
  } catch (error: any) {
    console.error('API /api/emails Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch emails' },
      { status: 500 }
    );
  }
}
