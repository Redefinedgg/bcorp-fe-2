'use client';

import Link from "next/link";
import Image from "next/image";
import useLocaleStore from "@/app/stores/localeStore";

export default function LogoLink() {
    const { locale } = useLocaleStore();
    
    return (
        <Link href={`/${locale}/`}>
            <Image src="/headerLogo.svg" alt="logo" height={40} width={47} />
        </Link>
    )
}