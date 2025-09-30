"use client";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import NavBarContainer from "@/components/navbar/NavBarContainer";

const ubuntu = Ubuntu({
  weight: ["400", "500", "700"], // Changed "600" to "700"
  subsets: ["latin"],
});


import React, { useState } from "react";
import { SearchContext } from "@/context/SearchContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  return (
    <html lang="en" className={ubuntu.className}>
      <body className="">
        <main className="w-full">
          <SearchContext.Provider value={{ searchResults, setSearchResults }}>
            <NavBarContainer onSearch={setSearchResults} />
            {children}
            <Footer />
          </SearchContext.Provider>
        </main>
      </body>
    </html>
  );
}
