"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { VMAAlert } from "@/lib/vma";

// Set to true to test the banner UI locally
const MOCK_VMA = false;

const mockVMAData: VMAAlert[] = [
    {
        Identifier: "mock-vma-1234",
        Headline: "Viktigt meddelande till allmänheten i [Exempelstad]",
        Description: "Detta är ett test av VMA-tjänsten. Gå inomhus, stäng dörrar, fönster och ventilation.",
        Web: "https://www.krisinformation.se",
        Type: "VMA",
        BodyText: "Ett utsläpp av farlig rök har inträffat. Alla uppmanas att gå inomhus..."
    }
];

export function VMABanner() {
    const [vmas, setVmas] = useState<VMAAlert[]>([]);
    const [dismissed, setDismissed] = useState<Set<string>>(new Set());

    useEffect(() => {
        async function fetchVMAs() {
            if (MOCK_VMA) {
                setVmas(mockVMAData);
                return;
            }
            try {
                const res = await fetch('https://api.krisinformation.se/v3/vmas');
                if (res.ok) {
                    const data = await res.json();

                    // Filter out tests. SR api uses msgType, KrisInfo provides a 'Type' and also has 'Exercise' or 'Test' patterns. 
                    // Let's filter out anything that has "test" in the Headline/Description (case insensitive) just to be safe,
                    // or where the payload explicitly marks it as not an actual warning.
                    const realVmas = data.filter((vma: VMAAlert) => {
                        const isTestHeadline = vma.Headline.toLowerCase().includes('test');
                        const isTestDescription = vma.Description.toLowerCase().includes('test');

                        // If it's explicitly a test according to text, ignore it
                        if (isTestHeadline || isTestDescription) {
                            return false;
                        }

                        return true;
                    });

                    setVmas(realVmas);
                }
            } catch (error) {
                console.error("Failed to fetch VMAs:", error);
            }
        }

        fetchVMAs();

        // Poll every 60 seconds
        const interval = setInterval(fetchVMAs, 60000);
        return () => clearInterval(interval);
    }, []);

    const activeVmas = vmas.filter(vma => !dismissed.has(vma.Identifier));

    if (activeVmas.length === 0) return null;

    return (
        <div className="w-full z-[100] relative">
            {activeVmas.map((vma) => (
                <div
                    key={vma.Identifier}
                    className="bg-red-600 text-white w-full border-b-4 border-red-800 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-in slide-in-from-top-4 fade-in duration-500 relative"
                >
                    <div className="absolute inset-0 bg-red-500 opacity-20 animate-pulse pointer-events-none" />

                    <div className="max-w-7xl mx-auto p-2 md:p-3 flex items-start gap-3">
                        <div className="bg-white/20 p-1.5 md:p-2 rounded-full flex-shrink-0 animate-bounce mt-0.5">
                            <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-white relative z-10" />
                        </div>

                        <div className="flex-1 relative z-10 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex-1">
                                <h2 className="text-sm md:text-base font-bold uppercase tracking-wider mb-0.5 flex items-center gap-2 leading-tight">
                                    <span className="bg-white text-red-600 px-1.5 py-0.5 rounded text-[10px] md:text-xs font-black w-fit">VMA</span>
                                    {vma.Headline}
                                </h2>
                                <p className="text-red-50 text-xs md:text-sm leading-snug">
                                    {vma.Description}
                                </p>
                            </div>

                            {vma.Web && (
                                <a
                                    href={vma.Web}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex flex-shrink-0 bg-white/20 hover:bg-white/30 transition-colors text-white text-[10px] md:text-xs px-3 py-1.5 rounded font-medium items-center gap-1"
                                >
                                    Läs mer på Krisinformation.se &rarr;
                                </a>
                            )}
                        </div>

                        <button
                            onClick={() => {
                                setDismissed(prev => {
                                    const newSet = new Set(prev);
                                    newSet.add(vma.Identifier);
                                    return newSet;
                                });
                            }}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors relative z-10"
                            aria-label="Fäll in / Dölj meddelande tillfälligt"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
