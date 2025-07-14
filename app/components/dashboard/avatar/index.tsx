"use client";

import useUserStore from "@/app/stores/userStore";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";

const wrapper = cva(['relative rounded-[30px] bg-[#D9D9D9]'], {
    variants: {
        padding: {
            true: 'p-20',
            false: 'p-0',
        }
    }
});
const button = cva(['absolute bottom-[15px] left-1/2 whitespace-nowrap transform -translate-x-1/2 bg-orange rounded-[50px] px-[23px] py-[14px] text-white']);
const image = cva(['relative w-full h-auto rounded-[30px]']);

export default function DashboardAvatar() {
    const { profile } = useUserStore();
    const t = useTranslations("Dashboard");

    const getAvatarImage = () => {
        const avatarSrc = profile.avatar ? profile.avatar : "/imgs/AvatarChelik.png";

        return avatarSrc;
    };

    const getBtnLabel = () => {
        const label = profile.avatar ? t("update-avatar-btn") : t("avatar-btn");

        return label;
    }

    return (
        <div className={wrapper({ padding: profile.avatar ? false : true })}>
            <Image 
                className={image()}
                src={getAvatarImage()} 
                alt="avatar" 
                layout="responsive" 
                width={387} 
                height={491} 
            />
            <button className={button()}>{getBtnLabel()}</button>
        </div>
    );
}
