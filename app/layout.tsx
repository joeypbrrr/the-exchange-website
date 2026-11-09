import type { Metadata } from "next";
import { Big_Shoulders, Geist, Permanent_Marker } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-display",
});

const script = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "The Exchange — Buy, Sell, Trade",
  description:
    "The Exchange buys gold, phones, sneakers, and electronics in Reading, Pennsylvania. Message @the.exchange610 on Instagram.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${display.variable} ${script.variable}`}>
      <body>{children}</body>
    </html>
  );
}
