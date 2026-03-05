import { NextResponse } from 'next/server';

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
    try {
        const response = await fetch('https://api.krisinformation.se/v3/vmas', {
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            console.error('Failed to fetch VMA from krisinformation.se server-side');
            return NextResponse.json([], { status: 500 });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching VMA server-side:', error);
        return NextResponse.json([], { status: 500 });
    }
}
