import { UserProfile } from "./user";

export interface profilesState {
    currentUserProfile: UserProfile;

    setCurrentUserProfile: (profile: UserProfile) => void;
}