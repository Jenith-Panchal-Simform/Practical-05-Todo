import { type JSX } from "react";
type ButtonProps = {
  text: string;
  click: () => void;
};
export const Button = ({ text, click }: ButtonProps): JSX.Element => {
  return (
    <button className="hover:text-gray-500 cursor-pointer" onClick={click}>
      {text}
    </button>
  );
};
