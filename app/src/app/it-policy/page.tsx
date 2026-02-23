import { Shield, FileText, CheckCircle } from "lucide-react";

export default function ITPolicyPage() {
    return (
        <div className="p-4 md:p-8 space-y-8 w-full max-w-4xl mx-auto animate-in fade-in duration-700">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 flex items-center">
                    <Shield className="w-8 h-8 mr-3 text-sky-400" />
                    IT-Policy
                </h2>
                <p className="text-zinc-400">Skyddsprodukter i Sverige AB:s information, system och utrustning.</p>
            </div>

            <div className="bg-[#111] border border-[#222] rounded-3xl overflow-hidden shadow-2xl">
                {/* Meta data header */}
                <div className="bg-[#151515] border-b border-[#222] p-6 grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                    <div>
                        <p className="text-zinc-500 mb-1 font-medium">Typ</p>>
                        <p className="text-white font-semibold flex items-center">
                            <FileText className="w-4 h-4 mr-2 text-zinc-400" />
                            Policy
                        </p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1 font-medium">Datum</p>
                        <p className="text-white font-semibold">2025-02-16</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1 font-medium">Version</p>
                        <p className="text-white font-semibold">1.0</p>
                    </div>
                    <div>
                        <p className="text-zinc-500 mb-1 font-medium">Författare</p>
                        <p className="text-white font-semibold">Fredrik Beckman</p>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-10 space-y-8 text-zinc-300 leading-relaxed text-[15px]">

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">1</span>
                            Syfte
                        </h3>
                        <p className="pl-10 text-zinc-400">Denna IT-policy syftar till att skydda Skyddsprodukter i Sverige AB:s information, system, utrustning och anseende samt att tydliggöra den enskildes ansvar vid användning av företagets IT-resurser.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">2</span>
                            Tillämpningsområde
                        </h3>
                        <p className="pl-10 text-zinc-400">Policyn gäller all användning av företagets IT-system, programvara, konton, nätverk, information samt privat utrustning som används i tjänsten.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">3</span>
                            Ansvar och åtagande
                        </h3>
                        <p className="pl-10 text-zinc-400">Genom undertecknande intygar jag att jag tagit del av och förbinder mig att följa denna policy.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">4</span>
                            Inloggning och åtkomst
                        </h3>
                        <p className="pl-10 text-zinc-400">Inloggningsuppgifter är personliga och får inte delas, med undantag för systemadministratör eller av denne godkänd person vid support.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">5</span>
                            Hantering av företagsinformation
                        </h3>
                        <p className="pl-10 text-zinc-400">Företagsinformation ska hanteras med omsorg, inte spridas externt utan godkännande och återlämnas eller raderas vid anställningens upphörande.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">6</span>
                            Lagring och säkerhet
                        </h3>
                        <p className="pl-10 text-zinc-400">All information ska lagras i godkända system. Kryptering, komplexa lösenord och antivirus ska användas.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">7</span>
                            Privat utrustning
                        </h3>
                        <p className="pl-10 text-zinc-400">Företagsinformation får inte lagras lokalt eller sparas på privat utrustning.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">8</span>
                            Hårdvara
                        </h3>
                        <p className="pl-10 text-zinc-400">Företagets utrustning ska hanteras varsamt och inte lämnas obevakad eller synlig.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">9</span>
                            Otillåten användning
                        </h3>
                        <p className="pl-10 text-zinc-400">Utrustning och system får inte användas för stötande, politiskt eller olagligt innehåll.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">10</span>
                            Incidentrapportering
                        </h3>
                        <p className="pl-10 text-zinc-400">Informationsincidenter ska omedelbart rapporteras till närmaste chef.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">11</span>
                            Privat användning
                        </h3>
                        <p className="pl-10 text-zinc-400">Begränsad privat användning är tillåten så länge säkerhet och arbete inte påverkas.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">12</span>
                            Programvara
                        </h3>
                        <p className="pl-10 text-zinc-400">Installation av annan programvara kräver godkännande från närmaste chef.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">13</span>
                            Sekretess och lojalitet
                        </h3>
                        <p className="pl-10 text-zinc-400">Sekretess- och lojalitetspolicy ska alltid följas.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">14</span>
                            AI-verktyg
                        </h3>
                        <p className="pl-10 text-zinc-400">Vid användning av AI ska denna policy följas. Användning av AI för företagets och den personliga utvecklingen på jobbet och som arbetsredskap uppmuntras. Av företaget tillhandahållna konton ska användas i tjänsten. Användning av privata konton är inte tillåtet.</p>
                    </section>

                    <section>
                        <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                            <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 w-7 h-7 rounded-full flex items-center justify-center mr-3 text-sm font-bold shadow-sm">15</span>
                            E-post och länkar
                        </h3>
                        <p className="pl-10 text-zinc-400">Misstänkta mejl och länkar ska rapporteras.</p>
                    </section>

                </div>
            </div>

            <div className="flex justify-end pt-2 pb-8">
                <div className="flex items-center text-emerald-400 bg-emerald-500/10 px-5 py-3 rounded-2xl border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                    <CheckCircle className="w-5 h-5 mr-3" />
                    <span className="text-sm font-semibold tracking-wide">Undertecknad av samtlig personal</span>
                </div>
            </div>
        </div>
    );
}
