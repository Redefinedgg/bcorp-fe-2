import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";

const section = cva(['bg-orange py-[50px] border-b-[1px]']);
const wrapper = cva(['container']);
const h2 = cva(['text-white font-signate text-[60px] leading-[73px] mb-[40px]']);
const row = cva(['flex mb-[20px] last:mb-0 justify-between']);
const firstRowCard = cva(['about-us-cards relative rounded-[30px]'], {
    variants: {
        first: {
            true: 'w-[78%] p-[25px] mr-[20px]',
            false: 'w-[20%]'
        }
    }
})
const h3 = cva(['font-signate text-[60px] text-white']);
const p = cva(['text-[18px] text-white']);
const firstCardImg = cva(['absolute top-0 right-0']);
const thirdCardImg = cva(['absolute inset-0']);
const thirdCard = cva(['relative about-us-third-cards w-[30%] flex justify-center items-center px-[64px] rounded-[30px] max-w-[350px] min-h-[172px] w-full']);
const thirdCardH3 = cva(['font-signate text-[30px] text-white max-w-[225px]']);
const fourthCard = cva(['w-[35%] min-h-[172px] relative']);
const fourthImg = cva(['absolute w-full h-[172px] inset-0']);
const fifthCard = cva(['about-us-cards relative flex flex-col justify-center rounded-[30px] w-[30%] px-[30px] max-h-[172px]']);
const fifthCardImg = cva(['absolute bottom-0 right-0']);
const fifthCardH3 = cva(['text-white font-bold'])

export default function AboutUs() {
    const t = useTranslations("AboutUs");
    const cards = [
        [
            {
                title: "Bcorporation",
                descr: t("card-descr-1"),
                img: "/imgs/AboutUsFirstCardImg.png"
            },
            {
                img: "/imgs/AboutUsSecondImg.png"
            },
        ],
        [
            {
                title: t("card-descr-2"),
                img: "/imgs/AboutUsThirdImg.png"
            },
            {
                img: "/imgs/AboutUsFourthImg.png"
            },
            {
                title: t("last-card-title"),
                descr: t("card-descr-3"),
                img: "/imgs/AboutUsFifthImg.png"
            },
        ]
    ]

    return (
        <section className={section()}>
            <div className={wrapper()}>
                <h2 className={h2()}>{t("header")}</h2>
                <div className={row()}>
                    {cards[0].map((item, index) => {
                        return (
                            <div key={index} className={firstRowCard({ first: item.title ? true : false })}>
                                {item.title ?
                                    <>
                                        <Image className={firstCardImg()} src={item.img} alt="Image" width={492} height={116} />
                                        <h3 className={h3()}>{item.title}</h3>
                                        <p className={p()}>{item.descr}</p>
                                    </>
                                    :
                                    <>
                                        <Image className="rounded-[30px]" src={item.img} alt="Image" width={285} height={232} />
                                    </>
                                }
                            </div>
                        )
                    })}
                </div>
                <div className={row()}>
                    {cards[1].map((item, index) => {
                        return (
                            <>                            
                                {index === 0 &&
                                    <div className={thirdCard()}>
                                        <Image className={thirdCardImg()} src={item.img} alt="Image" width={492} height={116} />
                                        <h3 className={thirdCardH3()}>{item.title}</h3>
                                    </div>
                                }
                                {index === 1 &&
                                    <div className={fourthCard()}>
                                        <Image className={fourthImg()} src={item.img} alt="Image" width={492} height={116}  />
                                    </div>
                                }
                                {index === 2 &&
                                    <div className={fifthCard()}>
                                        <Image className={fifthCardImg()} src={item.img} alt="Image" width={117} height={82} />
                                        <p className={p()}>{item.descr}</p>
                                        <h3 className={fifthCardH3()}>{item.title}</h3>
                                    </div>
                                }
                            </>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}