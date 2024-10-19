import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
import Navigation from "@/components/navigation";
import ClickButton from "@/components/click-button";
import useServerTheme from "@/hooks/use-server-theme";

export const metadata: Metadata = {
  title: {
    template: "%s | Next JS",
    default: "Hello, Next JS",
  },
  description: "This is Nextjs app for practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = useServerTheme();
  return (
    <html lang="en" className={theme}>
      <body className={roboto.className}>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <div className="flex justify-center items-center min-h-screen m-12 w-full">
            {children}
          </div>
          <Navigation />
          <ClickButton />
        </main>
      </body>
    </html>
  );
}
