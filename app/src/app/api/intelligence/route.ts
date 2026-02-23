import { NextResponse } from 'next/server';
import { fetchKrisinformation } from '@/lib/api/krisinformation';
import { fetchSMHI } from '@/lib/api/smhi';
import { fetchPolisen } from '@/lib/api/polisen';
import { fetchLansstyrelsen } from '@/lib/api/lansstyrelsen';
import { fetchCERTSE } from '@/lib/api/certse';
import { fetchBankID } from '@/lib/api/bankid';
import { IntelligenceItem } from '@/lib/api/types';

export const revalidate = 300; // Cache the whole route for 5 minutes

export async function GET() {
    try {
        const [krisData, smhiData, polisenData, lansstyrelsenData, certseData, bankidData] = await Promise.all([
            fetchKrisinformation(),
            fetchSMHI(),
            fetchPolisen(),
            fetchLansstyrelsen(),
            fetchCERTSE(),
            fetchBankID()
        ]);

        const allData: IntelligenceItem[] = [
            ...krisData.items,
            ...smhiData.items,
            ...polisenData.items,
            ...lansstyrelsenData.items,
            ...certseData.items,
            ...bankidData.items
        ];

        // Sort by timestamp descending (newest first)
        const sortedItems = allData.sort((a, b) => {
            return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        });

        return NextResponse.json({
            items: sortedItems,
            status: {
                "Krisinformation.se": krisData.ok,
                SMHI: smhiData.ok,
                Polisen: polisenData.ok,
                "Länsstyrelsen": lansstyrelsenData.ok,
                "CERT-SE": certseData.ok,
                "BankID": bankidData.ok
            }
        });
    } catch (error) {
        console.error('Error in /api/intelligence route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch intelligence data' },
            { status: 500 }
        );
    }
}
