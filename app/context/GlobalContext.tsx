// app/context/GlobalContext.tsx

'use client'

import { createContext, useContext, useState, ReactNode } from "react";

type GlobalContextType = {
  activeMenu: boolean;
  setActiveMenu: (menu: boolean) => void;
  langMenuOpen: boolean;
  setLangMenuOpen: (open: boolean) => void;
  pickedLesson: string;
  setPickedLesson: (lesson: string) => void;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [langMenuOpen, setLangMenuOpen] = useState<boolean>(false);
  const [pickedLesson, setPickedLesson] = useState<string>("");

  return (
    <GlobalContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        langMenuOpen,
        setLangMenuOpen,
        pickedLesson,
        setPickedLesson,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
