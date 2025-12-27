"use client";

import { motion } from "framer-motion";
import { Copy, Check, Terminal, Code2, Package, ArrowRight } from "lucide-react";
import { useState } from "react";

const codeExamples = {
  install: `npm install @1sat/ordinals-sdk`,
  mint: `import { OneOrdClient } from '@1sat/ordinals-sdk';

const client = new OneOrdClient();

// Mint a new ordinal
const ordinal = await client.mint({
  file: myFile, // Up to 50MB+
  metadata: {
    name: "My NFT",
    description: "Created with 1Sat Ordinals"
  }
});`,
  query: `// Query ordinals by address
const ordinals = await client.getOrdinals({
  address: "1A2b3c4d5e...",
  limit: 100
});`,
};

function CodeBlock({ code, language = "typescript" }: { code: string; language?: string }) {
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
  const [activeTab, setActiveTab] = useState("install");

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
              Simple SDK, powerful features, instant deployment
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Left side - Features */}
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
                    Simple Integration
                  </h3>
                  <p className="text-gray-400">
                    One line install, comprehensive TypeScript SDK with full type safety
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
                    Developer Friendly
                  </h3>
                  <p className="text-gray-400">
                    RESTful APIs, WebSocket events, and comprehensive documentation
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
                    Production Ready
                  </h3>
                  <p className="text-gray-400">
                    Battle-tested by major projects, handling millions of inscriptions
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Right side - Code examples */}
            <div className="space-y-4">
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setActiveTab("install")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "install"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  Install
                </button>
                <button
                  onClick={() => setActiveTab("mint")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "mint"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  Mint
                </button>
                <button
                  onClick={() => setActiveTab("query")}
                  className={`px-4 py-2 rounded transition-all duration-200 ${
                    activeTab === "query"
                      ? "bg-primary text-black font-semibold"
                      : "bg-primary/10 hover:bg-primary/20"
                  }`}
                >
                  Query
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <CodeBlock code={codeExamples[activeTab as keyof typeof codeExamples]} />
              </motion.div>

              <div className="mt-8">
                <a
                  href="/developers"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  View full documentation
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