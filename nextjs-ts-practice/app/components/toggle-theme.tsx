"use client";

import useToggleTheme from "@/hooks/use-toggle-theme";

const modeIcons = {
  light: "⚪",
  dark: "🟣",
};

export default function ToggleTheme() {
  const { theme, toggleTheme } = useToggleTheme();

  return <button onClick={toggleTheme}>{modeIcons[theme]}</button>;
}
