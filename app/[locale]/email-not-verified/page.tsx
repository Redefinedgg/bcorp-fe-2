import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";

const wrapper = cva(['container text-[22px] flex justify-center items-center w-full h-[80vh]']);

export default function EmailNotVerified() {
    const t = useTranslations("Not-verified");
      
    return (
        <div className={wrapper()}>
            {t("title")}
        </div>
    )
}