import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ComparisonTable } from "@/components/comparison-table";
import { DeveloperQuickstart } from "@/components/developer-quickstart";
import { EcosystemStats } from "@/components/ecosystem-stats";
import { FAQSection } from "@/components/faq-section";
import {
  Marquee,
  ScrollFadeWrapper,
  ThreeBackgroundWrapper,
} from "@/components/homepage-decorations";
import { NFTCarousel } from "@/components/nft-carousel";
import { QuickFacts } from "@/components/quick-facts";
import { SuccessStories } from "@/components/success-stories";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  title:
    "1Sat Ordinals - NFTs and Tokens on Bitcoin SV with Single-Transaction Minting",
  description:
    "Open protocol on Bitcoin SV for creating NFTs, fungible tokens, and on-chain data using ordinal inscription technology with single-transaction minting.",
});

// Decorative Square Component with angled corners
function DecorSquare({ className }: { className?: string }) {
  return (
    <div className={`absolute w-32 h-32 ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-primary/20"
        aria-hidden="true"
      >
        <path
          d="M 10,0 L 90,0 L 100,10 L 100,90 L 90,100 L 10,100 L 0,90 L 0,10 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    </div>
  );
}

// Angled Corner Decoration Component
function CornerDecor({ className }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className}`}>
      <svg
        viewBox="0 0 16 16"
        className="w-full h-full text-primary"
        aria-hidden="true"
      >
        <path
          d="M 0,4 L 0,0 L 4,0"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="square"
        />
      </svg>
    </div>
  );
}

// Graphic Block Component with architectural angled borders
function GraphicBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        clipPath:
          "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
      }}
    >
      <CornerDecor className="top-0 left-0" />
      <CornerDecor className="top-0 right-0 rotate-90" />
      <CornerDecor className="bottom-0 right-0 rotate-180" />
      <CornerDecor className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  );
}

// Partner Card Component
function PartnerCard({
  name,
  displayName,
  url,
}: {
  name: string;
  displayName: string;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${displayName}`}
      className="relative group block"
      data-partner={name}
    >
      <GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 transition-all duration-300 h-full group-hover:rotate-1 transform">
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary/30 group-hover:border-primary/80 transition-colors" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary/30 group-hover:border-primary/80 transition-colors" />

        <div className="flex flex-col items-center justify-center h-24">
          <div className="relative">
            <div className="text-2xl font-black tracking-tight text-white/80 group-hover:text-primary transition-colors">
              {displayName}
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1">
              <div className="w-2 h-[2px] bg-primary/50 group-hover:w-4 transition-all" />
              <div className="w-1 h-1 rotate-45 bg-primary/30" />
              <div className="w-2 h-[2px] bg-primary/50 group-hover:w-4 transition-all" />
            </div>
          </div>
        </div>
      </GraphicBlock>
    </a>
  );
}

const partners = [
  { name: "yours-wallet", displayName: "YOURS", url: "https://yours.org" },
  { name: "1sat-wallet", displayName: "1SAT", url: "https://1satwallet.com" },
  { name: "1sat-market", displayName: "MARKET", url: "https://1sat.market" },
  { name: "runar", displayName: "Runar", url: "https://runar.build" },
  {
    name: "gorillapool",
    displayName: "GORILLA",
    url: "https://gorillapool.com",
  },
];

const features = [
  {
    number: "01",
    title: "Single Transaction Minting",
    description: "No commit-reveal required. Mint in one transaction.",
  },
  {
    number: "02",
    title: "Large Payload Support",
    description: "Support for large inscriptions and rich media on-chain.",
  },
  {
    number: "03",
    title: "Low Fees",
    description: "Low-cost transactions on the BSV blockchain.",
  },
];

export default function Home() {
  return (
    <div className="relative bg-black text-white overflow-hidden">
      {/* Grid Background */}
      <div
        className="fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgb(255, 140, 0) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255, 140, 0) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Vertical Architectural Borders */}
      <div className="fixed inset-y-0 left-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
      <div className="fixed inset-y-0 left-[30%] w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
      <div className="fixed inset-y-0 right-[30%] w-px bg-gradient-to-b from-transparent via-primary/15 to-transparent" />
      <div className="fixed inset-y-0 right-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col">
        {/* Hero Background Image */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <Image
            src="/images/glowOrdi.png"
            alt="1Sat Ordinals Glow"
            width={1920}
            height={1080}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-[60%] max-w-4xl opacity-20 animate-pulse"
            priority
          />
        </div>

        {/* Decorative Squares */}
        <DecorSquare className="top-20 left-10 opacity-30 z-10" />
        <DecorSquare className="top-40 right-20 opacity-20 z-10" />
        <DecorSquare className="bottom-40 left-1/4 opacity-25 z-10" />

        {/* Top Marquee with Three.js Background */}
        <div className="relative overflow-hidden border-y border-primary/20 z-10">
          <ThreeBackgroundWrapper />
          <div className="relative z-10">
            <Marquee text="BUILDING ON BITCOIN" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="flex-1 container mx-auto px-4 flex flex-col justify-center relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Badge */}
            <div className="inline-block mb-8">
              <div className="border-2 border-primary px-6 py-3 inline-block">
                <span className="text-sm font-mono text-primary tracking-[0.2em]">
                  PROTOCOL
                </span>
              </div>
            </div>

            {/* Main Heading - the ONLY h1 on the page */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
              1SAT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                ORDINALS
              </span>
              <span className="block text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mt-2 text-gray-300">
                on Bitcoin SV
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mb-12">
              Open token protocol on Bitcoin SV (BSV) for NFTs, fungible tokens,
              and on-chain inscriptions with single-transaction minting
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-6">
              <Link
                href="/protocol"
                className="group relative inline-flex items-center gap-3 bg-primary px-8 py-4 font-bold text-black hover:bg-primary/90 transition-all duration-300"
              >
                <span>EXPLORE PROTOCOL</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/developers"
                className="group relative inline-flex items-center gap-3 border-2 border-primary px-8 py-4 font-bold text-primary hover:bg-primary hover:text-black transition-all duration-300"
              >
                <span>START BUILDING</span>
              </Link>

              <Link
                href="/updates"
                className="group relative inline-flex items-center gap-3 border-2 border-gray-600 px-8 py-4 font-bold text-gray-400 hover:border-primary hover:text-primary transition-all duration-300"
              >
                <span>LATEST UPDATES</span>
              </Link>
            </div>

            {/* Features Strip */}
            <div className="mt-16 flex flex-wrap gap-8 items-center text-sm font-mono text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>BSV20</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>BSV21</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-primary" />
                <span>NFTs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Marquee */}
        <div className="relative overflow-hidden border-t border-primary/20 z-10">
          <Marquee text="TOKENIZATION REIMAGINED" reverse />
        </div>

        {/* Partners Section */}
        <ScrollFadeWrapper>
          <div className="border-t border-primary/20 py-16 bg-black/50 relative z-10">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <div className="inline-block mb-4">
                    <div className="text-xs font-mono text-primary/60 tracking-[0.3em] uppercase">
                      Trusted By Leading Projects
                    </div>
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">
                    ECOSYSTEM <span className="text-primary">PARTNERS</span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {partners.map((partner) => (
                    <PartnerCard key={partner.name} {...partner} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollFadeWrapper>
      </section>

      {/* Quick Facts */}
      <QuickFacts />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Features Section */}
      <section className="relative py-32 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12">
              {features.map((feature) => (
                <div key={feature.number} className="relative">
                  <GraphicBlock className="border border-primary/20 bg-black/40 backdrop-blur-sm p-8 h-full">
                    <div className="text-primary/40 font-mono text-sm mb-4">
                      {feature.number}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </GraphicBlock>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Comparison Table */}
      <ComparisonTable />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Ecosystem Stats */}
      <EcosystemStats />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Success Stories */}
      <SuccessStories />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* NFT Carousel */}
      <NFTCarousel />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Developer Quickstart */}
      <DeveloperQuickstart />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* FAQ Section */}
      <FAQSection />

      {/* Horizontal Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* CTA Section */}
      <section className="relative py-32 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
              READY TO BUILD?
            </h2>
            <p className="text-xl text-gray-400 mb-12">
              Join the BSV tokenization revolution
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="https://docs.1satordinals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 bg-primary px-8 py-4 font-bold text-black hover:bg-primary/90 transition-all duration-300"
              >
                <span>READ THE DOCS</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
