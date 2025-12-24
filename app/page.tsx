"use client";

import {
  ArrowRight,
  Code2,
  DollarSign,
  FileText,
  Gauge,
  Lock,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { PixelRain } from "@/components/pixel-rain";
import { ScrollReveal } from "@/components/scroll-reveal";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardHoverVariants = {
  rest: { scale: 1, y: 0 },
  hover: {
    scale: 1.05,
    y: -8,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

export default function Home() {
  return (
    <>
      <PixelRain />

      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden">
        <motion.div
          className="container mx-auto max-w-7xl px-4 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl"
              variants={itemVariants}
            >
              A Simple, Powerful{" "}
              <span className="text-primary relative inline-block">
                Token Protocol
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl"
              variants={itemVariants}
            >
              Fast, affordable, and fully scriptable tokens on Bitcoin SV
            </motion.p>
            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/protocol"
                  className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <a
                  href="https://discord.gg/vqj6wpKeEn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-6 flex items-center gap-2 hover:text-primary transition-colors"
                >
                  Join Discord <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* What are 1Sat Ordinals */}
      <section className="relative w-full border-t bg-muted/50 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                What are 1Sat Ordinals?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A chain of single satoshi output spends, where each owner
                transfers 1 satoshi by creating a transaction that has a single
                satoshi output
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: FileText,
                title: "Ordinals (NFTs)",
                description:
                  "Unique tokens for art and collectibles where each token is distinct",
              },
              {
                icon: DollarSign,
                title: "BSV20",
                description:
                  "Fungible tokens for currencies and tradable assets",
              },
              {
                icon: Code2,
                title: "BSV21",
                description: "Enhanced fungible tokens with advanced features",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                className="rounded-lg border bg-card p-6 text-center cursor-pointer"
              >
                <motion.div
                  className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10"
                  variants={cardHoverVariants}
                >
                  <item.icon className="h-6 w-6 text-primary" />
                </motion.div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="relative w-full py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why &quot;One Satoshi&quot;?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Because it doesn&apos;t require dust
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: FileText,
                title: "Payload Size",
                description: "50MB+ inscriptions supported natively",
              },
              {
                icon: Zap,
                title: "Single Transaction",
                description: "Mint in one transaction, not commit and reveal",
              },
              {
                icon: DollarSign,
                title: "Low Cost",
                description: "~$0.0001 per transaction on BSV",
              },
              {
                icon: Lock,
                title: "Ordinal Locking",
                description: "Advanced locking mechanisms for security",
              },
              {
                icon: Code2,
                title: "Fully Scriptable",
                description: "Native Bitcoin Script support",
              },
              {
                icon: Gauge,
                title: "Scalable",
                description: "Built on BSV's unbounded blockchain",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover="hover"
                initial="rest"
                className="rounded-lg border bg-card p-6 cursor-pointer"
              >
                <motion.div variants={cardHoverVariants}>
                  <item.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="relative w-full border-t bg-muted/50 py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <ScrollReveal>
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The cool kids
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                An open-protocol ecosystem with rapid development, unexpected
                turns, and emergent interoperability
              </p>
            </div>
          </ScrollReveal>

          <motion.div
            className="mx-auto mt-16 max-w-5xl"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <Image
                  src="/images/glow-ordi.png"
                  alt="1Sat Ordinal Example"
                  width={400}
                  height={300}
                  className="aspect-video object-cover"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow"
              >
                <Image
                  src="/images/scrypt-1sat.png"
                  alt="sCrypt 1Sat Integration"
                  width={400}
                  height={300}
                  className="aspect-video object-cover"
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                className="flex items-center justify-center rounded-lg border bg-card p-8"
              >
                <p className="text-center text-sm text-muted-foreground">
                  More projects coming soon
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-10 flex items-center justify-center gap-x-6"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/projects"
                  className="rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Browse Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 5 }}>
                <a
                  href="https://docs.1satordinals.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold leading-6 flex items-center gap-2 hover:text-primary transition-colors"
                >
                  Build Something <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
