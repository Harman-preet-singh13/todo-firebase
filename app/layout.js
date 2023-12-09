"use client";
import Navbar from "./components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthContextProvider } from "./context/AuthContext";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <AuthContextProvider>
          <Navbar />
          <div className="max-w-[1024px] mx-auto">{children}</div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
