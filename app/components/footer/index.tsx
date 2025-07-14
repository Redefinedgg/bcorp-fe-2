import { cva } from "class-variance-authority";
import Image from "next/image";
import Lists from "./Lists";
import ScrollToTopButton from "./ScrollToTop";

const footer = cva(['bg-orange py-[50px]']);
const wrapper = cva(['container flex justify-between items-center']);

export default function Footer() {
    return (
        <footer className={footer()}>
            <div className={wrapper()}>
                <Image width={140.51} height={120} alt="Footer logo" src="/imgs/FooterLogo.png" />
                <Lists />
                <ScrollToTopButton />
            </div>
        </footer>
    )
}
