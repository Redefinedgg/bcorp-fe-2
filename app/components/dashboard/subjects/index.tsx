import { useGlobalContext } from "@/app/context/GlobalContext";
import useUserStore from "@/app/stores/userStore";
import { cva } from "class-variance-authority";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-toastify";

const subjectBtns = cva(['grid grid-cols-5 gap-[20px] mb-[20px]']);
const subjectButton = cva([ "py-2 w-full schedule-btn rounded-full text-white transition-all hover:scale-95"], {
    variants: {
        picked: {
            true: "schedule-picked-btn",
            false: "schedule-btn"
        },
        teacher: {
            true: "mb-[5px]",
            false: ""
        }
    }
});
const subjectItemWrapper = cva(['relative flex']);
const subjectRemoveBtn = cva(['absolute flex items-center right-[-5px] top-[-5px] justify-center text-[10px] bg-red-500 rounded-[30px] bg-white text-orange w-[20px] h-[20px] border-[1px] border-orange cursor-pointer transition-all hover:scale-95']);
const newSubjectWrapper = cva(['relative flex flex-col items-center']);
const newSubjectInput = cva(['w-full h-full mb-[5px] rounded-full border border-orange pl-[10px] pr-[30px] py-[8px] placeholder:text-[14px]']);
const newSubjectBtn = cva(['absolute right-[8px] top-[20%] flex items-center text-[25px] text-orange h-[45%] font-bold rounded-full p-1 cursor-pointer']);

export default function Subjects({ subjects, setSubjects }: { subjects: string[], setSubjects?: (subjects: string[]) => void }) {
    const { pickedLesson, setPickedLesson } = useGlobalContext();
    const { profile } = useUserStore();
    const [newSubject, setNewSubject] = useState<string>("");
    const t = useTranslations("Dashboard");

    const handleAddSubject = async () => {
        if (newSubject.trim() !== "") {
            const response = await fetch('/api/post-new-subject', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  subject: newSubject
                }),
            });
    
            const data = await response.json();
        
            if (data.message) {
                toast.error(data.message);
            }
    
            if (data.success) {
                if (setSubjects) {
                    setSubjects([...subjects, newSubject]);
                }

                setNewSubject("");

                toast.success(t("subject-added"))
            }
        } else {
            toast.error(t("subject-required"));
        }
    };

    const sendRemoveSubject = async (subjectToRemove: string) => {
        if (setSubjects) {
            const response = await fetch(`/api/delete-teachers-subject?subject=${subjectToRemove}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  subject: newSubject
                }),
            });
    
            const data = await response.json();
    
            if (data.message) {
                toast.error(data.message);
            }
    
            if (data.success) {
                setSubjects(subjects.filter(subject => subject !== subjectToRemove));

                toast.success(t("subject-removed"))
            }
        }
    }

    return (
        <div className={subjectBtns()}>
            {subjects.map((subject, index) => (
                <div className={subjectItemWrapper()} key={index}>
                    <button
                        className={subjectButton({ picked: subject === pickedLesson, teacher: profile.role?.toLowerCase() === 'teacher' })}
                        onClick={() => setPickedLesson(subject)}
                        >
                        {subject}
                    </button>
                    {profile.role?.toLowerCase() === 'teacher' && (
                        <span 
                            className={subjectRemoveBtn()} 
                            onClick={() => sendRemoveSubject(subject)}
                        >
                            X
                        </span>
                    )}
                </div>
            ))}
            {profile.role?.toLowerCase() === 'teacher' && (
                <div className={newSubjectWrapper()}>
                    <input
                        type="text"
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                        placeholder={t("new-subject")}
                        className={newSubjectInput()}
                    />
                    <button
                        className={newSubjectBtn()}
                        onClick={handleAddSubject}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
