import useLocaleStore from "@/app/stores/localeStore";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Link from "next/link";

const list = cva(['max-w-[70%] w-full h-full mx-auto flex justify-between items-center text-white text-[18px] font-medium']);

export default function MenuContent({ type, closeMenu }: { type: string, closeMenu: () => void }) {
    const t = useTranslations("HeaderMenuItems");
    const { locale } = useLocaleStore();

    const getMenuContent = () => {
        switch (type as string) {
            case "education":
                return [
                    {
                        label: t("courses"),
                        href: `${locale}/courses`
                    },
                    {
                        label: t("individuals"),
                        href: `${locale}/individuals`
                    },
                    {
                        label: t("teachers"),
                        href: `${locale}/teachers`
                    },
                    {
                        label: t("languages"),
                        href: `${locale}/languages`
                    },
                    {
                        label: t("science"),
                        href: `${locale}/science`
                    },
                    {
                        label: t("it"),
                        href: `${locale}/it`
                    },
                ];
            case "news":
                return [
                    {
                        label: t("news"),
                        href: `${locale}/news`
                    },
                    {
                        label: t("blog"),
                        href: `${locale}/blog`
                    },
                    {
                        label: t("history"),
                        href: `${locale}/history`
                    },
                ];
            case "about":
                return [
                    {
                        label: t("news"),
                        href: `${locale}/news`
                    },
                    {
                        label: t("mission"),
                        href: `${locale}/mission`
                    },
                    {
                        label: t("team"),
                        href: `${locale}/team`
                    },
                ];
            case "contacts":
                return [
                    {
                        label: t("addresses"),
                        href: `${locale}/addresses`
                    },
                    {
                        label: t("phones"),
                        href: `${locale}/phones`
                    },
                    {
                        label: t("email"),
                        href: `${locale}/email`
                    },
                ];
            default:
                return [];
        }
    };

    return (
        <ul className={list()}>
            {getMenuContent().map((item, index) => (
                <li key={index} className="py-1">
                    <Link href={item.href} className="text-white" onClick={closeMenu}>{item.label}</Link>
                </li>
            ))}
        </ul>
    );
}
