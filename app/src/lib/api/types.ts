export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export interface IntelligenceItem {
    id: string;
    source: 'MCF' | 'SMHI' | 'Polisen';
    title: string;
    description: string;
    category: string;
    timestamp: string; // ISO string
    severity: SeverityLevel;
    link?: string;
    location?: string;
}

export interface IntelligenceFetchResult {
    items: IntelligenceItem[];
    ok: boolean;
}
