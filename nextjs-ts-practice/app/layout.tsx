import type { Metadata } from "next";
import { roboto } from "./fonts";
import "./globals.css";
import Navigation from "./components/navigation";
import ClickButton from "./components/click-button";

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
  return (
    <html lang="en" className="light">
      <body className={roboto.className}>
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
          <div className="flex items-center min-h-32 m-12">{children}</div>
          <Navigation />
          <ClickButton />
        </main>
      </body>
    </html>
  );
}
