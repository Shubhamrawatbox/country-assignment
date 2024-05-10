import React, { createContext, useState, useContext, useEffect } from "react";

interface ThemeContextValue {
  initialTheme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  initialTheme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme: string;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme,
}) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("mode") ?? initialTheme
  );

  useEffect(() => {
    localStorage.setItem("mode", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ initialTheme: theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export default ThemeProvider;
