import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Spectral } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { QueryProvider } from "@/components/query-provider";
import { SchemaMarkup } from "@/components/schema-markup";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/lib/auth-client";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-spectral",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "1Sat Ordinals - Open Bitcoin SV Token Protocol for NFTs and Inscriptions",
    template: "%s | 1Sat Ordinals",
  },
  description:
    "Open protocol on Bitcoin SV for creating NFTs, fungible tokens, and on-chain data using ordinal inscription technology with single-transaction minting.",
  keywords: [
    "1Sat Ordinals",
    "Bitcoin SV",
    "BSV",
    "NFT",
    "token protocol",
    "ordinals",
    "inscriptions",
    "blockchain",
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
  authors: [{ name: "1Sat Ordinals Protocol" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spectral.variable}`}
    >
      <body className="font-sans antialiased">
        <SchemaMarkup />
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
              <CommandMenu />
              <Toaster richColors position="bottom-right" />
            </ThemeProvider>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
