"use client";

import React from "react";
import { EducationCard } from "@/app/types/educationCard";
import Button from "@/app/ui/Button";
import { cva } from "class-variance-authority";
import Link from "next/link";
import useUserStore from "@/app/stores/userStore";
import { useModalStore } from "@/app/stores/modalStore";

const cardsWrapper = cva(["grid grid-cols-2 gap-[20px]"]);
const cardStyles = cva(["flex flex-col text-center p-[30px] rounded-[50px] "]);
const h3 = cva(["font-signate text-[30px] mb-[20px]"]);
const p = cva(["mb-[48px] text-[18px] leading-[21px]"]);
const buttonWrapper = cva(["flex justify-center"]);
const btnClasses = cva(["max-w-[200px] min-h-[56px] py-[20px]"]);

export default function EducationCards({ cards }: { cards: EducationCard[] }) {
  const { isLoggedIn } = useUserStore();
  const { openLoginModal } = useModalStore();



  const clickWithoutLoggedIn = () => {
    openLoginModal();
  };

  return (
    <div className={cardsWrapper()}>
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.textClr} ${card.bgClr} ${cardStyles()}`}
        >
          <h3 className={h3()}>{card.title}</h3>
          <p className={p()}>{card.descr}</p>
          <div className={buttonWrapper()}>
            {isLoggedIn ? (
              <Link href="/ru/profile/2">
                <Button
                  classes={btnClasses()}
                  label={`${card.btnText}`}
                  variant={`${card.btnStyle}`}
                />
              </Link>
            ) : (
              <Button
                classes={btnClasses()}
                onClick={clickWithoutLoggedIn}
                label={`${card.btnText}`}
                variant={`${card.btnStyle}`}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
