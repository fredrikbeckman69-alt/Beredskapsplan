"use client";

import { useState } from "react";
import { ActivitySquare, Clock, HardDrive, ArrowDownUp, AlertCircle, TrendingUp } from "lucide-react";

type Process = {
    id: string;
    name: string;
    description: string;
    priority: 1 | 2 | 3 | 4; // 1 = Kritisk
    mtpd: string; // Maximal Tolerable Period of Disruption
    rto: string; // Recovery Time Objective
    rpo: string; // Recovery Point Objective
    owner: string;
};

const processes: Process[] = [
    { id: "P1", name: "Inpasseringssystem / Larm", description: "Skalskydd och inpassage till anläggning.", priority: 1, mtpd: "4h", rto: "2h", rpo: "Ingen data", owner: "Säkerhetschef" },
    { id: "P2", name: "Affärssystem (ERP)", description: "Orderhantering, lagerstatus och fakturering.", priority: 1, mtpd: "24h", rto: "8h", rpo: "1h", owner: "IT-ansvarig" },
    { id: "P3", name: "Utgående Logistik", description: "Plock, pack och leverans till kund.", priority: 2, mtpd: "48h", rto: "24h", rpo: "24h", owner: "Logistikansvarig" },
    { id: "P4", name: "Kundtjänst & Växel", description: "Inkommande samtal och mail från kund.", priority: 3, mtpd: "72h", rto: "48h", rpo: "24h", owner: "Försäljningschef" },
    { id: "P5", name: "Lönehantering", description: "Utbetalning av löner till personal.", priority: 3, mtpd: "1v", rto: "5d", rpo: "1d", owner: "HR" },
    { id: "P6", name: "Marknadsföring / Hemsida", description: "Extern webbplats och kampanjer.", priority: 4, mtpd: "2v", rto: "1v", rpo: "1v", owner: "Kommunikationschef" },
];

export default function BIAPage() {
    const [sortOrder, setSortOrder] = useState<"priority" | "rto">("priority");

    const sortedProcesses = [...processes].sort((a, b) => {
        if (sortOrder === "priority") {
            return a.priority - b.priority;
        } else {
            // Rough sorting by time string (h/d/v)
            const getHours = (timeStr: string) => {
                const val = parseInt(timeStr);
                if (timeStr.includes('h')) return val;
                if (timeStr.includes('d')) return val * 24;
                if (timeStr.includes('v')) return val * 24 * 7;
                return 0;
            };
            return getHours(a.rto) - getHours(b.rto);
        }
    });

    const getPriorityBadge = (prio: number) => {
        switch (prio) {
            case 1: return <span className="bg-red-500/20 text-red-500 border border-red-500/20 px-2.5 py-1 rounded text-xs font-bold w-full text-center">KRITISK (P1)</span>;
            case 2: return <span className="bg-orange-500/20 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded text-xs font-bold w-full text-center">HÖG (P2)</span>;
            case 3: return <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/20 px-2.5 py-1 rounded text-xs font-bold w-full text-center">MEDEL (P3)</span>;
            case 4: return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded text-xs font-bold w-full text-center">LÅG (P4)</span>;
            default: return null;
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                        <ActivitySquare className="w-8 h-8 text-indigo-500 mr-4" />
                        Business Impact Analysis (BIA)
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Klassificering av verksamhetens kritiska processer. Anger i vilken ordning system ska återställas (RTO) och tolerans för dataförlust (RPO).
                    </p>
                </div>
                <div className="flex bg-[#111] p-1 rounded-lg border border-[#222]">
                    <button
                        onClick={() => setSortOrder("priority")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${sortOrder === "priority" ? "bg-white/10 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Sortera på Prioritet
                    </button>
                    <button
                        onClick={() => setSortOrder("rto")}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${sortOrder === "rto" ? "bg-white/10 text-white shadow-sm" : "text-zinc-500 hover:text-zinc-300"}`}
                    >
                        Sortera på RTO tid
                    </button>
                </div>
            </div>

            <div className="grid gap-4">
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 bg-black/40 border border-[#222] rounded-xl text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    <div className="col-span-1">Prioritet</div>
                    <div className="col-span-3">Process / Funktion</div>
                    <div className="col-span-2 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> MTPD (Max Avbrott)</div>
                    <div className="col-span-2 flex items-center gap-1"><Clock className="w-3 h-3 text-sky-500" /> RTO (Återställning)</div>
                    <div className="col-span-2 flex items-center gap-1"><HardDrive className="w-3 h-3 text-rose-500" /> RPO (Dataförlust)</div>
                    <div className="col-span-2">Processägare</div>
                </div>

                {sortedProcesses.map((process, index) => (
                    <div key={process.id} className="bg-[#111] border border-[#222] rounded-xl p-4 md:p-6 hover:bg-[#151515] transition-colors relative overflow-hidden group">

                        {/* Mobile Priority Badge */}
                        <div className="md:hidden mb-4 w-32">
                            {getPriorityBadge(process.priority)}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-4 md:gap-4 items-center relative z-10">
                            <div className="col-span-1 hidden md:flex">
                                {getPriorityBadge(process.priority)}
                            </div>

                            <div className="col-span-3">
                                <h3 className="text-lg md:text-base font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{process.name}</h3>
                                <p className="text-sm text-zinc-500 line-clamp-2">{process.description}</p>
                            </div>

                            {/* MTPD */}
                            <div className="col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start bg-black/20 md:bg-transparent p-3 md:p-0 rounded-lg">
                                <span className="md:hidden text-xs text-zinc-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> MTPD</span>
                                <span className="font-mono text-white text-lg md:text-base">{process.mtpd}</span>
                            </div>

                            {/* RTO */}
                            <div className="col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start bg-sky-500/5 md:bg-transparent p-3 md:p-0 rounded-lg border border-sky-500/10 md:border-transparent">
                                <span className="md:hidden text-xs text-sky-500 flex items-center gap-1"><Clock className="w-3 h-3" /> RTO</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-mono font-bold text-sky-400 text-lg md:text-base">{process.rto}</span>
                                </div>
                            </div>

                            {/* RPO */}
                            <div className="col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start bg-rose-500/5 md:bg-transparent p-3 md:p-0 rounded-lg border border-rose-500/10 md:border-transparent">
                                <span className="md:hidden text-xs text-rose-500 flex items-center gap-1"><HardDrive className="w-3 h-3" /> RPO</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="font-mono font-bold text-rose-400 text-lg md:text-base">{process.rpo}</span>
                                </div>
                            </div>

                            <div className="col-span-2 flex md:flex-col justify-between md:justify-center items-center md:items-start p-2 md:p-0">
                                <span className="md:hidden text-xs text-zinc-500">Ägare</span>
                                <span className="text-sm font-medium text-zinc-300 bg-white/5 py-1 px-2 rounded">{process.owner}</span>
                            </div>
                        </div>

                        {/* Background numeric indicator */}
                        <div className="absolute -right-4 -bottom-6 text-9xl font-black text-white/[0.02] pointer-events-none select-none z-0">
                            {index + 1}
                        </div>
                    </div>
                ))}
            </div>

            {/* Explainer box */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 mt-8">
                <h4 className="font-semibold text-indigo-400 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Så läser du värdena
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                    <div>
                        <strong className="text-white block mb-1">MTPD (Maximal Tolerable Period of Disruption)</strong>
                        <p className="text-indigo-200/70">Den absolut längsta tiden en specifik process kan ligga nere innan det får oacceptabla konsekvenser för hela verksamhetens överlevnad.</p>
                    </div>
                    <div>
                        <strong className="text-white block mb-1">RTO (Recovery Time Objective)</strong>
                        <p className="text-indigo-200/70">Måltiden för hur snabbt systemet eller processen *ska* vara återställd. Måste alltid vara kortare än MTPD.</p>
                    </div>
                    <div>
                        <strong className="text-white block mb-1">RPO (Recovery Point Objective)</strong>
                        <p className="text-indigo-200/70">Hur mycket data verksamheten har råd att förlora mätt i tid. Om RPO är 1h måste backup tagas minst en gång i timmen.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

