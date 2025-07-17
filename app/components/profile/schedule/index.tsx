import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import Schedule from "@/app/ui/Schedule";

const wrapper = cva(['']);
const h2 = cva(['mb-[30px] text-[60px]']);

export default function ProfileTeacherSchedule({ lessons }: { lessons: Record<string, Record<string, { id: number; Subject: string; Teacher: string; Student: string; }>> }) {
    const t = useTranslations("Profile");
    const mockLessons = {
        "day-1": {
          "9:00": {
            id: 1,
            Subject: "Mathematics",
            Teacher: "math.teacher@example.com",
            Student: "student1@example.com"
          },
          "14:00": {
            id: 2,
            Subject: "Physics",
            Teacher: "physics.teacher@example.com",
            Student: "student1@example.com"
          }
        },
        "day-3": {
          "10:00": {
            id: 3,
            Subject: "Chemistry",
            Teacher: "chem.teacher@example.com",
            Student: "student1@example.com"
          },
          "18:00": {
            id: 4,
            Subject: "Biology",
            Teacher: "bio.teacher@example.com",
            Student: "student1@example.com"
          }
        },
        "day-5": {
          "15:00": {
            id: 5,
            Subject: "Literature",
            Teacher: "lit.teacher@example.com",
            Student: "student1@example.com"
          },
          "20:00": {
            id: 6,
            Subject: "History",
            Teacher: "hist.teacher@example.com",
            Student: "student1@example.com"
          }
        }
      };
    
    return (
        <div className={wrapper()}>
            <h2 className={h2()}>
                {t("teacher-h2")}
                <Schedule lessons={mockLessons} />
            </h2>
        </div>
    )
}