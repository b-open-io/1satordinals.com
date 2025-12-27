"use client";

import { motion } from "framer-motion";
import { ExternalLink, Code2, ShoppingCart, Gamepad2, Search, Database, FileCode, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Ecosystem Projects | 1Sat Ordinals",
  description: "Explore the thriving ecosystem of applications, tools, and platforms built on 1Sat Ordinals protocol",
  keywords: [
    "1Sat Ordinals projects",
    "BSV applications",
    "ordinals ecosystem",
    "Bitcoin SV dApps",
  ],
};

// Angled Corner Component
function CornerDecor({ className }: { className?: string }) {
  return (
    <div className={`absolute w-4 h-4 ${className}`}>
      <svg viewBox="0 0 16 16" className="w-full h-full text-primary">
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

// Geometric Block Component
function GeometricBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <CornerDecor className="top-0 left-0" />
      <CornerDecor className="top-0 right-0 rotate-90" />
      <CornerDecor className="bottom-0 right-0 rotate-180" />
      <CornerDecor className="bottom-0 left-0 -rotate-90" />
      {children}
    </div>
  );
}

// Category Badge Component
function CategoryBadge({ category }: { category: string }) {
  const colors = {
    "Tools": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    "Gaming": "text-purple-400 bg-purple-400/10 border-purple-400/30",
    "Marketplace": "text-green-400 bg-green-400/10 border-green-400/30",
    "Development": "text-orange-400 bg-orange-400/10 border-orange-400/30",
    "Infrastructure": "text-red-400 bg-red-400/10 border-red-400/30",
  };

  return (
    <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border ${colors[category as keyof typeof colors] || "text-gray-400 bg-gray-400/10 border-gray-400/30"}`}>
      {category}
    </span>
  );
}

// Icon mapping for categories
function CategoryIcon({ category }: { category: string }) {
  const icons = {
    "Tools": <FileCode className="w-5 h-5" />,
    "Gaming": <Gamepad2 className="w-5 h-5" />,
    "Marketplace": <ShoppingCart className="w-5 h-5" />,
    "Development": <Code2 className="w-5 h-5" />,
    "Infrastructure": <Database className="w-5 h-5" />,
  };

  return icons[category as keyof typeof icons] || <ExternalLink className="w-5 h-5" />;
}

const featuredProjects = [
  {
    name: "1Sat Ordinals Gallery",
    description: "Explore unique digital art and collectibles powered by 1Sat Ordinals",
    image: "/images/glow-ordi.png",
    link: "https://1sat.market",
    category: "Marketplace",
  },
  {
    name: "sCrypt Integration",
    description: "Build smart contracts on 1Sat Ordinals with TypeScript",
    image: "/images/scrypt-1sat.png",
    link: "https://scrypt.io",
    category: "Development",
  },
];

const projects = [
  {
    name: "MintFlow.me",
    description: "Streamlined NFT minting platform built on 1Sat Ordinals protocol",
    url: "https://mintflow.me",
    category: "Tools",
    featured: true,
  },
  {
    name: "Alchema.world",
    description: "World of Alchema - decentralized multiplayer online role-playing game",
    url: "https://alchema.world",
    category: "Gaming",
    featured: true,
  },
  {
    name: "1Sat.Market",
    description: "Primary marketplace for trading 1Sat Ordinals tokens and NFTs",
    url: "https://1sat.market",
    category: "Marketplace",
    featured: true,
  },
  {
    name: "sCrypt",
    description: "Smart contract development platform for BSV with TypeScript support",
    url: "https://scrypt.io",
    category: "Development",
  },
  {
    name: "WhatsOnChain",
    description: "BSV blockchain explorer with comprehensive ordinals support",
    url: "https://whatsonchain.com",
    category: "Infrastructure",
  },
  {
    name: "BubbleMint",
    description: "User-friendly token creation and minting platform",
    url: "https://bubblemint.io",
    category: "Tools",
  },
  {
    name: "Zoide",
    description: "Advanced ordinals viewing and management tools",
    url: "https://zoide.io",
    category: "Tools",
  },
  {
    name: "JungleBus",
    description: "Real-time blockchain data subscription service for BSV",
    url: "https://junglebus.gorillapool.io",
    category: "Infrastructure",
  },
  {
    name: "Bitcoin Schema",
    description: "Standard schemas for structured Bitcoin data",
    url: "https://bitcoinschema.org",
    category: "Development",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
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
      <div className="fixed inset-y-0 right-[10%] w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

      {/* Hero Section */}
      <section className="relative py-24 border-b border-primary/20">
        {/* Decorative elements */}
        <div className="absolute top-10 left-20 w-32 h-32 border border-primary/20 rotate-45" />
        <div className="absolute bottom-10 right-20 w-24 h-24 border border-primary/10 rotate-12" />

        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-block mb-6">
              <div className="border-2 border-primary px-6 py-3">
                <span className="text-sm font-mono text-primary tracking-[0.2em]">
                  ECOSYSTEM
                </span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
              BUILT ON{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                1SAT ORDINALS
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover the thriving ecosystem of applications, tools, and platforms
              leveraging the power of simple, stable protocols
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-primary/20 py-12 bg-black/50">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "20+", label: "Active Projects" },
              { value: "100K+", label: "Daily Transactions" },
              { value: "5M+", label: "Tokens Minted" },
              { value: "$0.0001", label: "Avg Transaction Cost" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black text-primary">
                  {stat.value}
                </div>
                <div className="text-sm font-mono text-gray-500 mt-2">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 border-b border-primary/20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              FEATURED <span className="text-primary">PROJECTS</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <GeometricBlock className="group relative overflow-hidden border border-primary/20 bg-black/40 backdrop-blur-sm hover:border-primary/60 transition-all duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={800}
                      height={450}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  </div>

                  <div className="p-8">
                    <CategoryBadge category={project.category} />
                    <h3 className="text-2xl font-bold mt-4 mb-3 group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-gray-400 mb-6">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                    >
                      <span className="font-mono text-sm">EXPLORE PROJECT</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </GeometricBlock>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              ECOSYSTEM <span className="text-primary">DIRECTORY</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: Math.min(i * 0.1, 0.3) }}
                className="group"
              >
                <GeometricBlock className="h-full border border-primary/20 bg-black/40 backdrop-blur-sm p-6 hover:border-primary/60 hover:bg-black/60 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                      <CategoryIcon category={project.category} />
                    </div>
                    <CategoryBadge category={project.category} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
                    {project.name}
                    {project.featured && (
                      <span className="text-xs font-mono text-primary px-2 py-0.5 border border-primary/50">
                        FEATURED
                      </span>
                    )}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Link */}
                  <div className="mt-6 flex items-center gap-2 text-primary/60 group-hover:text-primary transition-colors">
                    <span className="text-xs font-mono">VISIT PROJECT</span>
                    <ExternalLink className="w-3 h-3" />
                  </div>
                </GeometricBlock>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 border-t border-primary/20 bg-black/50">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <div className="container mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              BUILD THE FUTURE
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Join the growing ecosystem of developers building on the stable foundation
              of 1Sat Ordinals
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/developers"
                className="group inline-flex items-center gap-3 bg-primary px-8 py-4 font-bold text-black hover:bg-primary/90 transition-all duration-300"
              >
                <span>START BUILDING</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://discord.gg/vqj6wpKeEn"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border-2 border-primary px-8 py-4 font-bold text-primary hover:bg-primary hover:text-black transition-all duration-300"
              >
                <span>JOIN COMMUNITY</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}