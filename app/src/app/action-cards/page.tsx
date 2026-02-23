import { ListChecks, Clock, User, ShieldAlert } from "lucide-react";

export default function ActionCardsPage() {
    return (
        <div className="p-8 space-y-8 w-full max-w-6xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Action Cards</h2>
                <p className="text-zinc-400">Tidsbaserade checklistor (0-6h, 6-24h, 24-72h) för krisledningen.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Fas 1: 0-6 timmar */}
                <div className="bg-[#111] border border-blue-500/30 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Clock className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center">
                        <span className="bg-blue-500/20 px-2 py-1 rounded text-sm mr-3">Fas 1</span>
                        0-6 timmar
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {/* Checklist Item */}
                        <label className="flex items-start space-x-3 p-3 bg-black/40 rounded-lg border border-white/5 cursor-pointer hover:bg-black/60 transition">
                            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-zinc-600 bg-black text-emerald-500 focus:ring-emerald-500/20" />
                            <div>
                                <p className="font-medium text-zinc-200">Kalla in Krisledningsgruppen</p>
                                <div className="flex items-center text-xs text-zinc-500 mt-1">
                                    <User className="w-3 h-3 mr-1" />
                                    Ansvarig: VD
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start space-x-3 p-3 bg-black/40 rounded-lg border border-white/5 cursor-pointer hover:bg-black/60 transition">
                            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-zinc-600 bg-black text-emerald-500 focus:ring-emerald-500/20" />
                            <div>
                                <p className="font-medium text-zinc-200">Säkra larm och fysiskt skalskydd</p>
                                <div className="flex items-center text-xs text-zinc-500 mt-1">
                                    <User className="w-3 h-3 mr-1" />
                                    Ansvarig: Beredskapsledare (Fysisk Miljö)
                                </div>
                            </div>
                        </label>

                        <label className="flex items-start space-x-3 p-3 bg-black/40 rounded-lg border border-white/5 cursor-pointer hover:bg-black/60 transition">
                            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-zinc-600 bg-black text-emerald-500 focus:ring-emerald-500/20" />
                            <div>
                                <p className="font-medium text-zinc-200">Uppdatera personal om läget</p>
                                <div className="flex items-center text-xs text-zinc-500 mt-1">
                                    <User className="w-3 h-3 mr-1" />
                                    Ansvarig: Affärsstöd/HR
                                </div>
                            </div>
                        </label>

                        <button className="w-full mt-4 py-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg font-medium transition text-sm flex justify-center items-center">
                            <ListChecks className="w-4 h-4 mr-2" />
                            Se alla (8 uppgifter)
                        </button>
                    </div>
                </div>

                {/* Fas 2: 6-24 timmar */}
                <div className="bg-[#111] border border-[#222] opacity-80 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Clock className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-400 mb-4 flex items-center">
                        <span className="bg-zinc-800 px-2 py-1 rounded text-sm mr-3 text-zinc-500">Fas 2</span>
                        6-24 timmar
                    </h3>
                    <div className="space-y-4 relative z-10">
                        {/* Låst vy för framtida steg */}
                        <div className="flex items-start space-x-3 p-3 bg-black/20 rounded-lg border border-white/5 opacity-50">
                            <div className="mt-1 w-5 h-5 rounded border border-zinc-700 bg-black/50" />
                            <div>
                                <p className="font-medium text-zinc-500">Hantera leverantörskommunikation</p>
                                <p className="text-xs text-zinc-600 mt-1">Ansvarig: Supply Chain</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fas 3: 24-72 timmar */}
                <div className="bg-[#111] border border-[#222] opacity-50 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <ShieldAlert className="w-24 h-24" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-500 mb-4 flex items-center">
                        <span className="bg-zinc-800 px-2 py-1 rounded text-sm mr-3 text-zinc-600">Fas 3</span>
                        24-72 timmar
                    </h3>
                    <div className="space-y-4 relative z-10">
                        <div className="text-sm text-zinc-500 italic">Aktiveras efter Fas 2 är inledd...</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
