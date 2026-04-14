import type { Metadata } from "next";
import { Just_Me_Again_Down_Here, Special_Elite } from "next/font/google";

import "./globals.css";

const displayFont = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const bodyFont = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-typewriter",
});

export const metadata: Metadata = {
  title: "Audaisy",
  description:
    "Audaisy turns writing into intimate, local-first audiobooks with a voice and an audience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
