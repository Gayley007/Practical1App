import React from "react";
import MainStackNavigator from "./navigation/MainStackNavigator";
import { ThemeProvider } from "./theme/Theme";

export default function App() {
  return (
    <ThemeProvider>
      <MainStackNavigator />
    </ThemeProvider>
  );
}
