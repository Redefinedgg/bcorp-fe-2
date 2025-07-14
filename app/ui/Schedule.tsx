"use client";

import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useState } from "react";
import useUserStore from "../stores/userStore";
import { useGlobalContext } from "../context/GlobalContext";
import Button from "./Button";
import LessonModal from "./LessonModal";

const wrapper = cva([
  "relative w-full min-h-[250px] rounded-[30px] border-[3px] border-orange overflow-hidden"
], {
  variants: {
    noLessons: {
      false: "flex justify-center items-center",
      true: ""
    }
  }
});

const daysGrid = cva([
  "grid grid-cols-7 gap-2 pl-[15%] py-[20px] bg-orange text-white",
]);

const dayCell = cva([
  "text-center font-bold",
]);

const timeContainer = cva([
  "flex flex-col mt-4 px-[14px]",
]);

const timeHeader = cva([
  "text-orange",
]);

const timePeriod = cva([
  "font-bold",
]);

const timeRange = cva([
  "text-[9px]",
]);

const lessonsGrid = cva([
  "grid grid-cols-7 gap-2 mt-2 pl-[15%]",
]);

const lessonCell = cva([
  "flex flex-col justify-center",
]);

const lessonButton = cva([ "px-4 py-2 schedule-btn rounded-full text-white mb-[10px] last:mb-0 transition-all hover:scale-95"], {
  variants: {
    picked: {
      true: "schedule-picked-btn",
      false: "schedule-btn"
    }
  }
});

const noLessonsContent = cva([
  'blur-lg text-[30px]'
]);

const noLessonsWrapper = cva([
  'max-w-[400px]'
]);

const noLessonsh2 = cva(['text-[18px] font-bold']);
const noLessonsp = cva(['mb-[20px]']);

export default function Schedule({ lessons }: { lessons: Record<string, Record<string, { id: number, Subject: string, Teacher: string, Student: string }>> }) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<{
    id: number;
    subject: string;
    email: string;
    day: string;
    time: string;
  } | null>(null);
  const { profile } = useUserStore();
  const { pickedLesson } = useGlobalContext();
  const t = useTranslations("Schedule");

  const DAYS = [
    { value: "day-1", label: t("day-1") },
    { value: "day-2", label: t("day-2") },
    { value: "day-3", label: t("day-3") },
    { value: "day-4", label: t("day-4") },
    { value: "day-5", label: t("day-5") },
    { value: "day-6", label: t("day-6") },
    { value: "day-7", label: t("day-7") },
  ];

  const TIMES = [
    { period: t("period-1"), range: "9:00 - 12:00", times: ["9:00", "10:00", "11:00", "12:00"] },
    { period: t("period-2"), range: "13:00 - 16:00", times: ["13:00", "14:00", "15:00", "16:00"] },
    { period: t("period-3"), range: "17:00 - 21:00", times: ["17:00", "18:00", "19:00", "20:00", "21:00"] },
  ];

  const closeModalInfo = () => {
    setIsModalOpen(false);
  }

  const openModalInfo = (id: number, subject: string, email: string, calendarDay: string, time: string) => {
    const day: string = DAYS.find((day) => day.value === calendarDay)?.label || '';

    setSelectedLesson({ id, subject, email, day, time });

    setIsModalOpen(true);
  };

  const hasLessons = lessons && Object.keys(lessons).some(day => Object.keys(lessons[day] || {}).length > 0);

  const toAllLessons = () => {
    console.log('to all lessons pressed');
  }

  return (
    <div className={wrapper({ noLessons: hasLessons })}>
      {!hasLessons ? (
        <>
          <div className={noLessonsContent()}>
            <h2>Subjects</h2>
            <h2>Calendart</h2>
            <h2>Calendart</h2>
            <h2>Calendart</h2>
          </div>
          <div className={noLessonsWrapper()}>
              <h2 className={noLessonsh2()}>{t("no-lessons-header")}</h2>
              <p className={noLessonsp()}>{t("no-lessons-descr")}</p>
              <Button classes="py-[12px]" variant="fullOrange" label={t("no-lessons-btn")} onClick={toAllLessons} />
          </div>
        </>
      ) : selectedDay === null ? (
        <div className="flex flex-col pb-[20px]">
          <div className={daysGrid()}>
            {DAYS.map((day) => (
              <div key={day.value} className={dayCell()}>
                {day.label}
              </div>
            ))}
          </div>

          {TIMES.map(({ period, range, times }) => (
            <div key={period} className={timeContainer()}>
              <div className={timeHeader()}>
                <div className={timePeriod()}>{period}</div>
                <div className={timeRange()}>({range})</div>
              </div>
              <div className={lessonsGrid()}>
                {DAYS.map((day) => (
                  <div key={day.value} className={lessonCell()}>
                    {Object.keys(lessons[day.value] || {})
                      .filter((time) => times.includes(time)).length > 0 &&
                      Object.keys(lessons[day.value] || {})
                        .filter((time) => times.includes(time))
                        .map((time) => (
                          <button
                            key={time}
                            className={lessonButton({
                              picked: lessons[day.value]?.[time]?.Subject === pickedLesson,
                            })}
                            onClick={() =>
                              openModalInfo(
                                lessons[day.value]?.[time]?.id,
                                lessons[day.value]?.[time]?.Subject || "",
                                profile.role === 'teacher' ? lessons[day.value]?.[time]?.Student : lessons[day.value]?.[time]?.Teacher,
                                day.value,
                                time
                              )
                            }
                          >
                            {time}
                          </button>
                        ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {isModalOpen && selectedLesson && (
        <LessonModal
          lessonId={selectedLesson.id}
          isModalOpen={isModalOpen}
          onClose={closeModalInfo}
          subject={selectedLesson.subject}
          date={selectedLesson.day}
          time={selectedLesson.time}
          email={selectedLesson.email}
        />
      )}
    </div>
  );
}
