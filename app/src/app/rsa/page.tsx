"use client";

import { AlertTriangle, ShieldAlert, Activity, Info, AlertOctagon } from "lucide-react";

type Risk = {
    id: string;
    title: string;
    description: string;
    probability: number; // 1-5
    impact: number;      // 1-5
    status: 'active' | 'mitigated' | 'monitoring';
};

const risks: Risk[] = [
    { id: "R1", title: "Långvarigt Strömavbrott", description: "Bortfall av el i mer än 24h", probability: 3, impact: 5, status: 'active' },
    { id: "R2", title: "Ransomware / IT-haveri", description: "Bortfall av affärssystem och data", probability: 4, impact: 5, status: 'active' },
    { id: "R3", title: "Viktig underleverantör slås ut", description: "Förbisedd 3:e part logistik", probability: 3, impact: 4, status: 'monitoring' },
    { id: "R4", title: "Brand i huvudlager", description: "Förlust av material och infrastruktur", probability: 2, impact: 5, status: 'mitigated' },
    { id: "R5", title: "Påverkanskampanj / Desinformation", description: "Ryktesspridning online", probability: 4, impact: 2, status: 'monitoring' },
];

export default function RSAPage() {
    // 5x5 Matrix helper
    const getRiskColor = (p: number, i: number) => {
        const score = p * i;
        if (score >= 15) return "bg-red-500/80 border-red-500"; // High Risk
        if (score >= 8) return "bg-amber-500/80 border-amber-500"; // Medium Risk
        return "bg-emerald-500/80 border-emerald-500"; // Low Risk
    };

    const getScoreBadge = (score: number) => {
        if (score >= 15) return <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-xs font-bold border border-red-500/20">HÖG ({score})</span>;
        if (score >= 8) return <span className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-xs font-bold border border-amber-500/20">MEDEL ({score})</span>;
        return <span className="bg-emerald-500/20 text-emerald-500 px-2 py-0.5 rounded text-xs font-bold border border-emerald-500/20">LÅG ({score})</span>;
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                        <Activity className="w-8 h-8 text-rose-500 mr-4" />
                        Risk- och Sårbarhetsanalys
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Identifiering och bedömning av risker för att säkra kontinuiteten i verksamheten (BCM).
                    </p>
                </div>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center shrink-0">
                    <ShieldAlert className="w-4 h-4 mr-2" />
                    Ny Riskanalys
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Heatmap / Risk Matrix */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <AlertOctagon className="w-40 h-40 text-rose-500" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                            Riskmatris
                            <div className="group relative ml-2">
                                <Info className="w-4 h-4 text-zinc-500 cursor-pointer" />
                                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 bg-zinc-800 text-xs text-zinc-300 p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    X-axel: Sannolikhet (1-5)<br />Y-axel: Konsekvens (1-5)
                                </div>
                            </div>
                        </h3>

                        <div className="relative pt-6 pl-6">
                            {/* Y-axis label */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-center text-xs text-zinc-500 font-medium tracking-widest uppercase">
                                Konsekvens
                            </div>

                            <div className="grid grid-cols-5 grid-rows-5 gap-1 aspect-square max-w-md mx-auto relative border-l border-b border-zinc-700">
                                {[5, 4, 3, 2, 1].map((impact) =>
                                    [1, 2, 3, 4, 5].map((prob) => {
                                        const matchingRisks = risks.filter(r => r.probability === prob && r.impact === impact);
                                        const cellColor = getRiskColor(prob, impact);

                                        return (
                                            <div
                                                key={`cell-${prob}-${impact}`}
                                                className={`relative border border-black/50 transition-colors ${matchingRisks.length > 0 ? cellColor : 'bg-zinc-800/20'}`}
                                            >
                                                {matchingRisks.length > 0 && (
                                                    <div className="absolute inset-0 flex items-center justify-center filter drop-shadow-md">
                                                        <div className="flex flex-wrap gap-1 p-1 justify-center items-center">
                                                            {matchingRisks.map(r => (
                                                                <span key={r.id} className="w-6 h-6 rounded-full bg-black/80 text-white text-[10px] font-bold flex items-center justify-center backdrop-blur-sm border border-white/20 hover:scale-125 transition-transform cursor-pointer" title={r.title}>
                                                                    {r.id}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                )}
                            </div>

                            {/* X-axis label */}
                            <div className="text-center text-xs text-zinc-500 font-medium tracking-widest uppercase mt-4">
                                Sannolikhet
                            </div>
                        </div>
                    </div>
                </div>

                {/* Risk Register */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-xl flex flex-col h-full">
                    <h3 className="text-xl font-semibold text-white mb-6">Identifierade Risker</h3>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {risks.sort((a, b) => (b.probability * b.impact) - (a.probability * a.impact)).map(risk => {
                            const score = risk.probability * risk.impact;
                            return (
                                <div key={risk.id} className="bg-black/40 border border-[#222] p-4 rounded-xl hover:bg-black/60 transition-colors group">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-mono text-zinc-500 bg-white/5 px-1.5 py-0.5 rounded">{risk.id}</span>
                                            <h4 className="font-semibold text-zinc-200 group-hover:text-white transition-colors">{risk.title}</h4>
                                        </div>
                                        {getScoreBadge(score)}
                                    </div>
                                    <p className="text-sm text-zinc-400 mb-3">{risk.description}</p>

                                    <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1.5 text-zinc-500">
                                            <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                                            Sannolikhet: <span className="text-zinc-300 font-medium">{risk.probability}/5</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-zinc-500">
                                            <span className="w-2 h-2 rounded-full bg-zinc-700"></span>
                                            Konsekvens: <span className="text-zinc-300 font-medium">{risk.impact}/5</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

