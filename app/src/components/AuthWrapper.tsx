"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const hasAccess = localStorage.getItem("beredskapsplan_access") === "68092659";
            const isLoginPage = pathname?.startsWith("/login");

            if (!hasAccess && !isLoginPage) {
                router.replace("/login");
            } else if (hasAccess && isLoginPage) {
                router.replace("/");
            } else {
                setIsAuthorized(true);
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Show nothing while checking authorization, to avoid flashing protected content
    if (!isAuthorized && !pathname?.startsWith("/login")) {
        return <div className="min-h-screen bg-[#0c0514] flex items-center justify-center"></div>;
    }

    return <>{children}</>;
}
