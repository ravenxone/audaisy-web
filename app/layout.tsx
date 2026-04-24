import type { Metadata } from "next";
import {
  Arimo,
  Cedarville_Cursive,
  Just_Me_Again_Down_Here,
} from "next/font/google";

import "./globals.css";

const displayFont = Just_Me_Again_Down_Here({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const arimo = Arimo({
  subsets: ["latin"],
  variable: "--font-arimo",
});

const cedarvilleCursive = Cedarville_Cursive({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cedarville",
});

export const metadata: Metadata = {
  title: "Audaisy",
  description:
    "Audaisy turns writing into intimate, local-first audiobooks with a voice and an audience.",
  icons: {
    icon: "/images/daisy-logo.png",
    shortcut: "/images/daisy-logo.png",
    apple: "/images/daisy-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${displayFont.variable} ${arimo.variable} ${cedarvilleCursive.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
