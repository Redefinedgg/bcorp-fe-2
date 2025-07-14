'use client'

import { useGlobalContext } from '@/app/context/GlobalContext';
import useLocaleStore from '@/app/stores/localeStore';
import { cva } from 'class-variance-authority';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const wrapper = cva(['relative']);
const localesButton = cva(['font-bold']);
const localesWrapper = cva(['absolute transition-all overflow-hidden top-[44px] z-[80] left-[-19px]'], {
    variants: {
        opened: {
            true: 'bottom-[-112px]',
            false: 'bottom-[-20px]',
        }
    }
})
const localesBlock = cva(['py-2.5 px-5 flex flex-col rounded-b-full bg-orange']);
const localeLink = cva(['text-white']);

export default function LangDropDown() {
    const envLocales = process.env.NEXT_PUBLIC_LOCALES;
    const locales = envLocales?.split(',').map((locale: string) => locale.trim().toUpperCase()) || [];
    const currentLocale = useLocale();
    const { activeMenu, setLangMenuOpen } = useGlobalContext();
    const { setLocale } = useLocaleStore();

    const [isOpen, setIsOpen] = useState(false);

    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                buttonRef.current && !buttonRef.current.contains(event.target as Node) &&
                wrapperRef.current && !wrapperRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (activeMenu) {
            setIsOpen(false);
        }
    }, [activeMenu])

    useEffect(() => {
        isOpen ? setLangMenuOpen(true) : setLangMenuOpen(false);
    }, [isOpen, setLangMenuOpen])

    const setNewLocale = (locale: string) => {
        setLocale(locale);
    }

    return (
        <div className={wrapper()} ref={wrapperRef}>
            <div
                onClick={() => setIsOpen(!isOpen)}
            >
                <button
                    ref={buttonRef}
                    type="button"
                    className={localesButton()}
                    id="menu-button"
                    aria-expanded={isOpen ? 'true' : 'false'}
                    aria-haspopup="true"
                >
                    {currentLocale.toUpperCase()}
                </button>
            </div>
            <div className={localesWrapper({ opened: isOpen ? true : false })}>
                <div className={localesBlock()}>
                    {locales.map((locale, index) => (
                        <Link
                            key={index}
                            onClick={() => setNewLocale(locale)}
                            href={`/${locale.toLowerCase()}`}
                            className={localeLink()}
                        >
                            {locale}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
