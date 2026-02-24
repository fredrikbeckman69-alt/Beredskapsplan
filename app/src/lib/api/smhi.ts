import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchSMHI(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json', {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch SMHI: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();
        const messages = Array.isArray(data) ? data : [];
        const items: IntelligenceItem[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages.forEach((msg: any) => {
            const timeBase = msg.normal?.sent || new Date().toISOString();
            const infoList = msg.normal?.info || msg.info || [];

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            infoList.forEach((info: any) => {
                // Find swedish text if available
                let title = 'Vädervarning';
                if (info.event && info.event.sv) {
                    title = info.event.sv;
                } else if (info.event && info.event.en) {
                    title = info.event.en;
                } else if (typeof info.event === 'string') {
                    title = info.event;
                }

                let desc = '';
                if (info.description && info.description.text) {
                    desc = info.description.text;
                } else if (typeof info.description === 'string') {
                    desc = info.description;
                }

                let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'; // Default to gul (yellow/medium)
                const sevStr = String(info.severity || '').toLowerCase();
                const colorStr = String(info.awareness_level || '').toLowerCase();

                if (sevStr.includes('orange') || sevStr.includes('red') || colorStr.includes('orange') || colorStr.includes('red')) {
                    severity = 'high';
                }
                if (sevStr === 'red' || colorStr.includes('red')) {
                    severity = 'critical';
                }

                items.push({
                    id: `smhi-${msg.id || msg.identifier || Math.random().toString(36).substring(7)}`,
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
