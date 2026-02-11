"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Code2,
  Copy,
  Package,
  Terminal,
} from "lucide-react";
import { useState } from "react";

type QuickstartTab = "browser" | "react" | "server";

const codeExamples: Record<QuickstartTab, string> = {
  browser: `# Browser dApp
bun add @1sat/connect

import { createOneSat } from "@1sat/connect";

const onesat = createOneSat({ appName: "My dApp" });
const { paymentAddress, ordinalAddress } = await onesat.connect();

console.log(paymentAddress, ordinalAddress);`,
  react: `# React app
bun add @1sat/react

import { ConnectButton, OneSatProvider } from "@1sat/react";

export function App() {
  return (
    <OneSatProvider appName="My App">
      <ConnectButton />
    </OneSatProvider>
  );
}`,
  server: `# Server / wallet engine
bun add @1sat/core @1sat/client @1sat/types @1sat/wallet-node

import { createNodeWallet } from "@1sat/wallet-node";

const { wallet } = await createNodeWallet({
  rootKey: process.env.ROOT_KEY!,
  chain: "main",
  dbFilename: "wallet.sqlite",
});

await wallet.syncAll();`,
};

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <pre className="bg-black/60 backdrop-blur border border-primary/20 rounded-lg p-4 overflow-x-auto">
        <code className="text-sm text-gray-300">{code}</code>
      </pre>
      <button
        type="button"
        onClick={copyToClipboard}
        className="absolute top-2 right-2 p-2 bg-primary/10 hover:bg-primary/20 rounded transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-primary" />
        )}
      </button>
    </div>
  );
}

export function DeveloperQuickstart() {
  const [activeTab, setActiveTab] = useState<QuickstartTab>("browser");

  return (
    <section className="relative py-32 border-t border-primary/20 bg-black/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Start Building in Minutes
            </h2>
            <p className="text-xl text-gray-400">
              Use the right 1Sat package for your app surface
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Use-Case Packages
                  </h3>
                  <p className="text-gray-400">
                    Choose by surface: browser dApp, React UI, or server wallet
                    engine.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Bun-First Setup
                  </h3>
                  <p className="text-gray-400">
                    Install commands and examples use Bun and current
                    <code className="mx-1">@1sat/*</code>
                    packages.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Independent Auth
                  </h3>
                  <p className="text-gray-400">
                    Sigma identity auth and 1Sat wallet tooling stay separate in
                    this site.
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("browser")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "browser"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  Browser dApp
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("react")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "react"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  React
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("server")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "server"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  Server/Engine
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CodeBlock code={codeExamples[activeTab]} />
              </motion.div>

              <div className="mt-8">
                <a
                  href="/developers#sdk"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View full SDK matrix
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
