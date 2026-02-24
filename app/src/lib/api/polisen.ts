import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchPolisen(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://api.allorigins.win/raw?url=https://polisen.se/api/events', {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch Polisen: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();

        // Polisen API typically returns an array of events
        if (!Array.isArray(data)) return { items: [], ok: false };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items = data.slice(0, 20).map((event: any) => {
            // Determine severity based on event type
            let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';

            const type = (event.type || '').toLowerCase();
            if (type.includes('mord') || type.includes('skott') || type.includes('rån')) {
                severity = 'high';
            } else if (type.includes('brand') || type.includes('trafikolycka') || type.includes('bråk')) {
                severity = 'medium';
            }

            return {
                id: `polisen-${event.id || Math.random().toString(36).substring(7)}`,
                source: 'Polisen' as const,
                title: event.name || 'Händelse rapporterad',
                description: event.summary || '',
                category: event.type || 'Polisärende',
                timestamp: event.datetime || new Date().toISOString(),
                severity,
                link: event.url ? `https://polisen.se${event.url}` : undefined,
                location: event.location?.name
            };
        });
        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching Polisen API:', error);
        return { items: [], ok: false };
    }
}
