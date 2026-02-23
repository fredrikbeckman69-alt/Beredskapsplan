"use client";

import { useEffect, useState } from "react";
import { Radio } from "lucide-react";

export function VMAStatusBadge() {
    const [status, setStatus] = useState<'pending' | 'online' | 'offline'>('pending');

    useEffect(() => {
        // Ping the Krisinformation API to verify it is reachable
        async function checkVMAAPI() {
            try {
                const res = await fetch('https://api.krisinformation.se/v3/vmas', {
                    method: 'HEAD', // We only need to check if it's reachable
                }).catch(() => fetch('https://api.krisinformation.se/v3/vmas')); // Fallback to GET if HEAD isn't allowed

                if (res.ok) {
                    setStatus('online');
                } else {
                    setStatus('offline');
                }
            } catch (error) {
                setStatus('offline');
            }
        }

        checkVMAAPI();

        // Check every 5 minutes
        const interval = setInterval(checkVMAAPI, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`flex items-center px-4 py-2 rounded-full border backdrop-blur-md shadow-lg transition-all ${status === 'online'
                ? 'bg-[#1C2C32]/40 text-[#00E676] border-white/5'
                : status === 'offline'
                    ? 'bg-red-500/10 text-red-500 border-red-500/20 shadow-red-500/10'
                    : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20 shadow-zinc-500/10'
                }`}
            title={status === 'online' ? 'VMA Krisinformation API är anslutet och övervakas' : 'Kunde inte ansluta till VMA Krisinformation API'}
        >
            <Radio className={`w-4 h-4 mr-2 ${status === 'online' ? 'animate-pulse text-emerald-400' : ''}`} />
            <span className="text-xs font-semibold tracking-wide">
                VMA Länk: {status === 'online' ? 'Aktiv' : status === 'offline' ? 'Avbrott' : 'Kontrollerar...'}
            </span>
            {status === 'online' && (
                <div className="ml-2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse"></div>
            )}
            {status === 'offline' && (
                <div className="ml-2 w-2 h-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]"></div>
            )}
        </div>
    );
}
