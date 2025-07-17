"use client";

import ProfileDescr from "@/app/components/profile/descr";
import ProfileTeacherSchedule from "@/app/components/profile/schedule";
import useProfilesStore from "@/app/stores/profilesStore";
import { rolesEnum } from "@/app/types/user";
import { cva } from "class-variance-authority";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import SpecialOffers from "@/app/components/specialOffers";

const wrapper = cva(['container']);
const section = cva(['flex']);

export default function Profile() {
    const { userId } = useParams();
    const { currentUserProfile, setCurrentUserProfile } = useProfilesStore(); // currentUserProfile - означает текущий профиль что выводится на фронте, например с айди 5, НО, не тот в который вошел чел

    // useEffect для получения профиля и обновления его в store
    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`/api/get-user-by-id?userId=${userId}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
            })

            const data = await response.json();
            setCurrentUserProfile(data);
        };
        fetchProfile();
    }, [userId]);
    
    return (
        <div className={wrapper()}>
            <ProfileDescr
                avatarUrl={currentUserProfile.avatar}
                role={currentUserProfile.role || ''}
                name={`${currentUserProfile.name} ${currentUserProfile.surname}`}
                descr={currentUserProfile.descr || ''}
                userId={Number(userId)}
            />
            {/* Рассписание + спец предложения */}
            <section className={section()}>
                {currentUserProfile.role === rolesEnum.TEACHER && <ProfileTeacherSchedule lessons={currentUserProfile.lessons} />}
                <SpecialOffers />
            </section>
        </div>
    )
}