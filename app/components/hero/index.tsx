import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";
import HeroButtons from "./HeroButtons";

const section = cva(['container flex items-center']);
const contentWrapper = cva(['py-[80px] max-w-[615px] flex flex-col']);
const h1 = cva(['text-orange font-signate text-[82px] mb-[27px]']);
const buttons = cva(['flex']);
const imageWrapper = cva(['max-w-[571px] max-h-[394px] w-full h-full']);

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className={section()}>
            <div className={contentWrapper()}>
                <h1 className={h1()}>{t("title")}</h1>
                <div className={buttons()}>
                    <HeroButtons />
                </div>
            </div>
            <div className={imageWrapper()}>
                <Image
                    src='/imgs/HeroPhoto.png'
                    alt="Hero"
                    width={571}
                    height={394}
                    layout="responsive"
                />
            </div>
        </section>
    )
}