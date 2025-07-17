"use client";

import Button from "@/app/ui/Button";
import Input from "@/app/ui/Input";
import { cva } from "class-variance-authority";
import { useState } from "react";
import Image from "next/image";

const btn = cva([
  "w-full",
  "h-[56px]",
  "text-center",
  "font-signate",
  "text-[25px]",
]);

const icon = cva(["ml-[300px]"]);
const paperclipIcon = cva(["ml-[325px] cursor-pointer"]);

export default function SpecialOffers() {
  const [isOpenedInput, setIsOpenedInput] = useState(false);
  const [specialOfferTextInput, setSpecialOfferTextInput] = useState("");
  const [inputFiles, setInputFiles] = useState<File[]>([]);

  const toggleInput = () => {
    setIsOpenedInput(!isOpenedInput);
  };

  const handleSpecialOfferTextInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSpecialOfferTextInput(event.target.value);
  };

  const openFileInput = () => {
    // Создаем скрытый input элемент
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.multiple = true; // позволяет выбрать несколько файлов
    fileInput.accept = "image/*,.pdf,.doc,.docx,.txt,.rtf"; // фото и документы

    // Обработчик изменения файлов
    fileInput.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      if (files) {
        setInputFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
      }
    };

    // Программно кликаем на input
    fileInput.click();

    console.log(inputFiles);
  };

  return (
    <div className="flex items-center justify-center">
      {isOpenedInput ? (
        <div>
          <Image
            title="Здесь вы можете пояснить/попросить/уточнить учителю необходимую вам информацию о вашем занятии."
            className={icon()}
            src="/info.svg"
            alt="info"
            width={24}
            height={24}
          />
          <Input
            label="Спец. предложение"
            placeholder="Опишите вид желаемой услуги!"
            value={specialOfferTextInput}
            onChange={handleSpecialOfferTextInputChange}
            variant="orangeBorder"
            classes="w-full h-[56px] ml-[25px]"
            isTextArea
          />
          <Image
            className={paperclipIcon()}
            src="/paperclip.svg"
            alt="paperclip"
            width={24}
            height={24}
            onClick={openFileInput}
          />
          {inputFiles && (
            <div className="flex">
              {Array.from(inputFiles).map((file, index) => (
                <div key={index} className="items-center ml-[25px]">
                  <p>{file.name}</p>
                  <p>{file.size} байт</p>
                  <p>{file.type}</p>
                  <button
                    onClick={() =>
                      setInputFiles((prevFiles) =>
                        prevFiles.filter((prevFile) => prevFile !== file)
                      )
                    }
                  >
                    Удалить
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <Button
          classes={btn()}
          label="Особые предложения"
          variant="fullOrange"
          onClick={toggleInput}
        />
      )}
    </div>
  );
}
