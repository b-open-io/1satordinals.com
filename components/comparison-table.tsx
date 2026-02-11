"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const comparisonData = [
  {
    feature: "Max File Size",
    oneSat: "50MB+",
    btc: "~400KB",
    advantage: "oneSat",
  },
  {
    feature: "Transaction Cost",
    oneSat: "<$0.01",
    btc: "$10-100+",
    advantage: "oneSat",
  },
  {
    feature: "Minting Process",
    oneSat: "Single transaction",
    btc: "Multiple transactions",
    advantage: "oneSat",
  },
  {
    feature: "Bitcoin Script",
    oneSat: "Full support",
    btc: "Limited",
    advantage: "oneSat",
  },
  {
    feature: "Transaction Speed",
    oneSat: "Instant",
    btc: "10+ minutes",
    advantage: "oneSat",
  },
  {
    feature: "Throughput",
    oneSat: "Unlimited",
    btc: "~7 TPS",
    advantage: "oneSat",
  },
  {
    feature: "Smart Contracts",
    oneSat: "Full capability",
    btc: "Basic only",
    advantage: "oneSat",
  },
  {
    feature: "Data Storage Cost",
    oneSat: "$0.0002/KB",
    btc: "$25+/KB",
    advantage: "oneSat",
  },
];

export function ComparisonTable() {
  return (
    <section className="relative py-32 border-t border-primary/20">
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
              1Sat Ordinals vs BTC Ordinals
            </h2>
            <p className="text-xl text-gray-400">
              See why builders choose Bitcoin SV for their ordinals
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-primary/30">
                  <th className="text-left py-4 px-6 font-semibold text-lg">
                    Feature
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-lg text-primary">
                    1Sat Ordinals (BSV)
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-lg text-gray-400">
                    BTC Ordinals
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                  >
                    <td className="py-4 px-6 font-medium">{row.feature}</td>
                    <td className="text-center py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <span
                          className={
                            row.advantage === "oneSat"
                              ? "text-green-400 font-semibold"
                              : ""
                          }
                        >
                          {row.oneSat}
                        </span>
                        {row.advantage === "oneSat" && (
                          <Check className="w-5 h-5 text-green-400" />
                        )}
                      </div>
                    </td>
                    <td className="text-center py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-400">{row.btc}</span>
                        {row.advantage === "oneSat" && (
                          <X className="w-5 h-5 text-red-400/50" />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 p-6 bg-primary/10 border border-primary/30 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-4">Key Advantages</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong>125,000x cheaper</strong> data storage costs enable
                  real utility applications
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong>No file size limits</strong> - Store entire
                  applications, videos, or datasets on-chain
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Instant finality</strong> - No waiting for
                  confirmations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Full programmability</strong> - Build complex
                  applications with Bitcoin Script
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
