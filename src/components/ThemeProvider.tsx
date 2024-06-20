"use client";

import { createContext, useContext, useEffect } from "react";

import { type Theme, useBrowserTheme } from "../hooks/useBrowserTheme";

const ThemeContext = createContext<Theme>("light");

type Props = {
  theme: Theme;
  children: React.ReactNode;
};

const ThemeProvider = ({ theme, children }: Props) => {
  const { theme: localTheme } = useBrowserTheme();
  const currentTheme = localTheme ?? theme;

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const { theme: localTheme } = useBrowserTheme();
  const globalTheme = useContext(ThemeContext);

  return localTheme ?? globalTheme;
};

export { ThemeProvider, useTheme };
