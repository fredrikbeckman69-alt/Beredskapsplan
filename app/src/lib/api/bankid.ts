import { IntelligenceItem, IntelligenceFetchResult } from './types';

export async function fetchBankID(): Promise<IntelligenceFetchResult> {
    try {
        const res = await fetch('https://status.bankid.com/api/v2/summary.json', {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!res.ok) {
            console.error(`Failed to fetch BankID Status: ${res.statusText}`);
            return { items: [], ok: false };
        }

        const data = await res.json();

        const items: IntelligenceItem[] = [];

        // Check active incidents
        if (data.incidents && Array.isArray(data.incidents)) {
            data.incidents.forEach((incident: any) => {
                if (incident.status !== 'resolved') {
                    // Map incident impact to severity
                    let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
                    const impact = String(incident.impact || '').toLowerCase();
                    if (impact === 'major' || impact === 'critical') severity = 'critical';
                    else if (impact === 'minor') severity = 'low';

                    items.push({
                        id: `bankid-${incident.id}`,
                        source: 'BankID',
                        title: incident.name || 'BankID Störning',
                        description: incident.incident_updates?.[0]?.body || 'Pågående störning',
                        category: 'IT & Drift',
                        timestamp: incident.created_at || new Date().toISOString(),
                        severity,
                        link: incident.shortlink,
                    });
                }
            });
        }

        // If overall status is not operational but no specific active incidents array was populated
        if (items.length === 0 && data.status && data.status.indicator !== 'none') {
            let severity: 'low' | 'medium' | 'high' | 'critical' = 'medium';
            const ind = String(data.status.indicator || '').toLowerCase();
            if (ind === 'critical' || ind === 'major') severity = 'critical';
            else if (ind === 'minor') severity = 'low';

            items.push({
                id: `bankid-status-${Date.now()}`,
                source: 'BankID',
                title: 'Driftstörning BankID',
                description: data.status.description || 'Störningar i BankIDs tjänster upptäckta',
                category: 'IT & Drift',
                timestamp: new Date().toISOString(),
                severity,
            });
        }

        return { items, ok: true };
    } catch (error) {
        console.error('Error fetching BankID API:', error);
        return { items: [], ok: false };
    }
}
