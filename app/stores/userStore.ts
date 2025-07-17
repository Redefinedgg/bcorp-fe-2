import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserProfile } from "../types/user";
import { UserState } from "../types/userState";

const useUserStore = create(
  persist(
    (set) => ({
      profile: {
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
      isLoggedIn: false,
      jwtToken: null,

      setIsLoggedIn: (isLoggedIn: boolean) =>
        set((state: UserState) => ({
          ...state,
          isLoggedIn,
        })),

      login: (profile: UserProfile, token: string) =>
        set({
          profile,
          isLoggedIn: true,
        }),

      logout: () =>
        set({
          profile: {
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
          isLoggedIn: false,
        }),

      updateProfile: (profile: Partial<UserProfile>) =>
        set((state: UserState) => ({
          profile: { ...state.profile, ...profile },
        })),
    }),
    {
      name: "user-store",
      partialize: (state: UserState) => ({
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);

export default useUserStore;
