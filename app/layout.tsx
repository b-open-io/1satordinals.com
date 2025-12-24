import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1Sat Ordinals - Fast, Flexible Tokenization on BSV",
  description:
    "A simple, powerful token protocol on Bitcoin SV. Fast, affordable, and fully scriptable tokens.",
  keywords: ["bitcoin", "ordinals", "bsv", "tokens", "nft", "bsv20", "bsv21"],
  metadataBase: new URL("https://1satordinals.com"),
  openGraph: {
    title: "1Sat Ordinals - Fast, Flexible Tokenization on BSV",
    description:
      "A simple, powerful token protocol on Bitcoin SV. Fast, affordable, and fully scriptable tokens.",
    url: "https://1satordinals.com",
    siteName: "1Sat Ordinals",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@1satordinals",
    creator: "@1satordinals",
    title: "1Sat Ordinals - Fast, Flexible Tokenization on BSV",
    description:
      "A simple, powerful token protocol on Bitcoin SV. Fast, affordable, and fully scriptable tokens.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            themes={["light", "dark"]}
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
