import { type JSX } from "react";
type HeaderProps = {
  style?: string;
};
export const Header = ({ style }: HeaderProps): JSX.Element => {
  return (
    <div
      className={`bg-center bg-no-repeat bg-cover ${style ?? ""} overflow-hidden`}
      style={{ backgroundImage: "url('/background.jpg')" }}
    ></div>
  );
};
