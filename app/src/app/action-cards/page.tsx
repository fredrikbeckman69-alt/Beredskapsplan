"use client";

import { useState } from "react";
import { ListChecks, Clock, User, ShieldAlert, ChevronDown, CheckCircle2, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Types for our data structure
type Task = {
    id: string;
    title: string;
    responsible: string;
    completed: boolean;
    scenarios: string[]; // Added scenario filtering
};

type Phase = {
    id: number;
    title: string;
    duration: string;
    icon: React.ElementType;
    colorClass: string;
    bgClass: string;
    solidBgClass: string;
    borderClass: string;
    tasks: Task[];
};

// Available Scenarios
const scenariosList = [
    { id: "all", label: "Generellt Krisläge" },
    { id: "power", label: "Långvarigt Strömavbrott" },
    { id: "cyber", label: "IT-haveri / Ransomware" },
    { id: "facility", label: "Skalskydd Hotat / Inbrott" },
];

// Complete data for all phases
const initialPhases: Phase[] = [
    {
        id: 1,
        title: "Fas 1",
        duration: "0-6 timmar",
        icon: Clock,
        colorClass: "text-blue-400",
        bgClass: "bg-blue-500/20",
        solidBgClass: "bg-blue-500",
        borderClass: "border-blue-500",
        tasks: [
            { id: "1-1", title: "Kalla in Krisledningsgruppen", responsible: "VD", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "1-2", title: "Säkra larm och fysiskt skalskydd", responsible: "Beredskapsledare (Fysisk Miljö)", completed: false, scenarios: ["all", "power", "facility"] },
            { id: "1-3", title: "Uppdatera personal om läget", responsible: "Affärsstöd/HR", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "1-4", title: "Initial skadebedömning", responsible: "Driftchef", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "1-5", title: "Säkra IT-miljö och data", responsible: "IT-ansvarig", completed: false, scenarios: ["all", "cyber", "power"] },
            { id: "1-6", title: "Kontakta berörda myndigheter vid behov", responsible: "VD / Beredskapsledare", completed: false, scenarios: ["all", "facility", "cyber"] },
            { id: "1-7", title: "Informera styrelsen", responsible: "VD", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "1-8", title: "Upprätta kommunikationsplan (intern/extern)", responsible: "Kommunikationsansvarig", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
        ]
    },
    {
        id: 2,
        title: "Fas 2",
        duration: "6-24 timmar",
        icon: AlertTriangle,
        colorClass: "text-amber-400",
        bgClass: "bg-amber-500/20",
        solidBgClass: "bg-amber-500",
        borderClass: "border-amber-500",
        tasks: [
            { id: "2-1", title: "Hantera leverantörskommunikation", responsible: "Supply Chain", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "2-2", title: "Utvärdera behov av externt stöd (PR, juridik)", responsible: "VD / Kommunikationsansvarig", completed: false, scenarios: ["all", "cyber", "facility"] },
            { id: "2-3", title: "Planera för skiftgång i krisledningen", responsible: "HR / Beredskapsledare", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "2-4", title: "Säkerställ likviditet och ekonomiska åtgärder", responsible: "CFO", completed: false, scenarios: ["all", "cyber"] },
            { id: "2-5", title: "Informera nyckelkunder", responsible: "Försäljningschef", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
            { id: "2-6", title: "Uppdatera skadebedömning och prognos", responsible: "Driftchef / Beredskapsledare", completed: false, scenarios: ["all", "power", "cyber", "facility"] },
        ]
    },
    {
        id: 3,
        title: "Fas 3",
        duration: "24-72 timmar",
        icon: ShieldAlert,
        colorClass: "text-rose-400",
        bgClass: "bg-rose-500/20",
        solidBgClass: "bg-rose-500",
        borderClass: "border-rose-500",
        tasks: [
            { id: "3-1", title: "Planera för återgång till normalläge (Recovery)", responsible: "Beredskapsledare", completed: false },
            { id: "3-2", title: "Genomför djupgående teknisk/operationell analys", responsible: "IT / Driftchef", completed: false },
            { id: "3-3", title: "Utvärdera psykosocialt stöd för personal", responsible: "HR", completed: false },
            { id: "3-4", title: "Sammanställ initial dokumentation och loggar", responsible: "Beredskapsledare", completed: false },
            { id: "3-5", title: "Kommunicera långsiktig plan externt", responsible: "VD / Kommunikationsansvarig", completed: false },
        ]
    }
];

export default function ActionCardsPage() {
    const [phases, setPhases] = useState<Phase[]>(initialPhases);
    const [expandedPhaseId, setExpandedPhaseId] = useState<number | null>(1); // Default Fas 1 open

    const toggleTask = (phaseId: number, taskId: string) => {
        setPhases(currentPhases =>
            currentPhases.map(phase => {
                if (phase.id === phaseId) {
                    return {
                        ...phase,
                        tasks: phase.tasks.map(task =>
                            task.id === taskId ? { ...task, completed: !task.completed } : task
                        )
                    };
                }
                return phase;
            })
        );
    };

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-7xl mx-auto">
            <div className="flex flex-col mb-8">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3 flex items-center">
                    <ListChecks className="w-8 h-8 text-blue-500 mr-4" />
                    Åtgärdskort
                </h2>
                <p className="text-zinc-400 text-lg max-w-2xl">
                    Tidsbaserade checklistor (0-6h, 6-24h, 24-72h) för krisledningen.
                    Klicka på en fas för att expandera och se alla tillhörande uppgifter.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                {phases.map((phase) => {
                    const isExpanded = expandedPhaseId === phase.id;
                    const completedTasks = phase.tasks.filter(t => t.completed).length;
                    const totalTasks = phase.tasks.length;
                    const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
                    const PhaseIcon = phase.icon;

                    return (
                        <motion.div
                            key={phase.id}
                            layout
                            className={`flex flex-col rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded
                                ? 'bg-[#111] border-zinc-700 shadow-xl shadow-black ring-1 ring-white/5'
                                : 'bg-[#111] border-zinc-800/80 hover:bg-[#151515] hover:border-zinc-700 cursor-pointer opacity-80 hover:opacity-100'
                                }`}
                            onClick={() => !isExpanded && setExpandedPhaseId(phase.id)}
                        >
                            {/* Card Header */}
                            <div className="p-6 relative overflow-hidden group">
                                {/* Background glow effect */}
                                <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-opacity duration-500 ${isExpanded ? phase.solidBgClass : 'opacity-0'}`} />

                                <div className="relative z-10 w-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className={`text-2xl font-bold flex items-center ${isExpanded ? phase.colorClass : 'text-zinc-300'}`}>
                                            <PhaseIcon className={`w-7 h-7 mr-3 drop-shadow-sm transition-colors ${isExpanded ? phase.colorClass : 'text-zinc-500'}`} />
                                            <span className={`${isExpanded ? phase.bgClass : 'bg-black'} ${isExpanded ? phase.colorClass : 'text-zinc-500 border border-white/5'} px-2.5 py-1 rounded-md text-sm font-semibold mr-3 tracking-wide uppercase`}>
                                                {phase.title}
                                            </span>
                                            {phase.duration}
                                        </h3>

                                        {/* Expand Toggle */}
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setExpandedPhaseId(isExpanded ? null : phase.id);
                                            }}
                                            className={`p-2 rounded-full transition-colors ${isExpanded ? 'bg-white/5 hover:bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300 bg-white/5'}`}
                                            aria-label={isExpanded ? "Collapse phase" : "Expand phase"}
                                        >
                                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>

                                    {/* Progress bar */}
                                    <div className="mt-6 w-full pr-2">
                                        <div className="flex justify-between text-sm font-medium mb-3">
                                            <span className="text-zinc-400">Avklarat</span>
                                            <span className={isExpanded ? phase.colorClass : 'text-zinc-500'}>{completedTasks} av {totalTasks}</span>
                                        </div>
                                        <div className="h-2 w-full bg-black/50 border border-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className={`h-full rounded-full ${isExpanded ? phase.solidBgClass : 'bg-zinc-600'}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Task List */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 pt-2 space-y-3">
                                            {phase.tasks.map((task) => (
                                                <label
                                                    key={task.id}
                                                    className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${task.completed
                                                        ? 'bg-black/30 border-white/5 hover:bg-black/40'
                                                        : 'bg-black/50 border-white/10 hover:border-white/20 hover:bg-black/60 shadow-sm'
                                                        }`}
                                                >
                                                    <div className="relative flex items-center justify-center mt-0.5">
                                                        <input
                                                            type="checkbox"
                                                            checked={task.completed}
                                                            onChange={() => toggleTask(phase.id, task.id)}
                                                            className="peer sr-only"
                                                        />
                                                        <div className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${task.completed
                                                            ? `${phase.solidBgClass} ${phase.borderClass} text-white`
                                                            : 'border-zinc-600 bg-zinc-900 text-transparent hover:border-zinc-500'
                                                            }`}>
                                                            {task.completed && <CheckCircle2 className="w-4 h-4" strokeWidth={3} />}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`font-medium text-sm sm:text-base leading-snug transition-colors ${task.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'
                                                            }`}>
                                                            {task.title}
                                                        </p>
                                                        <div className={`flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs font-medium ${task.completed ? 'text-zinc-600' : 'text-zinc-400'
                                                            }`}>
                                                            <span className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded border border-white/5">
                                                                <User className="w-3 h-3" />
                                                                {task.responsible}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
