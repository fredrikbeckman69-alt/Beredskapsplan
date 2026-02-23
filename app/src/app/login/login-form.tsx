"use client";

import { useState } from "react";
import { Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";

import { useRouter } from "next/navigation";

export function LoginForm() {
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            // Simulate small delay for better UX
            await new Promise(resolve => setTimeout(resolve, 500));

            if (code === "68092659") {
                localStorage.setItem("beredskapsplan_access", "68092659");
                router.replace("/");
            } else {
                setError("Felaktig kod. Vänligen försök igen.");
                setCode("");
            }
        } catch (err) {
            setError("Något gick fel. Försök igen.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-zinc-400 group-focus-within:text-white transition-colors" />
                </div>
                <input
                    type="password"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ange inmatningskod"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-white/20 focus:bg-white/10 transition-all font-medium tracking-wide placeholder:text-zinc-500"
                    required
                    autoFocus
                />
            </div>

            {error && (
                <div className="flex items-center text-red-400 text-sm font-medium animate-in slide-in-from-top-1 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || !code}
                className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:hover:bg-white py-3.5 rounded-2xl font-bold transition-all flex items-center justify-center group"
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <>
                        <span>Bekräfta Åtkomst</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
}
