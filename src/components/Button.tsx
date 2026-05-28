import { type JSX } from "react";
type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
};
export const Button = ({
  text,
  onClick,
  className,
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={`${className ?? ""}     cursor-pointer
    transition 
    duration-300 
    ease-in-out
    px-2
    py-1
    rounded-sm
    hover:bg-gray-500  
    hover:text-white 
    hover:scale-105 
    hover:shadow-lg `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
