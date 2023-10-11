"use client";
import { Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import React from "react";
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const ContentRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <Theme appearance="light" accentColor="violet" className={inter.variable}>
      <NavBar />
      <main className="p-5">{children}</main>
    </Theme>
  );
};

export default ContentRoot;
