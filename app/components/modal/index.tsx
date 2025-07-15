"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, ReactNode } from "react";
import { useEffect } from "react";
import { checkLoginAndOpenModal } from "@/app/utils/checkLoginAndOpenModal";
import useUserStore from "@/app/stores/userStore";
import { useModalStore } from "@/app/stores/modalStore";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  wrapperClasses?: string;
}

const Modal = ({ isOpen, onClose, children, wrapperClasses }: ModalProps) => {
  const { profile } = useUserStore();
  const { openLoginModal, closeLoginModal } = useModalStore();

  useEffect(() => {
    checkLoginAndOpenModal(profile, openLoginModal, closeLoginModal);
  }, [profile]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className={`fixed inset-0 flex items-center justify-center p-4`}>
          <Dialog.Panel
            className={`transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all ${wrapperClasses}`}
          >
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
