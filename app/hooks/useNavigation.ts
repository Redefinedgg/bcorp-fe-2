import { useRouter } from "next/navigation";
import useLocaleStore from "../stores/localeStore";

export const useNavigation = () => {
  const router = useRouter();
  const locale = useLocaleStore((state) => state.locale);

  const goToDashboard = () => {
    router.push(`/${locale}/dashboard`);
  };

  return {
    goToDashboard,
  };
};