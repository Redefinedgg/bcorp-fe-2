import { cva } from "class-variance-authority";
import LangDropDown from "./LangDropDown";
import Avatar from "./Avatar";
import NavBar from "./NavBar";
import LogoLink from "./LogoLink";

const header = cva(['header-shadow relative z-[99]']);
const wrapper = cva(['container flex justify-between items-center min-h-[64px]']);
const rightWrapper = cva(['flex justify-between items-center w-[93px]']);

export default function Header(){
    return (
        <header className={header()}>
            <div className={wrapper()}>
                <LogoLink />
                <NavBar />
                <div className={rightWrapper()}>
                    <LangDropDown />
                    <Avatar />
                </div>
            </div>
        </header>
    )
}