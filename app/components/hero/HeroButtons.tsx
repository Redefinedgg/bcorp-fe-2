'use client'

import Button from "@/app/ui/Button";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/app/stores/modalStore";

const firstButton = cva(['mr-[12px] py-[20px]'])

export default function HeroButtons() {
    const { openLoginModal, openRegisterModal } = useModalStore();
    const t = useTranslations("Hero");

    const regHandle = () => {
      openRegisterModal();
    };
    
    const loginHandle = () => {
      openLoginModal();
    };

    return (
        <>
            <Button classes={firstButton()} label={`${t("button1")}`} onClick={regHandle} variant="fullOrange" />
            <Button classes="py-[20px]" label={`${t("button2")}`} onClick={loginHandle} variant="orangeBorder" />
        </>
    )
}
