```
import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchP4(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://api.sr.se/api/v2/traffic/messages?format=json', {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch P4: ${ res.statusText } `);
            return { items: [], ok: false };
        }

        const data = await res.json();
        const messages = data?.messages || [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const items: IntelligenceItem[] = messages.map((msg: any) => {
            // Priority: 1=Mycket allvarlig händelse, 2=Stor händelse, 3=Störning, 4=Information, 5=Trafikmeddelande
            let severity: IntelligenceItem['severity'] = 'low';
            if (msg.priority === 1) severity = 'high';
            else if (msg.priority === 2 || msg.priority === 3) severity = 'medium';
            else if (msg.priority === 4 || msg.priority === 5) severity = 'low';

            // Extract the timestamp from Microsoft JSON date format "\/Date(1771845965517)\/"
            let timestamp = new Date().toISOString();
            if (msg.createddate) {
                const match = msg.createddate.match(/\/Date\((\d+)\)\//);
                if (match && match[1]) {
                    timestamp = new Date(parseInt(match[1], 10)).toISOString();
                }
            }

            return {
                id: `p4 - ${ msg.id } `,
                source: 'Sveriges Radio P4',
                title: msg.title || 'Trafikinformation',
                description: msg.description || msg.exactlocation || 'Trafikmeddelande från Sveriges Radio P4.',
                category: msg.subcategory || 'Trafik',
                timestamp: timestamp,
                severity: severity,
            };
        });

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching SR P4:', error);
        return { items: [], ok: false };
    }
}
