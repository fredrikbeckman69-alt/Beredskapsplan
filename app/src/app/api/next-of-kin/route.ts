import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    return NextResponse.json([{ id: "test", name: "It works", phone: "123", relation: "Friend", staffName: "Test" }]);
}

export async function POST() {
    return NextResponse.json({ success: true });
}
