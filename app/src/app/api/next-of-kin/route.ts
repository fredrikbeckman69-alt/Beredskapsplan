import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const DATA_FILE = path.join(DATA_DIR, 'next-of-kin.json');

async function ensureDataDirectoryExists() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

export async function GET() {
    try {
        await ensureDataDirectoryExists();
        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            return NextResponse.json(JSON.parse(data));
        } catch (error: any) {
            if (error.code === 'ENOENT') {
                return NextResponse.json([]);
            }
            throw error;
        }
    } catch (error) {
        console.error('Error reading next-of-kin data:', error);
        return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const contacts = await request.json();

        await ensureDataDirectoryExists();
        await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf-8');

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving next-of-kin data:', error);
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
