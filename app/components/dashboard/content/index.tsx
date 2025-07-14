"use client";

import useUserStore from "@/app/stores/userStore";
import Button from "@/app/ui/Button";
import Schedule from "@/app/ui/Schedule";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import Subjects from "../subjects";
import Dates from "../dates";
import { toast } from "react-toastify";
import { LessonsSchedule } from "@/app/types/lessons";

const h1 = cva(['font-signate text-[40px] max-w-[70%] font-bold mb-[10px]']);
const textarea = cva(['resize-none rounded-[30px] w-full border-[1px] border-orange p-[24px] placholder:text-black mb-[21px]']);
const h2 = cva(['font-signate text-[30px] font-bold mb-[10px]']);

type LessonsByWeek = Record<string, number>;
export default function DashboardContent() {
    const { profile, updateProfile } = useUserStore();
    const [subjects, setSubjects] = useState<string[]>([]);
    const [activeDate, setActiveDate] = useState<string>("");
    const [newDescr, setNewDescr] = useState<string | null>(profile.descr);
    const [lessons, setLessons] = useState<LessonsSchedule>({});
    const [dates, setDates] = useState<LessonsByWeek>({});
    const t = useTranslations("Dashboard");

    const getTextareaPlaceholder = () => {
        const placeholder = profile.descr ? profile.descr : t("textarea-placeholder");

        return placeholder;
    }

    const getSubjectsHeader = () => {
        const placeholder = profile?.role?.toLowerCase() === 'teacher' ? t("h2-teacher-subjects") : t("h2-subjects");

        return placeholder;
    }

    const saveDescr = async () => {
        const response = await fetch('/api/post-update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fields: ['descr'],
                values: [`${newDescr}`],
            }),
        });

        const data = await response.json();

        if (data.message) {
            toast.error(data.message);
        }

        if (data.success) {
            updateProfile({ descr: newDescr })
            setNewDescr(null);

            toast.success(t("descr-updated-success"));
        }
    }

    const fillSubjects = (schedule: LessonsSchedule) => {
        const subjectsSet = new Set<string>();
    
        Object.values(schedule).forEach((daySchedule) => {
            Object.values(daySchedule).forEach((lesson) => {
                subjectsSet.add(lesson.Subject);
            });
        });
    
        const uniqueSubjects = Array.from(subjectsSet);

        setSubjects(uniqueSubjects);
    };

    const getLessons = useCallback(async (date: string) => {
        const response = await fetch('/api/post-get-weekly-lessons', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                date,
            }),
        });

        const data = await response.json();

        if (data.error && data.message) {
            toast.error(data.message);
        }

        if (profile.role === 'student') {
            fillSubjects(data);
        }

        setLessons(data);
    }, [profile.role])

    const getTeachersSubjects = useCallback(async () => {
        const response = await fetch('/api/get-teacher-subjects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        setSubjects(data);
    }, []);

    const changeDescription = (newDescription: string) => {
        newDescription.trim() !== '' ? setNewDescr(newDescription) : setNewDescr(profile.descr)
    }

    const getData = useCallback(async () => {
        try {
            const response = await fetch('/api/get-lessons-dates', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();

            if (data.error && data.message) {
                toast.error(data.message);
                return;
            }

            if (Object.keys(data).length > 0) {
                const firstDate: string = Object.keys(data)[0];
                await getLessons(firstDate);
                setActiveDate(firstDate);
                setDates(data);
            } else {
                console.log('no lessons logic');
            }
        } catch (error) {
            toast.error('Failed to fetch dates');
            console.error(error);
        }
    }, [getLessons]);

    useEffect(() => { 
        getData();

        if (profile.role === 'teacher') {
            getTeachersSubjects()
        }
    }, [getData, getTeachersSubjects, profile.role]);

    useEffect(() => {
        if (activeDate) {
            getLessons(activeDate);
        }
    }, [activeDate, getLessons])
    
    return (
        <>
            <h1 className={h1()}>{profile.name} {profile.surname}</h1>
            <textarea value={newDescr || ''} onChange={(e) => changeDescription(e.target.value)} className={textarea()} placeholder={getTextareaPlaceholder()} />
            <Button classes="mb-[20px] py-[10px]" variant="orangeBorder" label={t("save")} onClick={saveDescr} />
            <h2 className={h2()}>{getSubjectsHeader()}</h2>
            <Subjects subjects={subjects} setSubjects={setSubjects} />
            <h2 className={h2()}>{t("h2-schedule")}</h2>
            <Dates dates={dates} setDate={setActiveDate} activeDate={activeDate} />
            <Schedule lessons={lessons} />
        </>
    )
}