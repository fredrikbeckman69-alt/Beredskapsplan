import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { VMABanner } from "@/components/VMABanner";
import type { Viewport } from "next";

import { AuthWrapper } from "@/components/AuthWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beredskapsplan för [SysInf]",
  description: "Digital Business Continuity Plan & Krisberedskap",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className="dark">
      <body className={`${inter.className} bg-[#1A2F2D] text-white antialiased min-h-screen relative overflow-hidden selection:bg-[#3AA3E0]/30`}>
        <AuthWrapper>
          <VMABanner />
          {/* Background glowing orbs */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[120px] opacity-20 bg-[#FD823D] animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full mix-blend-screen filter blur-[100px] opacity-20 bg-[#027DC2] animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[150px] opacity-20 bg-[#3AA3E0] animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 flex h-screen w-full">
            {/* Glassmorphic Sidebar */}
            <div className="hidden md:flex shrink-0 md:w-72 flex-col h-full border-r border-[#3AA3E0]/10 bg-[#2B4645]/80 backdrop-blur-xl shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
              <Sidebar />
            </div>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 overflow-y-auto w-full h-full pb-20 md:pb-0">
              <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto h-full">
                {children}
              </div>
            </main>

            {/* Mobile Bottom Navigation (Sidebar rendered here on small screens) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50  border-t border-white/10 bg-black/60 backdrop-blur-xl pb-safe">
              <Sidebar mobile />
            </div>
          </div>
        </AuthWrapper>
      </body>
    </html>
  );
}
