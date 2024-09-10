import { cookies } from "next/headers";
import { Theme } from "@/types/theme";

export default function useServerTheme(defaultTheme = "dark"): Theme {
  return (cookies().get("theme")?.value as Theme) ?? defaultTheme;
}
