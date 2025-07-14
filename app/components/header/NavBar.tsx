'use client';

import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import MenuContent from "./MenuContent";
import { useGlobalContext } from "@/app/context/GlobalContext";

const nav = cva(['max-w-[452px] w-full']);
const navUl = cva(['flex justify-between']);
const dropdownWrapper = cva(["container absolute-navbar-x-center absolute top-full w-full bg-orange shadow-md rounded-b-[30px] transition-all"], {
    variants: {
        activeMenu: {
            true: 'bottom-[-70px]',
            false: 'bottom-0'
        },
    },
});

export default function NavBar() {
    const t = useTranslations("Header");
    const [openMenu, setOpenMenu] = useState<string | null>(null);
    const { langMenuOpen, setActiveMenu } = useGlobalContext();
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
    const data = [
        {
            label: t("nav-1"),
            value: "education",
        },
        {
            label: t("nav-2"),
            value: "news",
        },
        {
            label: t("nav-3"),
            value: "about",
        },
        {
            label: t("nav-4"),
            value: "contacts",
        },
    ]

    const toggleMenu = (type: string) => {
        setOpenMenu(prev => (prev === type ? null : type));
    }

    const closeMenu = () => {
        setOpenMenu(null);
        setActiveMenu(false);
    }

    useEffect(() => {
        openMenu ? setActiveMenu(true) : setActiveMenu(false);
    }, [openMenu, setActiveMenu])

    useEffect(() => {
        if (langMenuOpen) {
            setActiveMenu(false)
            setOpenMenu(null)
        }
    }, [langMenuOpen, setActiveMenu])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const isButtonClicked = buttonRefs.current.some(ref => ref && ref.contains(event.target as Node));
            const isMenuClicked = wrapperRefs.current.some(ref => ref && ref.contains(event.target as Node));

            if (!isButtonClicked && !isMenuClicked) {
                setOpenMenu(null);
                setActiveMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setActiveMenu, openMenu]);

    return (
        <nav className={nav()}>
            <ul className={navUl()}>
            {data.map((item, index) => (
                    <li key={index}>
                        <button onClick={() => toggleMenu(item.value)} ref={(el) => { buttonRefs.current[index] = el }}>
                            {item.label}
                        </button>
                        <div className={dropdownWrapper({ activeMenu: openMenu === item.value ? true : false })} ref={(el) => { wrapperRefs.current[index] = el; }}
                        >
                            <MenuContent type={openMenu === item.value ? item.value : ''} closeMenu={closeMenu} />
                        </div>
                    </li>
                ))}
            </ul>
        </nav>
    )
}