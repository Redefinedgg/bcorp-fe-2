"use client";

import { cva } from "class-variance-authority";
import Modal from "../modal";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/app/ui/Button";
import { useModalStore } from "@/app/stores/modalStore";
import { toast } from "react-toastify";
import useUserStore from "@/app/stores/userStore";
import { useNavigation } from "@/app/hooks/useNavigation";


const wrapper = cva(['modal-bg']);
const h2 = cva(['text-center text-[25px] font-signate text-white mb-[20px]'])
const inputWrapper = cva(['flex flex-col mb-[30px]'])
const label = cva(['text-white font-semibold']);
const input = cva(['rounded-[50px] px-[17px] py-[10px]']);
const btnWrapper = cva(['flex justify-center mb-[30px]']);
const btnsWrapper = cva(['flex flex-col justify-start']);
const p = cva(['text-white text-center']);
const btn = cva(['font-bold text-white']);

const LoginModal = () => {
  const { isLoginOpen, closeLoginModal, openRegisterModal } = useModalStore();
  const { setIsLoggedIn, updateProfile } = useUserStore();
  const { goToDashboard } = useNavigation();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const t = useTranslations("Login-modal");

  const handleLogin = async (event: React.SyntheticEvent) => {
      event.preventDefault();

      const response = await fetch('/api/post-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
    
      const data = await response.json();
  
      if (data.error && data.message) {
        toast.error(data.message);
      }
  
      if (data.token) {
        document.cookie = `authToken=${data.token}; path=/; max-age=${3 * 60 * 60};`;
        setIsLoggedIn(true);
        updateProfile(data.user);

        toast.success(t("success-login"));
        closeLoginModal(); 
        goToDashboard();
      }
  };

  const handleRegister = () => {
    closeLoginModal();
    openRegisterModal();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleLogin(event);
    }
  };

  return (
    <Modal isOpen={isLoginOpen} onClose={closeLoginModal} wrapperClasses="modal-bg">
      <div className={wrapper()}>
        <h2 className={h2()}>{t("header")}</h2>

        <form onKeyDown={handleKeyDown}>
          <div className={inputWrapper()}>
            <label htmlFor="email" className={label()}>
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={input()}
              placeholder="e-mail@gmail.com"
            />
          </div>

          <div className={inputWrapper()}>
            <label htmlFor="password" className={label()}>
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={input()}
              placeholder="********"
            />
          </div>

          <div className={btnWrapper()}>
            <Button
              classes="py-[20px]"
              variant="transparent"
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleLogin(event)}
              label={t("btn-1")}
            />
          </div>
        </form>
        <div className={btnsWrapper()}>
            <p className={p()}>{t("p")}</p>
            <button onClick={handleRegister} className={btn()}>{t("btn-2")}</button>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;