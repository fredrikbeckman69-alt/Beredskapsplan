import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchSMHI(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://opendata-download-warnings.smhi.se/api/version/2/messages.json', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            console.error(`Failed to fetch SMHI: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();
        const messages = data?.message || [];
        const items: IntelligenceItem[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages.forEach((msg: any) => {
            const timeBase = msg.timeBase || new Date().toISOString();
            const infoList = msg.info || [];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            infoList.forEach((info: any) => {
                // Find swedish text if available
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                let title = 'Vädervarning';
                if (info.event && info.event.sv) {
                    title = info.event.sv;
                } else if (info.event) {
                    title = typeof info.event === 'string' ? info.event : 'Vädervarning';
                }

                let desc = '';
                if (info.description && info.description.text) {
                    desc = info.description.text;
                }

                let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'; // Default to gul (yellow/medium)
                const sevStr = String(info.severity).toLowerCase();
                if (sevStr.includes('orange') || sevStr.includes('red')) {
                    severity = 'high';
                }
                if (sevStr === 'red') {
                    severity = 'critical';
                }

                items.push({
                    id: `smhi-${Math.random().toString(36).substring(7)}`,
                    source: 'SMHI',
                    title: `SMHI: ${title}`,
                    description: desc,
                    category: 'Väder',
                    timestamp: timeBase,
                    severity,
                });
            });
        });

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching SMHI API:', error);
        return { items: [], ok: false };
    }
}
