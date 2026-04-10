import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchSMHI(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://opendata-download-warnings.smhi.se/ibww/api/version/1/warning.json', {
            next: { revalidate: 300 }
        });

        if (!res.ok) {
            console.error(`Failed to fetch SMHI: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();
        const messages = Array.isArray(data) ? data : [];
        const items: IntelligenceItem[] = [];

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        messages.forEach((group: any) => {
            const groupEventTitle = group.event?.sv || 'Vädervarning';

            if (Array.isArray(group.warningAreas)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                group.warningAreas.forEach((area: any) => {
                    const timeBase = area.published || area.approximateStart || new Date().toISOString();

                    let title = groupEventTitle;
                    if (area.eventDescription && area.eventDescription.sv) {
                        title = `${groupEventTitle} (${area.eventDescription.sv})`;
                    } else if (area.eventDescription && area.eventDescription.en) {
                        title = `${groupEventTitle} (${area.eventDescription.en})`;
                    }

                    // Combine descriptions texts
                    let desc = '';
                    if (Array.isArray(area.descriptions)) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        desc = area.descriptions.map((d: any) => {
                            let cleanText = '';
                            if (d.text && typeof d.text === 'object' && d.text.sv) {
                                cleanText = d.text.sv;
                            } else if (typeof d.text === 'string') {
                                cleanText = d.text;
                                if (cleanText.startsWith('@{sv=')) {
                                    const match = cleanText.match(/@\{sv=([^;]+);/);
                                    if (match) cleanText = match[1];
                                }
                            }

                            // Extract title for the description section if available
                            let dTitle = '';
                            if (d.title && typeof d.title === 'object' && d.title.sv) {
                                dTitle = `**${d.title.sv}**\n`;
                            } else if (typeof d.title === 'string' && d.title.startsWith('@{sv=')) {
                                const match = d.title.match(/@\{sv=([^;]+);/);
                                if (match) dTitle = `**${match[1]}**\n`;
                            }

                            return cleanText ? `${dTitle}${cleanText}`.trim() : '';
                        }).filter(Boolean).join('\n\n');
                    }

                    if (area.areaName && area.areaName.sv) {
                        desc = `**Område:** ${area.areaName.sv}\n\n${desc}`;
                    }

                    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'; // Default to medium
                    const warningLevelCode = String(area.warningLevel?.code || '').toLowerCase();
                    const warningLevelSv = String(area.warningLevel?.sv || '').toLowerCase();

                    if (warningLevelSv.includes('orange') || warningLevelCode.includes('orange')) {
                        severity = 'high';
                    }
                    if (warningLevelSv.includes('röd') || warningLevelCode.includes('red')) {
                        severity = 'critical';
                    }
                    if (warningLevelSv.includes('gul') || warningLevelCode.includes('yellow')) {
                        severity = 'medium';
                    }
                    if (warningLevelCode.includes('message') || warningLevelSv.includes('meddelande')) {
                        severity = 'low'; // Using low for pure "meddelande"
                    }

                    items.push({
                        id: `smhi-${area.id || Math.random().toString(36).substring(7)}`,
                        source: 'SMHI',
                        title: `SMHI: ${title}`,
                        description: desc.trim(),
                        category: area.warningLevel?.sv || 'Väder',
                        timestamp: timeBase,
                        severity,
                    });
                });
            }
        });

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching SMHI API:', error);
        return { items: [], ok: false };
    }
}
