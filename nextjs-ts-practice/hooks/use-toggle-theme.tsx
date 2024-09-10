import { useState } from "react";

type Theme = "light" | "dark";

export default function useToggleTheme(defaultTheme: Theme = "light") {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // document.documentElement.classList.remove("light", "dark");
    // document.documentElement.classList.add(newTheme);

    // document.documentElement.classList.toggle("light", theme === "dark");
    // document.documentElement.classList.toggle("dark", theme === "light");

    // document.documentElement.className = newTheme;

    document.documentElement.classList.replace(theme, newTheme);
  };

  return { theme, toggleTheme };
}
