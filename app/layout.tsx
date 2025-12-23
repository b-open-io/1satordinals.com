import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "1Sat Ordinals",
  description: "1Sat Ordinals - Bitcoin Ordinals on every satoshi",
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
