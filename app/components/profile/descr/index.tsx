"use client";

import useUserStore from "@/app/stores/userStore";
import Button from "@/app/ui/Button";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { toast } from "react-toastify";

const wrapper = cva(['relative flex py-[50px]']);
const avatarWrapper = cva(['relative flex items-center rounded-[30px] p-20 bg-[#D9D9D9] max-w-[30%] mr-[50px]']);
const span = cva(['absolute whitespace-nowrap schedule-picked-btn rounded-[50px] text-white'], {
    variants: {
        withAvatar: {
            true: "px-[15px] py-[10px] text-[16px] left-0 top-[50px]",
            false: "py-[14px] px-[23px] bottom-[15px] left-1/2 transform -translate-x-1/2"
        }
    }
});
const image = cva(['relative h-full object-cover rounded-[30px]'], {
    variants: {
        withAvatar: {
            true: "max-w-[30%] mr-[30px]",
            false: ""
        }
    }
});
const descrWrapper = cva(['flex flex-col max-w-[60%]']);
const h2 = cva(['font-signate text-[50px] max-w-[70%] font-bold mb-[30px]']);
const p = cva(['']);
const btn = cva(['max-h-[56px]']);

export default function ProfileDescr({ avatarUrl, role, name, descr, userId }: { avatarUrl: string | null, role: string, name: string, descr: string, userId: number }) {
    const t = useTranslations("Profile");
    const tToast = useTranslations("Toastes");
    const { isLoggedIn } = useUserStore();

    const getAvatarImage = () => {
        const avatarSrc = avatarUrl ? avatarUrl : "/imgs/AvatarChelik.png";

        return avatarSrc;
    };

    const getLabel = () => {
        const label = role === 'teacher' ? t("label-1") : t("label-2");

        return label;
    }

    const getChat = () => {
        if (!isLoggedIn) {
            toast.error(tToast("unauthorized"))
        }
    }

    return (
        <div className={wrapper()}>
            {avatarUrl ?
                <>
                    <Image 
                        className={image({ withAvatar: true })}
                        src={getAvatarImage()} 
                        alt="avatar" 
                        layout="responsive" 
                        width={387} 
                        height={491} 
                    />
                    <span className={span({ withAvatar: true })}>{getLabel()}</span>
                </>
            :
                <div className={avatarWrapper()}>
                    <Image 
                        className={image({ withAvatar: false })}
                        src={getAvatarImage()} 
                        alt="avatar" 
                        layout="responsive" 
                        width={387} 
                        height={491} 
                    />
                    <span className={span({ withAvatar: false })}>{getLabel()}</span>
                </div>
            }
            <div className={descrWrapper()}>
                <h2 className={h2()}>
                    {name}
                </h2>
                <p className={p()}>
                    {descr}
                </p>
            </div>
            <Button classes={btn()} variant="fullOrange" label={t("label-3")} onClick={getChat} />
        </div>
    );
}
