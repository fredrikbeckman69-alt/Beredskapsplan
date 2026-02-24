"use client";

import { Building2, MapPin, Map, ShieldAlert, ArrowRight, Home, FileText } from "lucide-react";

type FacilityLocation = {
    id: string;
    name: string;
    address: string;
    assemblyPoint: string;
    alternativeSite: string;
    securityContact: string;
};

const facilities: FacilityLocation[] = [
    {
        id: "HQ",
        name: "Huvudkontor (HQ) & Centrallager",
        address: "Bronsyxegatan 8",
        assemblyPoint: "Besöksparkeringen",
        alternativeSite: "Bronsyxegatan 4",
        securityContact: "Lokalvaktmästare / Securitas (010-123 45 67)"
    }
];

export default function FacilitiesPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                        <Building2 className="w-8 h-8 text-amber-500 mr-4" />
                        Lokaler & Fysisk Säkerhet
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Information om utrymning, återsamlingsplatser och alternativa arbetsplatser om en fastighet måste överges.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content (Facilities List) */}
                <div className="lg:col-span-2 space-y-6">
                    {facilities.map(facility => (
                        <div key={facility.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden hover:border-amber-500/30 transition-colors">
                            <div className="bg-[#151515] border-b border-[#222] px-6 py-4 flex justify-between items-center">
                                <h3 className="text-xl font-bold text-white flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-amber-500" />
                                    {facility.name}
                                </h3>
                                <span className="text-xs font-mono text-zinc-500 bg-white/5 py-1 px-2 rounded-md">{facility.id}</span>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1 block">Besöksadress</span>
                                            <p className="text-zinc-300 font-medium">{facility.address}</p>
                                        </div>
                                        <div>
                                            <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1 block">Säkerhetsansvarig Oklart läge</span>
                                            <p className="text-zinc-300">{facility.securityContact}</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                                            <span className="flex items-center text-xs text-amber-500 uppercase font-bold tracking-wider mb-2">
                                                <Map className="w-4 h-4 mr-1.5" />
                                                Återsamlingsplats (Utrymning)
                                            </span>
                                            <p className="text-amber-100 font-medium">{facility.assemblyPoint}</p>
                                        </div>
                                        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                                            <span className="flex items-center text-xs text-zinc-400 uppercase font-bold tracking-wider mb-2">
                                                <Home className="w-4 h-4 mr-1.5 text-sky-500" />
                                                Alternativ Arbetsplats (Prio 1)
                                            </span>
                                            <p className="text-zinc-300 font-medium">{facility.alternativeSite}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar (Instructions & Documents) */}
                <div className="space-y-6">
                    <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <ShieldAlert className="w-32 h-32 text-red-500" />
                        </div>
                        <h4 className="text-red-500 font-bold text-lg mb-4 flex items-center relative z-10">
                            <ShieldAlert className="w-6 h-6 mr-2" />
                            Vid Akut Utrymning
                        </h4>
                        <ul className="space-y-3 relative z-10 text-sm text-red-200/90 font-medium">
                            <li className="flex items-start">
                                <span className="bg-red-500/20 text-red-400 rounded-full w-5 h-5 flex items-center justify-center mr-3 shrink-0 mt-0.5 text-xs">1</span>
                                Utrym omedelbart via närmaste nödutgång.
                            </li>
                            <li className="flex items-start">
                                <span className="bg-red-500/20 text-red-400 rounded-full w-5 h-5 flex items-center justify-center mr-3 shrink-0 mt-0.5 text-xs">2</span>
                                Stanna inte för att ta med personliga tillhörigheter (datorer, väskor).
                            </li>
                            <li className="flex items-start">
                                <span className="bg-red-500/20 text-red-400 rounded-full w-5 h-5 flex items-center justify-center mr-3 shrink-0 mt-0.5 text-xs">3</span>
                                Samlas vid angiven återsamlingsplats.
                            </li>
                            <li className="flex items-start">
                                <span className="bg-red-500/20 text-red-400 rounded-full w-5 h-5 flex items-center justify-center mr-3 shrink-0 mt-0.5 text-xs">4</span>
                                Invita inräkning från Utrymningsledare. Avvik EJ från platsen.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                        <h4 className="font-bold text-white mb-4">Utrymningsplaner (PDF)</h4>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 transition-colors group">
                                <span className="flex items-center text-sm font-medium">
                                    <FileText className="w-4 h-4 mr-3 text-zinc-500" />
                                    HQ Plan 1 (Kontor)
                                </span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-zinc-300 transition-colors group">
                                <span className="flex items-center text-sm font-medium">
                                    <FileText className="w-4 h-4 mr-3 text-zinc-500" />
                                    HQ Plan 0 (Lager)
                                </span>
                                <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-white transition-colors" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

