"use client"

import useLocaleStore from "@/app/stores/localeStore";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

const wrapper = cva(['flex max-w-[50%] w-full justify-between']);
const listWrapper = cva(['flex flex-col text-white']);
const list = cva(['flex flex-col']);
const h3 = cva(['font-semibold']);
const li = cva(['mb-[5px] last:mb-[0px]']);

export default function Lists() {
    const { locale } = useLocaleStore();
    const t = useTranslations("Footer");

    const items: ListItem[] = [
        {
            title: t("title-1"),
            content: [
                { text: t("text-1"), href: `${locale}/languages` },
                { text: t("text-2"), href: `${locale}/science` },
                { text: t("text-3"), href: `${locale}/it` },
                { text: t("text-4"), href: `${locale}/all-lessons` },
            ]
        },
        {
            title: t("title-2"),
            content: [
                { text: t("text-5"), href: `${locale}/why-us` },
                { text: t("text-6"), href: `${locale}/bcorporation` }
            ]
        },
        {
            title: t("title-3"),
            content: [
                { text: t("text-7"), href: "mailto:bcorpconnect@gmail.com" },
                { text: t("text-8"), src: "/FacebookFooter.svg", href: "http://www.facebook.com" },
                { text: t("text-9"), src: "/InstFooter.svg", href: "http://www.facebook.com" }
            ]
        }
    ];

    return (
      <div className={wrapper()}>
        {items.map((item, index) => (
          <div className={listWrapper()} key={index}>
            <h3 className={h3()}>{item.title}</h3>
            <ul className={list()}>
              {item.content.map((contentItem, contentIndex) => (
                <li className={li()} key={contentIndex}>
                  {!contentItem.src ?
                  <Link href={contentItem.href}>{contentItem.text}</Link>
                  :
                  <Link href={contentItem.href}>
                    <Image src={contentItem?.src || ""} alt="footer img" width={25.6} height={25.6} />
                  </Link>
                  }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
  