import { create } from "zustand";
import { LocaleState } from "../types/localeState";

const useLocaleStore = create<LocaleState>((set) => ({
    locale: String(process.env.NEXT_PUBLIC_DEFAULT_LOCALE).toLowerCase(),
    setLocale: (locale: string) => set({ locale: locale.toLowerCase() }),
}));

export default useLocaleStore;
