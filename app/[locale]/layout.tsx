import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { GlobalProvider } from "../context/GlobalContext";
import Header from "../components/header";
import Footer from "../components/footer";
import LoginModal from "../components/modal/LoginModal";
import RegisterModal from "../components/modal/RegisterModal";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className="font-roboto">
        <GlobalProvider>
          <NextIntlClientProvider messages={messages}>
              <Header />
              {children}
              <Footer />
              <LoginModal />
              <RegisterModal />
              <ToastContainer />
          </NextIntlClientProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
