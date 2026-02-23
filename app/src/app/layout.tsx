import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beredskapsplan för [SysInf]",
  description: "Digital Business Continuity Plan & Krisberedskap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="dark">
      <body className={`${inter.className} bg-black text-white antialiased min-h-screen relative overflow-hidden selection:bg-white/30`}>
        {/* Background glowing orbs */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 bg-purple-600 animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 bg-blue-500 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[100px] opacity-30 bg-pink-500 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex h-screen w-full">
          {/* Glassmorphic Sidebar */}
          <div className="hidden md:flex md:w-72 flex-col h-full border-r border-white/10 bg-black/40 backdrop-blur-xl">
            <Sidebar />
          </div>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto w-full h-full pb-20 md:pb-0">
            <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto h-full">
              {children}
            </div>
          </main>

          {/* Mobile Bottom Navigation (Sidebar rendered here on small screens) */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50  border-t border-white/10 bg-black/60 backdrop-blur-xl pb-safe">
            <Sidebar mobile />
          </div>
        </div>
      </body>
    </html>
  );
}
