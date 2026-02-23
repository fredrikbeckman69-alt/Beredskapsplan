"use client";

import { useState } from "react";
import { GraduationCap, CalendarDays, ClipboardCheck, Play, ArrowRight, CheckCircle2 } from "lucide-react";

type Exercise = {
    id: string;
    title: string;
    type: "tabletop" | "live" | "drill";
    date: string;
    status: "planned" | "completed" | "overdue";
    owner: string;
};

type LessonLearned = {
    id: string;
    incident: string;
    date: string;
    finding: string;
    actionItem: string;
    status: "open" | "in-progress" | "resolved";
};

const exercises: Exercise[] = [
    { id: "E1", title: "Skalskydd & Inpassering", type: "drill", date: "2026-03-15", status: "planned", owner: "Beredskapsledare (Fysisk Miljö)" },
    { id: "E2", title: "IT-system nere (Ransomware)", type: "tabletop", date: "2026-05-20", status: "planned", owner: "IT-ansvarig" },
    { id: "E3", title: "Långvarigt strömavbrott - Verifiering reservkraft", type: "live", date: "2025-11-04", status: "completed", owner: "Driftchef" },
    { id: "E4", title: "Brand i anslutande lokal", type: "tabletop", date: "2025-09-12", status: "completed", owner: "VD" },
];

const lessons: LessonLearned[] = [
    { id: "LL1", incident: "Övning: Långvarigt strömavbrott", date: "2025-11-05", finding: "Startbatteri till dieselgenerator var urladdat.", actionItem: "Inför månatlig kontroll av startbatteri.", status: "resolved" },
    { id: "LL2", incident: "Övning: Långvarigt strömavbrott", date: "2025-11-05", finding: "Personal visste inte var manuell loggbok fanns.", actionItem: "Placera 'Emergency Kit' tydligt utmärkt på alla avdelningar.", status: "in-progress" },
    { id: "LL3", incident: "Incident: Nätverksavbrott 2h", date: "2025-08-22", finding: "Reserv-router 4G saknade aktivt SIM-kort.", actionItem: "Teckna nytt M2M abonnemang för reserv-routrar.", status: "resolved" },
];

export default function ExercisesPage() {
    const [activeTab, setActiveTab] = useState<"exercises" | "lessons">("exercises");

    const getStatusBadge = (status: Exercise["status"] | LessonLearned["status"]) => {
        switch (status) {
            case "completed":
            case "resolved":
                return <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-1 rounded text-xs font-semibold">Klar / Åtgärdad</span>;
            case "planned":
                return <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded text-xs font-semibold">Planerad</span>;
            case "in-progress":
                return <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2.5 py-1 rounded text-xs font-semibold">Pågående</span>;
            case "overdue":
            case "open":
                return <span className="bg-red-500/10 text-red-500 border border-red-500/20 px-2.5 py-1 rounded text-xs font-semibold">Öppen / Försenad</span>;
            default:
                return null;
        }
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-6xl mx-auto animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                        <GraduationCap className="w-8 h-8 text-sky-500 mr-4" />
                        Övning & Lärdomar
                    </h2>
                    <p className="text-zinc-400 text-lg max-w-2xl">
                        Årshjul för krisövningar och uppföljning av erfarenheter (Lessons Learned) från incidenter och övningar.
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800">
                <button
                    onClick={() => setActiveTab("exercises")}
                    className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === "exercises" ? "border-sky-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
                >
                    <CalendarDays className="w-4 h-4" />
                    Övningsplan (Årshjul)
                </button>
                <button
                    onClick={() => setActiveTab("lessons")}
                    className={`px-6 py-4 font-medium text-sm flex items-center gap-2 border-b-2 transition-colors ${activeTab === "lessons" ? "border-sky-500 text-white" : "border-transparent text-zinc-500 hover:text-zinc-300"}`}
                >
                    <ClipboardCheck className="w-4 h-4" />
                    Erfarenhetsåterföring
                </button>
            </div>

            {/* Content */}
            {activeTab === "exercises" && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-[#111] p-4 rounded-xl border border-[#222]">
                        <p className="text-zinc-400 text-sm">Nästa övning infaller om <strong className="text-white">20 dagar</strong></p>
                        <button className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center">
                            <Play className="w-4 h-4 mr-2" />
                            Planera ny övning
                        </button>
                    </div>

                    <div className="grid gap-4">
                        {exercises.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(ex => (
                            <div key={ex.id} className="bg-[#111] border border-[#222] p-6 rounded-2xl hover:bg-[#151515] transition-colors flex flex-col md:flex-row gap-6 md:items-center">
                                <div className="bg-black/40 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center min-w-[100px] shrink-0">
                                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">
                                        {new Date(ex.date).toLocaleDateString('sv-SE', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-black text-white">
                                        {new Date(ex.date).getDate()}
                                    </span>
                                    <span className="text-zinc-600 text-xs mt-1">
                                        {new Date(ex.date).getFullYear()}
                                    </span>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="text-xl font-semibold text-white">{ex.title}</h3>
                                        {getStatusBadge(ex.status)}
                                    </div>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400 mt-3">
                                        <span className="flex items-center gap-2">
                                            <strong className="text-zinc-300 font-medium">Typ:</strong>
                                            <span className="capitalize">{ex.type}</span>
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <strong className="text-zinc-300 font-medium">Ansvarig:</strong>
                                            {ex.owner}
                                        </span>
                                    </div>
                                </div>
                                <button className="self-start md:self-center shrink-0 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                                    <ArrowRight className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === "lessons" && (
                <div className="space-y-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6 text-blue-200">
                        <h4 className="font-semibold text-blue-400 mb-2 flex items-center">
                            <ClipboardCheck className="w-5 h-5 mr-2" />
                            Ständig Förbättring (PDCA-Cykeln)
                        </h4>
                        <p className="text-sm">Dokumentera brister och lärdomar från övningar och verkliga händelser här. Varje insikt bör resultera i en konkret åtgärd för att stärka beredskapsplanen infor framtiden.</p>
                    </div>

                    <div className="grid gap-4">
                        {lessons.map(lesson => (
                            <div key={lesson.id} className="bg-[#111] border border-[#222] p-6 rounded-2xl relative overflow-hidden group">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800 group-hover:bg-sky-500 transition-colors"></div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-medium text-zinc-500 block mb-1">{lesson.date} &bull; {lesson.incident}</span>
                                        <h3 className="text-lg font-medium text-zinc-200">{lesson.finding}</h3>
                                    </div>
                                    {getStatusBadge(lesson.status)}
                                </div>

                                <div className="bg-black/50 border border-zinc-800 rounded-lg p-4 mt-4">
                                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 flex items-center">
                                        <CheckCircle2 className="w-4 h-4 mr-2" />
                                        Föreslagen Åtgärd / Beslut
                                    </h4>
                                    <p className="text-zinc-300 text-sm">{lesson.actionItem}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}

