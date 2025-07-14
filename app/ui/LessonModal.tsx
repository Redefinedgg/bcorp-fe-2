"use client"

import { cva } from "class-variance-authority";
import Modal from "../components/modal";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import useUserStore from "../stores/userStore";

const h2 = cva(['font-signate text-[60px] text-center whitespace-nowrap']);
const mainInfoWrapper = cva(['w-full flex flex-col items-center justify-center']);
const infoWrapper = cva(['flex justify-between w-[70%] mb-[25px]']);
const subjectStyles = cva(['schedule-picked-btn text-white text-center rounded-[50px]'], {
    variants: {
        second: {
            false: "py-[10px] px-[97px]",
            true: "py-[10px] px-[15px]"
        }
    }
});
const dateStyles = cva(['border border-[2px] border-[#92CFF0] text-[#92CFF0] px-[23px] py-[10px] rounded-[50px]']);
const actions = cva(['flex w-[70%]'], {
    variants: {
        teacher: {
            true: "justify-between",
            false: "justify-center",
        }
    }
})
const chatButton = cva(['flex justify-between items-center education-card-1 p-[10px] rounded-[50px]']);
const avatar = cva(['flex items-center justify-center block w-[82px] h-[82px] rounded-full']);
const fullname = cva(['text-[18px] text-white mr-[25px]']);
const messageIcon = cva(['flex justify-center items-center block w-[82px] h-[82px] rounded-full bg-white']);
const deleteLessonStyles = cva(['']);

export default function LessonModal({ lessonId, isModalOpen, onClose, subject, date, time, email }: { lessonId: number, isModalOpen: boolean, onClose: () => void, subject: string; date: string; time: string; email: string}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [userInfo, setUserInfo] = useState<{ fullName: string; smallAvatar: string }>();
    const { profile } = useUserStore();
    const t = useTranslations("LessonsModal");

    const getProfileInfo = useCallback(async () => {
        const response = await fetch('/api/post-get-profile-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                select: ['name', 'surname', 'smallAvatar'],
            }),
        });

        const data = await response.json();

        if (data.message) {
            toast.error(data.message);
        }

        if (data.name) {
            setUserInfo({ fullName: `${data.name} ${data.surname}`, smallAvatar: data.smallAvatar });

            setLoading(false);
        }
    }, [email]);

    useEffect(() => {
        getProfileInfo();
    }, [getProfileInfo])

    const openChat = () => {
        console.log('open chat pressed');
    }

    const cancelLesson = async () => {
        const response = await fetch('/api/patch-cancel-lesson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lessonId
            }),
        });

        const data = await response.json();

        if (data.message) {
            toast.error(data.message);
        }

        if (data.success) {
            toast.success(t("removed-success"))
            onClose();
        }
    }

    return (
        <Modal isOpen={isModalOpen} onClose={onClose}>
            {loading ? 'Loading...'
            :
                <>            
                    <h2 className={h2()}>{t("lesson-info")}</h2>
                    <div className={mainInfoWrapper()}>
                        <div className={infoWrapper()}>
                            <span className={subjectStyles({ second: false })}>{subject}</span>
                            <span className={dateStyles()}>{date}</span>
                            <span className={subjectStyles({ second: true })}>{time}</span>
                        </div>
                        <div className={actions({ teacher: profile.role === 'teacher' })}>
                            <button onClick={openChat} className={chatButton()}>
                                <span className={avatar()}>
                                    {userInfo?.smallAvatar ?
                                        <Image src={userInfo.smallAvatar} alt='Users image' width={41} height={27} />
                                        :
                                        <Image src='/avatarDefault.svg' alt='Default users image' width={41} height={27} />
                                    }
                                </span>
                                <span className={fullname()}>{userInfo?.fullName}</span>
                                <span className={messageIcon()}>
                                    <Image src='/chatButton.svg' alt='open chat image' width={41} height={27} />
                                </span>
                            </button>
                            {profile.role === 'teacher' &&
                                <button className={deleteLessonStyles()} onClick={cancelLesson}>
                                    Cancel
                                </button>
                            }
                        </div>
                    </div>
                </>
            }
        </Modal>
    );
}