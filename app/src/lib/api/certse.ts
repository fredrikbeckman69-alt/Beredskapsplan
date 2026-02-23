import { IntelligenceItem, IntelligenceFetchResult } from './types';
import Parser from 'rss-parser';

export async function fetchCERTSE(): Promise<IntelligenceFetchResult> {
    try {
        const parser = new Parser();
        // Since we are running server side in NextJs, we can use the parser directly on the URL or fetch it.
        // It's often safer to fetch text and parseString to use Next.js caching.
        const res = await fetch('https://www.cert.se/feed.rss', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            console.error(`Failed to fetch CERT-SE RSS: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const xml = await res.text();
        const feed = await parser.parseString(xml);

        const items: IntelligenceItem[] = [];

        if (feed.items && Array.isArray(feed.items)) {
            // Take the 5 most recent items to not flood the feed
            feed.items.slice(0, 5).forEach((item: any) => {
                items.push({
                    id: `certse-${item.guid || item.id || Math.random().toString(36).substring(7)}`,
                    source: 'CERT-SE',
                    title: item.title || 'Säkerhetsvarning',
                    description: item.contentSnippet || item.content || item.summary || 'Ny uppdatering från CERT-SE',
                    category: 'Cybersäkerhet',
                    timestamp: item.isoDate || item.pubDate || new Date().toISOString(),
                    severity: 'medium', // Default to medium, CERT-SE doesn't provide severity in standard RSS
                    link: item.link,
                });
            });
        }

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching CERT-SE RSS:', error);
        return { items: [], ok: false };
    }
}
