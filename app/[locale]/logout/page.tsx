"use client";

import useLocaleStore from "@/app/stores/localeStore";
import useUserStore from "@/app/stores/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
    const logout = useUserStore((state) => state.logout);
    const { locale } = useLocaleStore();
    const router = useRouter();

    useEffect(() => {
        logout();
        document.cookie = "authToken=; path=/; max-age=0";

        router.push(`/`);
    }, [logout, router, locale]);

    return null;
}