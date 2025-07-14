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
    role: string | null;
}