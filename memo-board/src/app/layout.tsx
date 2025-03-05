import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "@/redux/StoreProvider";
import Main from "./components/main";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memo Board",
  description: "A memo application to easily create, manage, and share memos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-auto w-screen p-10`}>
        <StoreProvider>
          <SessionProvider>
            <Header />
            <Main>
              {children}
              <ToastContainer />
            </Main>
          </SessionProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
