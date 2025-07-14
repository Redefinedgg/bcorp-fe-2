import { cva } from "class-variance-authority";
import React from "react";
import { ButtonProps } from "../types/uiButton";

const styles = cva(['rounded-[100px] px-[35px] text-[18px] leading-[15.50px] font-bold whitespace-nowrap transition-all hover:scale-95'], {
    variants: {
        variant: {
            orangeBorder: "bg-transparent border-[3px] border-orange text-orange", // Стиль для orangeBorder
            fullOrange: "bg-orange text-white",
            transparent: "border-[3px] border-white text-white bg-transparent", // Стиль для transparent
        }
    }
});

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant,
  classes = '',
  type = 'button',
}) => {
  return (
    <button type={type} className={classes + ` ${styles({ variant })}`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
