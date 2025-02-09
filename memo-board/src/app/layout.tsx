import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import { StoreProvider } from "@/redux/StoreProvider";

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
      <body className={`${inter.className} w-screen h-screen`}>
        <div className="mx-auto p-10 w-full h-full">
          <StoreProvider>
            <SessionProvider>
              <Header />
              {children}
              <ToastContainer />
            </SessionProvider>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
