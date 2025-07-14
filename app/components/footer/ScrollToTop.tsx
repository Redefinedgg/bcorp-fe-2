"use client";

import Button from "@/app/ui/Button";
import { useTranslations } from "next-intl";

export default function ScrollToTopButton() {
    const t = useTranslations("Footer");

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

    return (
        <Button classes="py-[20px]" label={t("scroll-to-top")} onClick={scrollToTop} variant="transparent" />
    )
}