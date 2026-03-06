import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Define the path to the JSON file
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'next-of-kin.json');

// Ensure the data directory exists
async function ensureDataDirectoryExists() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

// GET method to retrieve contacts
export async function GET() {
    try {
        await ensureDataDirectoryExists();

        try {
            const data = await fs.readFile(DATA_FILE, 'utf-8');
            return NextResponse.json(JSON.parse(data));
        } catch (error: any) {
            // If the file doesn't exist, return an empty array
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

// POST method to save contacts
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
