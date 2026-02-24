import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchLansstyrelsen(): Promise<IntelligenceFetchResult> {
    try {
        // Fetch Länsstyrelsen news via Google News RSS for high reliability
        const res = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://news.google.com/rss/search?q=L%C3%A4nsstyrelsen+when:7d&hl=sv&gl=SE&ceid=SE:sv'), {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`Failed to fetch Länsstyrelsen (RSS): ${res.statusText}`);
            return { items: [], ok: false };
        }

        const xmlText = await res.text();
        const items: IntelligenceItem[] = [];

        // Simple regex-based XML parsing to extract items
        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match;

        while ((match = itemRegex.exec(xmlText)) !== null) {
            const itemXml = match[1];

            // Extract fields using regex
            const titleMatch = itemXml.match(/<title>([^<]*)<\/title>/);
            const linkMatch = itemXml.match(/<link>([^<]*)<\/link>/);
            const pubDateMatch = itemXml.match(/<pubDate>([^<]*)<\/pubDate>/);
            const descMatch = itemXml.match(/<description>([\s\S]*?)<\/description>/);

            let title = titleMatch ? titleMatch[1] : 'Nyhet från Länsstyrelsen';
            const link = linkMatch ? linkMatch[1] : '';
            const pubDateStr = pubDateMatch ? pubDateMatch[1] : new Date().toISOString();

            // Decode HTML entities in title if any
            title = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');

            // Clean up description HTML
            let description = descMatch ? descMatch[1] : '';
            // Decode entities first so HTML tags are formed before stripping
            description = description.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
            description = description.replace(/<[^>]*>?/gm, ''); // Strip HTML tags
            description = description.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"');

            const timestamp = new Date(pubDateStr).toISOString();

            items.push({
                id: `lansst-${Math.random().toString(36).substring(7)}`,
                source: 'Länsstyrelsen',
                title: title,
                description: description.trim(),
                category: 'Myndighetsinformation',
                timestamp: timestamp,
                severity: 'low', // Default low for general news, could be parsed for keywords
                link: link
            });
        }

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching Länsstyrelsen RSS:', error);
        return { items: [], ok: false };
    }
}
