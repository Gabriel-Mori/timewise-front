import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { setCookie } from "nookies";

interface ProviderProps {
  children?: React.ReactNode;
  defaultTheme: "light" | "dark";
}

interface ContextProps {
  theme?: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  toogleTheme: () => void;
}

const ThemeContext = createContext<ContextProps>({
  setTheme: () => {},
  toogleTheme: () => {},
});

export const ThemeProvider: React.FC<ProviderProps> = ({
  children,
  defaultTheme,
}) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setCookie(null, "custom-theme", theme, {
      maxAge: 2147483647,
      path: "/",
    });
  }, [theme]);

  const toogleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toogleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ContextProps => useContext(ThemeContext);
