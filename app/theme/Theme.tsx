import React, { createContext, useContext, useState } from "react";

export type ThemeColors = {
  background: string;
  card: string;
  headerCard: string;
  primaryText: string;
  secondaryText: string;
  border: string;
  buttonBg: string;
  buttonText: string;
  placeholder: string;
};

type ThemeContextValue = {
  isDark: boolean;
  theme: ThemeColors;
  toggleTheme: () => void;
};

// Light and dark palettes used across all screens.
const lightTheme: ThemeColors = {
  background: "#f2f2f2",
  card: "#ffffff",
  headerCard: "#c8d8e4",
  primaryText: "#2b6777",
  secondaryText: "#4b7b8a",
  border: "#c8d8e4",
  buttonBg: "#52ab98",
  buttonText: "#ffffff",
  placeholder: "#c8d8e4",
};

const darkTheme: ThemeColors = {
  background: "#0e1416",
  card: "#22363d",
  headerCard: "#2a464f",
  primaryText: "#d7e6ef",
  secondaryText: "#a9c2cf",
  border: "#365058",
  buttonBg: "#2a685b",
  buttonText: "#102127",
  placeholder: "#48666f",
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((prev) => !prev);
  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside ThemeProvider");
  }

  return context;
}
