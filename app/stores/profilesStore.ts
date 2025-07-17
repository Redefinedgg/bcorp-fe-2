import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "../types/user";
import { profilesState } from "../types/profilesState";

const useProfilesStore = create(
  persist(
    (set) => ({
      currentUserProfile: {
        id: null,
        name: null,
        surname: null,
        birthDate: null,
        email: null,
        tokens: null,
        avatar: null,
        smallAvatar: null,
        descr: null,
        role: null,
        emailVerificationToken: null,
        emailVerified: null,
        registrationType: null,
        lessons: {},
      },

      setCurrentUserProfile: (profile: UserProfile) =>
        set((state: profilesState) => ({
          ...state,
          currentUserProfile: profile,
        })),
    }),
    {
      name: "profiles-store",
      partialize: (state: profilesState) => ({
        currentUserProfile: state.currentUserProfile,
      }),
    }
  )
);

export default useProfilesStore;
