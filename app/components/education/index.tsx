import { EducationCard } from "@/app/types/educationCard";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import EducationCards from "./Cards";
import Image from "next/image";

const section = cva(['container py-[50px]']);
const h2 = cva(['font-signate text-[60px] leading-[73px] mb-[42px]']);
const contentWrapper = cva(['flex mb-[50px]']);
const img = cva(['ml-[20px]']);

export default function Education() {
    const t = useTranslations("Education");
    const cards: EducationCard[] = [
        {
            title: t("card-header-1"),
            descr: t("card-descr-1"),
            btnText: t("card-btn-1"),
            btnStyle: 'transparent',
            bgClr: 'education-card-1',
            textClr: 'text-white'
        },
        {
            title: t("card-header-2"),
            descr: t("card-descr-2"),
            btnText: t("card-btn-2"),
            btnStyle: 'transparent',
            bgClr: 'education-card-2',
            textClr: 'text-white'
        },
        {
            title: t("card-header-3"),
            descr: t("card-descr-3"),
            btnText: t("card-btn-3"),
            btnStyle: 'transparent',
            bgClr: 'education-card-3',
            textClr: 'text-white'
        },
        {
            title: t("card-header-4"),
            descr: t("card-descr-4"),
            btnText: t("card-btn-4"),
            btnStyle: 'fullOrange',
            bgClr: 'education-card-4',
            textClr: 'text-black'
        },
    ];

    return (
        <section className={section()}>
            <h2 className={h2()}>{t("header")}</h2>
            <div className={contentWrapper()}>
                <EducationCards cards={cards} />
                <Image className={img()} src='/imgs/EducationImg.png' alt='Education img' width={387} height={575} />
            </div>
        </section>
    );
}
