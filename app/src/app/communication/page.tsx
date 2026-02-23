"use client";

import { useState } from "react";
import { MessageSquareWarning, Users, FileText, Send, Copy, CheckCircle2 } from "lucide-react";

type TargetGroup = {
    id: string;
    name: string;
    description: string;
    channel: string;
    responsibility: string;
};

type HoldingStatement = {
    id: string;
    scenario: string;
    audience: string;
    content: string;
};

const targetGroups: TargetGroup[] = [
    { id: "TG1", name: "Egen Personal", description: "Samtliga anställda och konsulter.", channel: "Intranät / SMS", responsibility: "HR / VD" },
    { id: "TG2", name: "Nyckelkunder", description: "Kunder med kritiska SLA-avtal.", channel: "Telefon / Dedikerat Mail", responsibility: "Key Account Managers" },
    { id: "TG3", name: "Media / Allmänhet", description: "Lokaltidningar och branschpress.", channel: "Pressmeddelande / Hemsida", responsibility: "Kommunikationschef" },
    { id: "TG4", name: "Myndigheter", description: "Länsstyrelse, MSB, Polisen (vid behov).", channel: "Telefon / Säker Mail", responsibility: "VD / Säkerhetschef" },
];

const statements: HoldingStatement[] = [
    {
        id: "HS1",
        scenario: "IT-störning / Cyberattack",
        audience: "Kunder",
        content: "Vi upplever för närvarande tekniska störningar i våra system vilket påverkar vår leveransförmåga. Våra tekniker arbetar skyndsamt med att felsöka och åtgärda problemet. Vi beklagar de besvär detta medför och återkommer med uppdatering så snart vi har mer information. Vid akuta ärenden, vänligen kontakta vår nödtelefon på [Nummer]."
    },
    {
        id: "HS2",
        scenario: "Allvarlig Arbetsplatsolycka",
        audience: "Media",
        content: "En allvarlig incident har inträffat vid vår anläggning i [Ort] under [Tidpunkt]. Räddningstjänst och ambulans är på plats. Vår absoluta prioritet just nu är att ta hand om vår personal och underlätta för räddningsarbetet. Vi har aktiverat vår krisgrupp och kommer att hålla en pressträff kl [Tid] för att ge mer information."
    },
    {
        id: "HS3",
        scenario: "Brand / Utrymning",
        audience: "Personal",
        content: "Viktigt meddelande: Vänligen beakta att anläggningen i [Ort] måste utrymmas omedelbart med anledning av rökutveckling. Följ utrymningsledarnas instruktioner och ta er till återsamlingsplats [Plats]. Gå ej tillbaka in i byggnaden förrän klartecken har getts av Räddningstjänsten."
    }
];

export default function CommunicationPage() {
    const [activeTab, setActiveTab] = useState<"groups" | "statements">("groups");
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                        <MessageSquareWarning className="w-8 h-8 text-fuchsia-500 mr-4" />
                        Kriskommunikation
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Hantera målgrupper och fördefinierade mallar (Holding Statements) för att säkerställa snabb och enhetlig kommunikation vid en incident.
                    </p>
                </div>
                <button className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center shadow-lg shadow-fuchsia-500/20 w-fit">
                    <Send className="w-4 h-4 mr-2" />
                    Skicka Meddelande
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800">
                <button
                    onClick={() => setActiveTab("groups")}
                    className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === "groups" ? "border-fuchsia-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
                >
                    <Users className="w-4 h-4" />
                    Målgrupper & Kanaler
                </button>
                <button
                    onClick={() => setActiveTab("statements")}
                    className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === "statements" ? "border-fuchsia-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
                >
                    <FileText className="w-4 h-4" />
                    Holding Statements (Mallar)
                </button>
            </div>

            {/* Content */}
            {activeTab === "groups" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {targetGroups.map(group => (
                        <div key={group.id} className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:bg-[#151515] transition-colors relative group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800 group-hover:bg-fuchsia-500 transition-colors rounded-l-2xl"></div>
                            <h3 className="text-xl font-bold text-white mb-2">{group.name}</h3>
                            <p className="text-zinc-400 text-sm mb-6">{group.description}</p>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                                    <span className="block text-xs text-zinc-500 mb-1">Primär Kanal</span>
                                    <span className="text-zinc-200 font-medium">{group.channel}</span>
                                </div>
                                <div className="bg-black/30 p-3 rounded-lg border border-white/5">
                                    <span className="block text-xs text-zinc-500 mb-1">Ansvarig</span>
                                    <span className="text-zinc-200 font-medium">{group.responsibility}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === "statements" && (
                <div className="space-y-6">
                    <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl p-6 text-fuchsia-200 mb-6">
                        <h4 className="font-semibold text-fuchsia-400 mb-2">Vikten av Holding Statements</h4>
                        <p className="text-sm border-l-2 border-fuchsia-500/50 pl-4 py-1">Ett holding statement är ett förskrivet pressmeddelande/uttalande. Det låter er kommunicera snabbt och professionellt ("Vi är medvetna om problemet och hanterar det") för att vinna tid att undersöka saken närmare, utan att lova för mycket i ett tidigt skede.</p>
                    </div>

                    <div className="grid gap-6">
                        {statements.map(statement => (
                            <div key={statement.id} className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden">
                                <div className="bg-[#151515] border-b border-[#222] p-4 flex justify-between items-center">
                                    <div>
                                        <span className="text-xs font-bold text-fuchsia-500 uppercase tracking-wider mb-1 block">Scenario: {statement.scenario}</span>
                                        <h3 className="text-lg font-medium text-white">Målgrupp: {statement.audience}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(statement.content, statement.id)}
                                        className="p-2 bg-black/50 hover:bg-white/10 text-zinc-400 hover:text-white rounded-lg transition-colors border border-[#333]"
                                        title="Kopiera text"
                                    >
                                        {copiedId === statement.id ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                                    </button>
                                </div>
                                <div className="p-6">
                                    <div className="bg-black/40 p-4 rounded-xl border border-zinc-800 font-serif text-zinc-300 leading-relaxed italic relative">
                                        <span className="absolute top-2 left-2 text-4xl text-zinc-800 font-serif leading-none">"</span>
                                        <p className="relative z-10 px-4">{statement.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
