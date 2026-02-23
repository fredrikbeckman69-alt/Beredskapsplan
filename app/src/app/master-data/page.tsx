import { Database, UserCheck, Phone, Cpu } from "lucide-react";

export default function MasterDataPage() {
    return (
        <div className="p-8 space-y-8 w-full max-w-6xl">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Beredskap & Master Data</h2>
                <p className="text-zinc-400">Hantera krisorganisation, resursregister och larmmottagare.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Krisledning */}
                <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
                    <div className="border-b border-[#222] bg-[#151515] px-6 py-4 flex items-center justify-between">
                        <h3 className="font-semibold flex items-center text-lg">
                            <UserCheck className="w-5 h-5 mr-3 text-violet-500" />
                            Krisledningsorganisation
                        </h3>
                        <button className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition">
                            Lägg till roll
                        </button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-zinc-500 uppercase bg-black/40 border-b border-[#222]">
                                <tr>
                                    <th className="px-6 py-3 font-medium">Roll</th>
                                    <th className="px-6 py-3 font-medium">Ordinarie</th>
                                    <th className="px-6 py-3 font-medium">Reserv</th>
                                    <th className="px-6 py-3 font-medium text-right">Åtgärd</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">VD</td>
                                    <td className="px-6 py-4 text-zinc-300">Tore Robertsson</td>
                                    <td className="px-6 py-4 text-zinc-500">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Beredskapsledare</td>
                                    <td className="px-6 py-4 text-zinc-300">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-zinc-500">Robert Trupp</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Logistikansvarig</td>
                                    <td className="px-6 py-4 text-zinc-300">Avdullah Veseli</td>
                                    <td className="px-6 py-4 text-zinc-500">Alexander Lavrov</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Personalchef</td>
                                    <td className="px-6 py-4 text-zinc-300">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-zinc-500">Tore Robertsson</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Kommunikationschef</td>
                                    <td className="px-6 py-4 text-zinc-300">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-zinc-500">Robert Trupp</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">IT-ansvarig</td>
                                    <td className="px-6 py-4 text-zinc-300">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-zinc-500">Lina Gustavsson</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="border-b border-[#222] hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Ekonomi</td>
                                    <td className="px-6 py-4 text-zinc-300">Eva Nilsson</td>
                                    <td className="px-6 py-4 text-zinc-500">BDO (Extern part)</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                                <tr className="hover:bg-white/5">
                                    <td className="px-6 py-4 font-medium text-white">Säkerhetschef</td>
                                    <td className="px-6 py-4 text-zinc-300">Robert Trupp</td>
                                    <td className="px-6 py-4 text-zinc-500">Fredrik Beckman</td>
                                    <td className="px-6 py-4 text-right"><span className="text-sky-500 hover:text-sky-400 cursor-pointer">Redigera</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Resurser */}
                <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
                    <div className="border-b border-[#222] bg-[#151515] px-6 py-4 flex items-center justify-between">
                        <h3 className="font-semibold flex items-center text-lg">
                            <Database className="w-5 h-5 mr-3 text-orange-500" />
                            Kritiska Resurser
                        </h3>
                        <button className="text-sm bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded transition">
                            Uppdatera saldon
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-[#222]">
                            <div className="flex flex-col">
                                <span className="font-medium text-white">Diesel för reservkraft</span>
                                <span className="text-xs text-zinc-500">Målsättning: 500 Liter</span>
                            </div>
                            <span className="text-emerald-500 font-bold">450 L</span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-black/40 rounded border border-[#222]">
                            <div className="flex flex-col">
                                <span className="font-medium text-white">Gasoltuber (Värme)</span>
                                <span className="text-xs text-zinc-500">Målsättning: 10 st P11</span>
                            </div>
                            <span className="text-emerald-500 font-bold">8 st</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
