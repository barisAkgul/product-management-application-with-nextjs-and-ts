"use client";
import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { getFromLocalStorage } from "@/utils/general";

export interface ThemeContextType {
  theme: string;
  toggle: () => void;
}

// type Themes = "dark" | "light" | "system";
// type ThemeContextType = {
//   theme: Themes;
//   setTheme(theme: Themes): void;
//   toggle: () => void;
// };

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  // Initialize theme state with a default value from local storage
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage("theme", "light");
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
