import React, { type JSX } from "react";
type ButtonProps = {
  text: string;
};
export const Button = ({ text }: ButtonProps): JSX.Element => {
  return <button className="hover:text-gray-500 cursor-pointer">{text}</button>;
};
