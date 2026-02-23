import Image from "next/image";
import { LoginForm } from "./login-form";
import logoSrc from "../../../public/logo.png";
import logoRoccSrc from "../../../public/logo-rocc.png";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background glowing orbs - matched with main layout for consistency */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 bg-purple-600 animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 bg-blue-500 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 bg-pink-500 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-md animate-in fade-in zoom-in duration-700">
                <div className="bg-black/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Logos */}
                        <div className="flex items-center justify-center gap-6 mb-10 w-full px-4">
                            <div className="relative w-32 h-16 flex items-center justify-center drop-shadow-lg">
                                <Image
                                    src={logoSrc}
                                    alt="Skyddsprodukter Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="h-10 w-px bg-white/20"></div>
                            <div className="relative w-32 h-16 flex items-center justify-center drop-shadow-lg">
                                <Image
                                    src={logoRoccSrc}
                                    alt="ROCC Group Logo"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white drop-shadow-sm mb-3">
                                Åtkomst Krävs
                            </h1>
                            <p className="text-zinc-400 text-sm md:text-base font-medium leading-relaxed">
                                Test av beredskapsplan <br />
                                <span className="text-white">Skyddsprodukter i Sverige AB</span> <br />
                                i samarbete med <span className="text-white">ROCC Group</span>.
                            </p>
                        </div>

                        <LoginForm />

                    </div>
                </div>
            </div>
        </div>
    );
}
