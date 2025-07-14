import { UserProfile } from "./user";

export interface UserState {
    profile: UserProfile;
    isLoggedIn: boolean;

    login: (profile: UserProfile, token: string) => void;
    logout: () => void;
    updateProfile: (profile: Partial<UserProfile>) => void;
    setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export interface profilesState {
    currentUserProfile: UserProfile;

    setCurrentUserProfile: (profile: UserProfile) => void;
}