import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";

const wrapper = cva(['']);
const h2 = cva(['mb-[30px] text-[60px]']);

export default function ProfileTeacherSchedule() {
    const t = useTranslations("Profile");

    return (
        <div className={wrapper()}>
            <h2 className={h2()}>
                {t("teacher-h2")}
            </h2>
        </div>
    )
}