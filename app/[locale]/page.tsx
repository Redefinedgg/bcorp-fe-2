import { getMessages } from "next-intl/server";
import Hero from "../components/hero";
import Education from "../components/education";
import WhyWe from "../components/why";
import AboutUs from "../components/aboutUs";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const messages: any = await getMessages({ locale });
  const title = messages.Header.homeTitle;

  return {
    title,
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Education />
      <WhyWe />
      <AboutUs />
    </main>
  );
}
