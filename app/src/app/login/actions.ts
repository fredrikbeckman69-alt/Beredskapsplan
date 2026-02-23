"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function verifyPasscode(code: string) {
    // Add a small delay for better UX (prevents immediate visual flash)
    await new Promise(resolve => setTimeout(resolve, 500));

    if (code === "68092659") {
        // Correct code, set cookie
        const cookieStore = await cookies();
        cookieStore.set("beredskapsplan_access", "68092659", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
        });

        redirect("/"); // redirect to dashboard using NextJS built-in redirect
    }

    return { success: false, error: "Felaktig kod. Vänligen försök igen." };
}
