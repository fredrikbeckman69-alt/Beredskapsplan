import { RadioTower, Inbox } from "lucide-react";

export default function LogsPage() {
    // I en framtida implementation kommer dessa hämtas från en databas eller ett state
    const events: any[] = [];

    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-4xl mx-auto animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 flex items-center">
                    <RadioTower className="w-8 h-8 mr-3 text-emerald-400" />
                    Händelselogg
                </h2>
                <p className="text-zinc-400">Översikt över alla händelser i systemet och aktiverade åtgärder.</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center text-center">
                {events.length === 0 ? (
                    <div className="flex flex-col items-center max-w-sm mx-auto space-y-4">
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-2 shadow-[0_0_30px_rgba(16,185,129,0.1)] border border-emerald-500/20">
                            <Inbox className="w-10 h-10 text-emerald-400 opacity-80" />
                        </div>
                        <h3 className="text-xl font-semibold text-white">Inga händelser har inträffat</h3>
                        <p className="text-zinc-400 leading-relaxed text-[15px]">
                            Loggen är för närvarande tom. När åtgärdskort aktiveras, systemlarm uppstår eller andra viktiga händelser registreras kommer de att visas här.
                        </p>
                    </div>
                ) : (
                    <div className="w-full space-y-4">
                        {/* Här renderas händelser framöver */}
                    </div>
                )}
            </div>
        </div>
    );
}
