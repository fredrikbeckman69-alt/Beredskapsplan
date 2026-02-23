import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchKrisinformation(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://api.krisinformation.se/v1/feed?format=json', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            console.error(`Failed to fetch Krisinformation: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();
        const entries = data?.Entries || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = entries.map((entry: any) => ({
            id: `msb-${entry.Identifier || Math.random().toString(36).substring(7)}`,
            source: 'MCF',
            title: entry.Title || 'Viktigt meddelande',
            description: entry.Text || entry.Summary || '',
            category: 'Samhällsinformation',
            timestamp: entry.Published || new Date().toISOString(),
            severity: 'medium', // Default to medium, could be parsed from tags if needed
            link: entry.LinkUrl,
        }));
        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching Krisinformation:', error);
        return { items: [], ok: false };
    }
}
