import { useState } from "react";
import { useCookies } from "react-cookie";
import { Theme } from "@/types/theme";

export default function useToggleTheme(defaultTheme: Theme = "light") {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [_, setCookie] = useCookies(["theme"]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCookie("theme", newTheme);

    document.documentElement.classList.replace(theme, newTheme);
  };

  return { theme, toggleTheme };
}
