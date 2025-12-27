"use client";

import { motion } from "framer-motion";

const facts = [
  { label: "Network", value: "Bitcoin SV (BSV)" },
  { label: "Protocol Type", value: "Open, Decentralized" },
  { label: "Max File Size", value: "50MB+" },
  { label: "Transaction Cost", value: "<$0.01" },
  { label: "Minting Type", value: "Single Transaction" },
  { label: "Script Support", value: "Full Bitcoin Script" },
];

export function QuickFacts() {
  return (
    <section className="relative py-16 border-t border-b border-primary/20 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-primary">
            1Sat Ordinals at a Glance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {facts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-sm text-gray-500 mb-2">{fact.label}</div>
                <div className="text-lg font-semibold text-white">
                  {fact.value}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              Last Updated: December 2025
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}