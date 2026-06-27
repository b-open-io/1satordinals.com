"use client";

import { motion } from "framer-motion";
import { ArrowRight, Code2, Package, Terminal } from "lucide-react";
import { useState } from "react";
import type { BundledLanguage } from "shiki";
import { CodeBlockClient } from "@/components/code-block-client";

type QuickstartTab = "browser" | "react" | "server";

interface QuickstartExample {
  label: string;
  install: string;
  code: string;
  lang: BundledLanguage;
}

const examples: Record<QuickstartTab, QuickstartExample> = {
  browser: {
    label: "Browser dApp",
    install: "bun add @1sat/connect",
    lang: "typescript",
    code: `import { createOneSat } from "@1sat/connect";

const onesat = createOneSat({ appName: "My dApp" });
const { paymentAddress, ordinalAddress } = await onesat.connect();

console.log(paymentAddress, ordinalAddress);`,
  },
  react: {
    label: "React",
    install: "bun add @1sat/react",
    lang: "tsx",
    code: `import { ConnectButton, OneSatProvider } from "@1sat/react";

export function App() {
  return (
    <OneSatProvider appName="My App">
      <ConnectButton />
    </OneSatProvider>
  );
}`,
  },
  server: {
    label: "Server/Engine",
    install: "bun add @1sat/actions @1sat/client @1sat/types @1sat/wallet-node",
    lang: "typescript",
    code: `import { createNodeWallet } from "@1sat/wallet-node";

const { wallet } = await createNodeWallet({
  rootKey: process.env.ROOT_KEY!,
  chain: "main",
  dbFilename: "wallet.sqlite",
});

await wallet.syncAll();`,
  },
};

const tabOrder: QuickstartTab[] = ["browser", "react", "server"];

export function DeveloperQuickstart() {
  const [activeTab, setActiveTab] = useState<QuickstartTab>("browser");
  const example = examples[activeTab];

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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

            <div className="min-w-0 space-y-4">
              <div className="flex flex-wrap gap-2 mb-6">
                {tabOrder.map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded transition-all duration-200 ${
                      activeTab === tab
                        ? "bg-primary text-black font-semibold"
                        : "bg-primary/10 hover:bg-primary/20"
                    }`}
                  >
                    {examples[tab].label}
                  </button>
                ))}
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div>
                  <p className="text-sm font-medium text-gray-300">Install</p>
                  <CodeBlockClient code={example.install} lang="bash" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-300">Example</p>
                  <CodeBlockClient code={example.code} lang={example.lang} />
                </div>
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
