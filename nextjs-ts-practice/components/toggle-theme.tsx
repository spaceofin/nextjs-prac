"use client";

import useToggleTheme from "@/hooks/use-toggle-theme";
import { Theme } from "@/types/theme";

const modeIcons = {
  light: "🟣",
  dark: "🟡",
};

export default function ToggleTheme({
  defaultTheme,
}: {
  defaultTheme?: Theme;
}) {
  const { theme, toggleTheme } = useToggleTheme(defaultTheme);

  return <button onClick={toggleTheme}>{modeIcons[theme]}</button>;
}
