import { useState } from "react";
import Cookies from "js-cookie";
import { Theme } from "@/types/theme";

export default function useToggleTheme(defaultTheme: Theme = "light") {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    Cookies.set("theme", newTheme);

    document.documentElement.classList.replace(theme, newTheme);
  };

  return { theme, toggleTheme };
}
