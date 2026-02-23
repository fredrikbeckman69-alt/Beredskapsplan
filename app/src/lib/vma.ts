export interface VMAAlert {
    Identifier: string;
    Headline: string;
    Description: string;
    Web: string;
    Type: string;
    BodyText: string;
}

/**
 * Fetches active VMAs from Krisinformation API
 * Returns an array of VMAAlert objects, or an empty array if no active VMAs.
 */
export async function getActiveVMAs(): Promise<VMAAlert[]> {
    try {
        const response = await fetch('https://api.krisinformation.se/v3/vmas', {
            // Revalidate every 60 seconds at most, though client side polling will also dictate frequency
            next: { revalidate: 60 }
        });

        if (!response.ok) {
            console.error('Failed to fetch VMA from krisinformation.se');
            return [];
        }

        const data = await response.json();
        return data as VMAAlert[];
    } catch (error) {
        console.error('Error fetching VMA:', error);
        return [];
    }
}
