"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import logoSrc from "../../public/logo.png";
import logoRoccSrc from "../../public/logo-rocc.png";
import {
    ShieldAlert,
    LayoutDashboard,
    ListChecks,
    Users,
    Settings,
    LogOut,
    RadioTower,
    FileText
} from "lucide-react";

const routes = [
    {
        label: "Översiktsvy",
        icon: LayoutDashboard,
        href: "/",
        color: "text-[#3AA3E0]",
    },
    {
        label: "Åtgärdskort (Lathund)",
        icon: ListChecks,
        href: "/action-cards",
        color: "text-[#FD823D]",
    },
    {
        label: "Kontakter & Resurser",
        icon: Users,
        href: "/master-data",
        color: "text-[#3AA3E0]",
    },
    {
        label: "Händelselogg",
        icon: RadioTower,
        href: "/logs",
        color: "text-emerald-400",
    },
    {
        label: "IT Policy",
        icon: FileText,
        href: "/it-policy",
        color: "text-[#3AA3E0]",
    },
    {
        label: "Beredskap SMS",
        icon: ShieldAlert,
        href: "/sms-kris",
        color: "text-red-500",
    },
    {
        label: "Inställningar",
        icon: Settings,
        href: "/settings",
        color: "text-zinc-400",
    },
];

interface SidebarProps {
    mobile?: boolean;
}

export function Sidebar({ mobile }: SidebarProps) {
    const pathname = usePathname();

    if (mobile) {
        return (
            <div className="flex justify-around items-center w-full px-2 py-3">
                {routes.map((route) => {
                    const isActive = pathname === route.href;
                    return (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300",
                                isActive ? "bg-white/10 scale-105" : "hover:bg-white/5"
                            )}
                        >
                            <route.icon className={cn("h-6 w-6 mb-1 transition-colors", isActive ? route.color : "text-zinc-500")} />
                            <span className={cn("text-[10px] font-medium tracking-wide", isActive ? "text-white" : "text-zinc-500")}>
                                {route.label.split(' ')[0]}
                            </span>
                        </Link>
                    )
                })}
            </div>
        );
    }

    return (
        <div className="space-y-4 py-6 flex flex-col h-full bg-transparent text-white">
            <div className="px-4 py-2 flex-1">
                <Link href="/" className="flex items-center pl-2 mb-12 hover:scale-[1.02] transition-transform gap-3 w-full">
                    <div className="relative h-14 w-28 flex shrink-0">
                        <Image
                            src={logoSrc}
                            alt="Skyddsprodukter Logo"
                            fill
                            className="object-contain object-left drop-shadow-lg"
                            priority
                        />
                    </div>
                    <div className="relative h-10 w-24 flex shrink-0 opacity-90">
                        <Image
                            src={logoRoccSrc}
                            alt="ROCC Logo"
                            fill
                            className="object-contain object-left drop-shadow-lg"
                            priority
                        />
                    </div>
                </Link>
                <div className="space-y-2">
                    {routes.map((route) => {
                        const isActive = pathname === route.href;
                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer rounded-2xl transition-all duration-300",
                                    isActive
                                        ? "bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                                        : "text-zinc-400 hover:text-white hover:bg-[#3AA3E0]/10"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon className={cn("h-5 w-5 mr-3 transition-colors", isActive ? route.color : "text-zinc-500 group-hover:text-zinc-300")} />
                                    <span className="tracking-wide">{route.label}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
            <div className="px-6 py-4">
                <button className="flex w-full items-center text-zinc-500 hover:text-white p-2 rounded-2xl hover:bg-white/5 transition-all">
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="text-sm font-medium tracking-wide">Logga ut</span>
                </button>
            </div>
        </div>
    );
}
