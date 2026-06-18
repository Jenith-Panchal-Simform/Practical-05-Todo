import { useState, type ReactNode } from "react";

import { ThemeContext } from "./ThemeContext";

type ThemeProviderPropsType = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderPropsType) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
