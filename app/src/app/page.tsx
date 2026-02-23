import Image from "next/image";
import {
  AlertTriangle,
  CheckCircle2,
  Activity,
  Zap,
  CloudRain,
  Fuel,
  Users
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4 md:p-8 space-y-8 w-full animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="hidden md:flex relative w-16 h-16 opacity-80 shrink-0">
            <Image src="/logo-rocc.png" alt="ROCC Logo" fill className="object-contain" priority />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-sm mb-2">Beredskapsläge</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-medium">Överblick av systemstatus och externa larm.</p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
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
        <div className="col-span-1 lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl overflow-hidden relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-semibold flex items-center text-white">
                <Activity className="w-6 h-6 mr-3 text-sky-400" />
                Intelligence & Övervakning
              </h3>
              <span className="text-xs bg-white/10 text-white px-3 py-1 rounded-full uppercase font-bold tracking-widest flex items-center">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                Live
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-start p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                  <div className="p-3 bg-yellow-500/20 rounded-xl mr-4 sm:mr-0">
                    <Zap className="w-6 h-6 text-yellow-400" />
                  </div>
                  <span className="text-xs text-zinc-400 sm:hidden ml-auto">12 min sen</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">Downdetector: Möjlig störning Telia</h4>
                  <p className="text-zinc-400 mt-1 leading-relaxed">Ökad felrapportering senaste 15 minuterna. Påverkar mobilnät i södra Sverige.</p>
                </div>
                <span className="hidden sm:block text-xs text-zinc-500 font-medium ml-4 mt-1">12 min sen</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start p-5 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                  <div className="p-3 bg-blue-500/20 rounded-xl mr-4 sm:mr-0">
                    <CloudRain className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-xs text-zinc-400 sm:hidden ml-auto">2 h sen</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white text-lg">SMHI: Vädervarning Klass 2 (Gul)</h4>
                  <p className="text-zinc-400 mt-1 leading-relaxed">Kraftigt snöfall väntas under natten. Följ utvecklingen.</p>
                </div>
                <span className="hidden sm:block text-xs text-zinc-500 font-medium ml-4 mt-1">2 h sen</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-start p-5 bg-white/5 rounded-2xl border border-white/5 opacity-60">
                <div className="flex items-center mb-2 sm:mb-0 sm:mr-4">
                  <div className="p-3 bg-emerald-500/20 rounded-xl mr-4 sm:mr-0">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  </div>
                  <span className="text-xs text-zinc-400 sm:hidden ml-auto">Idag</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-zinc-300 text-lg">Trafikverket: Inga större störningar</h4>
                  <p className="text-zinc-500 mt-1 leading-relaxed">Normal framkomlighet på Europa/Riksvägar runt anläggningen.</p>
                </div>
                <span className="hidden sm:block text-xs text-zinc-600 font-medium ml-4 mt-1">Idag</span>
              </div>
            </div>
          </div>
        </div>

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
