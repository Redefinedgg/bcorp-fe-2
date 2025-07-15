import { UserProfile } from "../types/user";

export const checkLoginAndOpenModal = (profile: UserProfile | null, openModal: () => void, closeLoginModal: () => void) => {
  if (!profile?.id) openModal();
  else {
    closeLoginModal(); 
  }
};
