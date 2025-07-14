export type Lesson = {
    id: number;
    Subject: string;
    Teacher: string;
    Student: string;
};

export type DaySchedule = {
    [time: string]: Lesson;
};

export type LessonsSchedule = {
    [day: string]: DaySchedule;
};