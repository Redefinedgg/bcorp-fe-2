import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";

const section = cva(['bg-orange py-[50px] border-b-[1px]']);
const wrapper = cva(['container']);
const h2 = cva(['text-white font-signate text-[60px] leading-[73px] mb-[40px]']);
const cardsWrapper = cva(['grid grid-cols-4 gap-[20px]']);
const cardStyles = cva(['rounded-[30px] p-[30px] text-white']);
const h3 = cva(['font-signate text-[25px] leading-[25px] mb-[20px]']);
const p = cva(['text-[18px] leading-[21px]']);
const imgs = cva(['w-full'], {
    variants: {
        even: {
            true: 'mb-[10px]',
            false: 'mt-[10px]',
        }
    }
});

export default function WhyWe() {
    const t = useTranslations("WhyWe");
    const cards = [
        {
            title: t("card-header-1"),
            descr: t("card-descr-1"),
            img: '/imgs/WhyWe1.png',
            bg: 'whyWeCard-1'
        },
        {
            title: t("card-header-2"),
            descr: t("card-descr-2"),
            img: '/imgs/WhyWe2.png',
            bg: 'whyWeCard-2'
        },
        {
            title: t("card-header-3"),
            descr: t("card-descr-3"),
            img: '/imgs/WhyWe3.png',
            bg: 'whyWeCard-3'
        },
        {
            title: t("card-header-4"),
            descr: t("card-descr-4"),
            img: '/imgs/WhyWe4.png',
            bg: 'whyWeCard-4'
        },
    ];

    return (
        <section className={section()}>
            <div className={wrapper()}>
                <h2 className={h2()}>{t("header")}</h2>
                <div className={cardsWrapper()}>
                    {cards.map((card, index) => {
                        return (
                            <div key={index} className={`${card.bg} ${cardStyles()}`}>
                                {index % 2 !== 0 && (
                                    <Image 
                                        className={imgs({ even: true })}
                                        src={`${card.img}`}
                                        alt={`Image for card ${index + 1}`} 
                                        width={500} 
                                        height={500} 
                                    />
                                )}
                                <h3 className={h3()}>{card.title}</h3>
                                <p className={p()}>{card.descr}</p>
                                {index % 2 === 0 && (
                                    <Image
                                        className={imgs({ even: false })}
                                        src={`${card.img}`}
                                        alt={`Image for card ${index + 1}`} 
                                        width={500} 
                                        height={500} 
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}