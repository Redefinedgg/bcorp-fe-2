"use client";

import { cva } from "class-variance-authority";
import Select, { StylesConfig } from 'react-select'
import { SingleValue } from 'react-select';
import Modal from "../modal";
import { useState } from "react";
import { useTranslations } from "next-intl";
import Button from "@/app/ui/Button";
import { useModalStore } from "@/app/stores/modalStore";
import useLocaleStore from "@/app/stores/localeStore";
import { toast } from "react-toastify";

const h2 = cva([' text-[25px] font-signate font-bold text-orange mb-[20px]'])
const inputWrapper = cva(['flex flex-col mb-[15px]'])
const label = cva(['text-orange font-semibold']);
const input = cva(['bg-[#EEEEEE] rounded-[50px] px-[17px] py-[10px] cursor-pointer']);
const btnWrapper = cva(['flex justify-center mb-[15px]']);
const btnsWrapper = cva(['flex flex-col justify-start']);
const p = cva(['text-orange text-center']);
const btn = cva(['font-bold text-orange']);

const RegisterModal = () => {
  const { isRegisterOpen, closeRegisterModal, openLoginModal } = useModalStore();
  const { locale } = useLocaleStore();
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const t = useTranslations("Register-modal");

  const handleRegister = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const response = await fetch('/api/post-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        role,
        birthDate,
        password,
        repeatPassword,
        locale
      }),
    });
  
    const data = await response.json();

    if (data.error && data.message) {
      toast.error(data.message);
    }

    if (data.token) {
      toast.success(t("success-register"));
      closeRegisterModal();
      openLoginModal();
    }
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    closeRegisterModal();
    openLoginModal();
  };

  const selectOptions = [
    { value: 'student', label: t("select-1") },
    { value: 'teacher', label: t("select-2") }
  ]

  const handleRoleChange = (selected: SingleValue<{ value: string; label: string }>) => {
    setRole(selected?.value || "");
  };

  const customStyles: StylesConfig<{ value: string; label: string }> = {
    control: (base, state) => ({
      ...base,
      cursor: 'pointer',
      borderColor: state.isFocused ? 'orange' : 'orange',
      borderWidth: '2px',
      borderRadius: '30px',
      boxShadow: state.isFocused ? '0 0 0 0 rgba(255, 165, 0, 0.5)' : 'none',
      '&:hover': {
        borderColor: 'darkorange',
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '30px',
      overflow: 'hidden',
      margin: '0',
      padding: '0',
    }),
    menuList: (base) => ({
      ...base,
      padding: '5px',
      overflowX: 'hidden',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'rgba(255, 165, 0, 0.2)' : 'white',
      color: 'black',
      borderRadius: '30px',
      padding: '10px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 165, 0, 0.4)',
      },
      ':active': {
        backgroundColor: 'rgba(255, 165, 0, 0.6)',
      },
    }),
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleRegister(event);
    }
  };

  return (
    <Modal isOpen={isRegisterOpen} onClose={closeRegisterModal}>
      <h2 className={h2()}>{t("header")}</h2>

      <form onKeyDown={handleKeyDown}>
        <div className={inputWrapper()}>
          <label htmlFor="name" className={label()}>
            {t("label-1")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={input()}
            placeholder={t("placeholder-1")}
          />
        </div>

        <div className={inputWrapper()}>
          <label htmlFor="date" className={label()}>
            {t("label-2")}
          </label>
          <input
            id="date"
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className={input()}
            placeholder={t("placeholder-2")}
          />
        </div>

{/* Блок "Кто вы"
        <div className={inputWrapper()}>
          <label htmlFor="role" className={label()}>
            {t("label-3")}
          </label>
          <Select
            id="role"
            options={selectOptions}
            isMulti={false}
            onChange={handleRoleChange}
            styles={customStyles}
          />
        </div> */}

        <div className={inputWrapper()}>
          <label htmlFor="email" className={label()}>
            {t("label-4")}
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
            {t("label-5")}
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

        <div className={inputWrapper()}>
          <label htmlFor="repeatPassword" className={label()}>
            {t("label-6")}
          </label>
          <input
            id="repeatPassword"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className={input()}
            placeholder="********"
          />
        </div>

        <div className={btnWrapper()}>
          <Button classes="py-[20px]" variant="fullOrange" onClick={handleRegister} label={t("btn-1")} />
        </div>
        <div className={btnsWrapper()}>
          <p className={p()}>{t("p")}</p>
          <button onClick={(event) => handleLogin(event)} className={btn()}>{t("btn-2")}</button>
        </div>
      </form>
    </Modal>
  );
};

export default RegisterModal;
