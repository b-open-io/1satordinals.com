import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth-client";
import { SchemaMarkup } from "@/components/schema-markup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "1Sat Ordinals - Bitcoin SV Token Protocol | 50MB+ NFTs & Inscriptions",
  description:
    "Open protocol for Bitcoin SV enabling 50MB+ inscriptions, single-transaction minting at sub-cent costs. Create NFTs, tokens, and store data on-chain.",
  keywords: [
    "1Sat Ordinals",
    "Bitcoin SV",
    "BSV",
    "NFT",
    "token protocol",
    "ordinals",
    "inscriptions",
    "blockchain",
    "50MB",
    "single transaction",
    "fungible tokens",
    "non-fungible tokens",
    "on-chain storage",
  ],
  metadataBase: new URL("https://1satordinals.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://1satordinals.com",
    types: {
      "application/rss+xml": "https://1satordinals.com/feed.xml",
    },
  },
  authors: [{ name: "1Sat Ordinals Protocol" }],
  openGraph: {
    title: "1Sat Ordinals - Bitcoin SV Token Protocol",
    description:
      "Open protocol for creating 50MB+ NFTs and tokens on Bitcoin SV with sub-cent transaction costs",
    url: "https://1satordinals.com",
    siteName: "1Sat Ordinals",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "1Sat Ordinals - Bitcoin SV Token Protocol",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@1satordinals",
    creator: "@1satordinals",
    title: "1Sat Ordinals - Bitcoin SV Token Protocol",
    description:
      "Open protocol for creating 50MB+ NFTs and tokens on Bitcoin SV with sub-cent transaction costs",
    images: ["/twitter-card.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SchemaMarkup />
      </head>
      <body className={inter.className}>
        <AuthProvider>
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
        </AuthProvider>
      </body>
    </html>
  );
}
