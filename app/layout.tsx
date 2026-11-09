import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
