"use client";

import { useState } from "react";
import { Users } from "lucide-react";

type JourPerson = {
    id: string;
    initials: string;
    name: string;
    role: string;
    initialsClass: string;
};

export function CrisisManagementJour() {
    const [activeJourId, setActiveJourId] = useState<string>("TR");

    const people: JourPerson[] = [
        {
            id: "TR",
            initials: "TR",
            name: "Tore Robertsson",
            role: "VD / Högsta ansvar",
            initialsClass: "bg-gradient-to-br from-[#3AA3E0] to-[#027DC2] text-white shadow-lg border border-white/10",
        },
        {
            id: "FB",
            initials: "FB",
            name: "Fredrik Beckman",
            role: "Beredskapsledare",
            initialsClass: "bg-[#1A2F2D] text-zinc-300 border border-[#3AA3E0]/20",
        },
    ];

    return (
        <div className="bg-[#2B4645]/80 border border-[#3AA3E0]/10 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3AA3E0]/10 via-transparent to-transparent opacity-50 transition-opacity duration-500"></div>
            <div className="relative z-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                    <Users className="w-6 h-6 mr-3 text-[#3AA3E0]" />
                    Krisledning (Jour)
                </h3>
                <div className="space-y-4">
                    {people.map((person) => {
                        const isActive = activeJourId === person.id;
                        return (
                            <div
                                key={person.id}
                                onClick={() => setActiveJourId(person.id)}
                                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${isActive
                                        ? "bg-[#3AA3E0]/10 border-[#3AA3E0]/40 shadow-[0_4px_20px_rgba(58,163,224,0.15)]"
                                        : "bg-black/20 border-white/5 hover:bg-black/40 hover:border-white/10"
                                    }`}
                            >
                                <div className="flex items-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${person.initialsClass}`}>
                                        {person.initials}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">{person.name}</p>
                                        <p className="text-sm text-zinc-400">{person.role}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    {!isActive && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveJourId(person.id);
                                            }}
                                            className="text-[10px] md:text-xs uppercase tracking-wider text-zinc-400 hover:text-emerald-400 font-semibold px-2 py-1 rounded-md bg-white/5 hover:bg-emerald-500/10 transition-colors"
                                        >
                                            Kliv på jour
                                        </button>
                                    )}
                                    {isActive && (
                                        <span className="text-[10px] md:text-xs uppercase tracking-wider text-emerald-400 font-semibold px-2 py-1">
                                            Aktiv jour
                                        </span>
                                    )}
                                    <div className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive
                                            ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                                            : "bg-zinc-600/50"
                                        }`}></div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
