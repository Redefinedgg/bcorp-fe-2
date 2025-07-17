export interface UserProfile {
    id: number | null;
    name: string | null;
    birthDate: string | null;
    surname: string | null;
    email: string | null;
    tokens: number | null;
    descr: string | null;
    avatar: string | null;
    emailVerificationToken: string | null;
    emailVerified: boolean | null;
    smallAvatar: string | null;
    registrationType: string | null;
    role: rolesEnum | null;
    lessons: Record<string, Record<string, { id: number; Subject: string; Teacher: string; Student: string; }>>;
}

export interface LessonsSchedule {
    lessons: Record<string, Record<string, { id: number; Subject: string; Teacher: string; Student: string; }>>;
}

export enum rolesEnum {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
  }
  