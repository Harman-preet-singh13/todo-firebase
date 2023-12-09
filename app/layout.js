"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContextProvider>
          <Head>
            <title>Todo-firebase</title>
          </Head>
          <Navbar />
          <div className="max-w-[1024px] mx-auto">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
