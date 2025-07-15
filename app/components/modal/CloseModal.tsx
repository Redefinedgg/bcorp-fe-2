"use client"; 

import Image from "next/image";
import { useModalStore } from "@/app/stores/modalStore";
import { cva } from "class-variance-authority";

interface CloseModalProps {
    isLoginOrRegister: "login" | "register";
}

const img = cva(['absolute top-[15px] right-[15px] cursor-pointer w-[24px] h-[24px]']);

export default function CloseModal({ isLoginOrRegister }: CloseModalProps) {
    const { closeLoginModal, closeRegisterModal } = useModalStore();
    return (
        <button onClick={isLoginOrRegister === "login" ? closeLoginModal : closeRegisterModal}>
            <Image className={img()} src="/close.svg" alt="Close" width={24} height={24} />  
        </button>
    );
}