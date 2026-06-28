import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Vazirmatn } from "next/font/google";
import { Providers } from "./providers";
import { ThemeInitScript } from "@/components/theme-init";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteFlow — Notes & Notebooks",
  description: "A clean, keyboard-friendly workspace for notes, tags, and notebooks.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${vazirmatn.variable}`} suppressHydrationWarning>
      <head>
        <ThemeInitScript />
      </head>
      <body suppressHydrationWarning className="font-sans">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
