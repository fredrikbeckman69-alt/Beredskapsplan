import { Settings } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 w-full animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-2">Inställningar</h2>
                    <p className="text-zinc-400 text-lg md:text-xl font-medium">Hantera systemets inställningar (Kommande funktion).</p>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden relative group text-center flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-20 h-20 rounded-full mb-6 bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center shadow-lg border border-white/5">
                    <Settings className="w-10 h-10 text-zinc-400 animate-[spin_4s_linear_infinite]" />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4">Under utveckling</h3>
                <p className="text-zinc-400 max-w-md mx-auto text-lg leading-relaxed">
                    Inställningssidan byggs just nu. Här kommer du framöver kunna hantera applikationsspecifika inställningar, notiser och användarpreferenser.
                </p>
                <div className="mt-8 inline-flex items-center space-x-2 text-sm text-zinc-500 bg-black/40 px-4 py-2 rounded-full border border-white/5">
                    <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                    <span>Arbete pågår</span>
                </div>
            </div>
        </div>
    );
}
