import React from "react";
import MainStackNavigator from "./navigation/MainStackNavigator";
import { ThemeProvider } from "./theme/Theme";

export default function Index() {
  return React.createElement(
    ThemeProvider,
    null,
    React.createElement(MainStackNavigator),
  );
}
