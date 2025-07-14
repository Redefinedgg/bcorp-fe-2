"use client"

import useLocaleStore from "@/app/stores/localeStore";
import { useModalStore } from "@/app/stores/modalStore";
import useUserStore from "@/app/stores/userStore";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const avatar = cva(['rounded-full']);
const wrapper = cva(['relative cursor-pointer']);
const menu = cva(['whyWeCard-3 absolute p-2.5 bg-[red] mt-[5px] flex flex-col rounded-[20px]']);
const link = cva(['text-white']);

export default function Avatar() {
    const [ isMenuActive, setIsMenuActive ] = useState<boolean>(false);
    const { isLoggedIn } = useUserStore();
    const { locale } = useLocaleStore();
    const { openLoginModal } = useModalStore();
    const menuContent = [
        {
            label: 'Profile',
            href: `/${locale}/dashboard`
        },
        {
            label: 'Logout',
            href: `/${locale}/logout`
        },
    ]

    return (
        <div className={wrapper()}>
            {isLoggedIn ? 
                <div onClick={() => setIsMenuActive(!isMenuActive)}>
                    <Image className={avatar()} src='/avatarDefault.svg' alt='Avatar' width={31} height={31} />
                </div>
            :
                <Image onClick={openLoginModal} className={avatar()} src='/avatarDefault.svg' alt='Avatar' width={31} height={31} />
            }

            {isMenuActive &&
                <div className={menu()}>
                    {menuContent.map((item, index) => (
                        <Link className={link()} onClick={() => setIsMenuActive(false)} href={item.href} key={index}>
                            {item.label}
                        </Link>
                    ))}
                </div>
            }
        </div>
    )
}