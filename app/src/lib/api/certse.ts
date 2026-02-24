import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchCERTSE(): Promise<IntelligenceFetchResult> {
    try {
        // Use allorigins to bypass CORS for client-side fetching
        const res = await fetch('https://api.allorigins.win/raw?url=https://www.cert.se/feed.rss', {
            cache: 'no-store' // Avoid caching old results
        });

        if (!res.ok) {
            console.error(`Failed to fetch CERT-SE RSS: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const xmlText = await res.text();
        const items: IntelligenceItem[] = [];

        // Simple regex-based XML parsing to extract items
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemXml = match[1];

            const titleMatch = itemXml.match(/<title>([^<]*)<\/title>/);
            const linkMatch = itemXml.match(/<link>([^<]*)<\/link>/);
            const pubDateMatch = itemXml.match(/<pubDate>([^<]*)<\/pubDate>/);
            const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);

            let title = titleMatch ? titleMatch[1] : 'Säkerhetsvarning';
            title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

            let description = descMatch ? descMatch[1] : 'Ny uppdatering från CERT-SE';
            description = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            description = description.replace(/<[^>]*>?/gm, ''); // Strip HTML tags

            items.push({
                id: `certse-${Math.random().toString(36).substring(7)}`,
                source: 'CERT-SE',
                title: title.trim(),
                description: description.trim(),
                category: 'Cybersäkerhet',
                timestamp: pubDateMatch ? new Date(pubDateMatch[1]).toISOString() : new Date().toISOString(),
                severity: 'medium',
                link: linkMatch ? linkMatch[1] : '',
            });

            if (items.length >= 5) break; // Take only the 5 most recent
        }

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching CERT-SE RSS:', error);
        return { items: [], ok: false };
    }
}
