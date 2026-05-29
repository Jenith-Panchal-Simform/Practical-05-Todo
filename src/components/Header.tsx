import { type JSX } from "react";

export const Header = (): JSX.Element => {
  return (
    <header
      className="bg-center bg-no-repeat bg-cover flex-3 overflow-hidden"
      style={{ backgroundImage: "url('/background.jpg')" }}
    ></header>
  );
};
