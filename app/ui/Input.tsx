import { cva } from "class-variance-authority";
import React from "react";
import { InputProps } from "../types/uiInput";

const Input: React.FC<InputProps> = ({
  label,
  labelFontSize = '20',
  fontSize = '24',
  placeholder,
  value,
  width = '350px',
  height = '400px',
  onChange,
  variant,
  classes = '',
  type = 'text',
  isTextArea = false,
  rounded = '30px'
}) => {
  // Функция для извлечения margin-left из classes
  const extractMarginLeft = (classString: string): number => {
    const mlMatch = classString.match(/ml-\[(\d+)px\]/);
    return mlMatch ? parseInt(mlMatch[1], 10) : 0;
  };

  // Извлекаем значение margin-left из classes
  const additionalMarginLeft = extractMarginLeft(classes);
  const totalMarginLeft = 20 + additionalMarginLeft;

  // Удаляем ml-[*px] из classes, чтобы не дублировать
  const cleanedClasses = classes.replace(/ml-\[\d+px\]/g, '').trim();

  const p = cva([`ml-[20px] mb-[-20px] font-signate max-w-[70%] font-bold mb-[10px]`]);
  
  const styles = cva([`px-[35px] leading-[15.50px] font-bold transition-all focus:scale-95 focus:outline-none`], {
      variants: {
          variant: {
              orangeBorder: "bg-transparent border-[3px] border-orange text-orange focus:outline-none",
              fullOrange: "bg-orange text-white focus:outline-none",
              transparent: "border-[3px] border-white text-white bg-transparent focus:outline-none",
          }
      }
  });

  return (
    <div>
      <p 
        className={cleanedClasses + ` ${p()}`}
        style={{ 
          fontSize: `${labelFontSize}px`,
          marginLeft: `${additionalMarginLeft}px`
        }}
      >
        {label}
      </p>
      {isTextArea ? (
        <textarea 
          value={value} 
          onChange={onChange} 
          className={cleanedClasses + ` ${styles({ variant })}`} 
          placeholder={placeholder} 
          style={{ 
            width, 
            height, 
            fontSize: `${fontSize}px`, 
            paddingBlock: '10px',
            borderRadius: rounded,
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            overflowWrap: 'break-word'
          }} 
        />
      ) : (
        <input 
          type={type} 
          value={value} 
          onChange={onChange} 
          className={cleanedClasses + ` ${styles({ variant })}`} 
          placeholder={placeholder} 
          style={{
            width, 
            height, 
            fontSize: `${fontSize}px`,
            borderRadius: rounded,
            wordWrap: 'break-word',
            overflowWrap: 'break-word'
          }} 
        />
      )}
    </div>
  );
};

export default Input;