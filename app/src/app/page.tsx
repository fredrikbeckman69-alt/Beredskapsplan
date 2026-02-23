import { IntelligenceFeed } from "@/components/intelligence-feed";
import { VMAStatusBadge } from "@/components/VMAStatusBadge";
import {
  AlertTriangle,
  CheckCircle2,
  Fuel,
  Users
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 w-full animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-2">Beredskapsläge</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-medium">Överblick av systemstatus och externa larm.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <VMAStatusBadge />
          <div className="flex items-center px-5 py-2.5 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 backdrop-blur-md shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-5 h-5 mr-2" />
            <span className="text-sm font-semibold tracking-wide">System Status: Normal</span>
          </div>
          <button className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white px-8 py-3 rounded-2xl font-bold shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all flex items-center justify-center hover:scale-105 active:scale-95">
            <AlertTriangle className="w-6 h-6 mr-3" />
            <span className="tracking-widest">LARM</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Intelligence Card */}
        <IntelligenceFeed />

        {/* Resources & Setup */}
        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                <Fuel className="w-6 h-6 mr-3 text-orange-400" />
                Uthållighet
              </h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-zinc-300 font-medium tracking-wide">Diesel (Reservkraft)</span>
                    <span className="font-bold text-white text-lg">450 / 500 L</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[90%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-zinc-300 font-medium tracking-wide">Gasol</span>
                    <span className="font-bold text-white text-lg">80%</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[80%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                <Users className="w-6 h-6 mr-3 text-violet-400" />
                Krisledning (Jour)
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white flex items-center justify-center font-bold text-sm mr-4 shadow-lg">TR</div>
                    <div>
                      <p className="font-semibold text-white">Tore Robertsson</p>
                      <p className="text-sm text-zinc-400">VD / Högsta ansvar</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-sm mr-4 border border-zinc-600">FB</div>
                    <div>
                      <p className="font-semibold text-white">Fredrik Beckman</p>
                      <p className="text-sm text-zinc-400">Beredskapsledare</p>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
