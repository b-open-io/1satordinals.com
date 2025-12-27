"use client";

import { motion } from "framer-motion";
import { Users, Zap, TrendingUp } from "lucide-react";

const stories = [
  {
    project: "ArtChain Gallery",
    metric: "2M+ NFTs",
    description: "Migrated from Ethereum, saved 99.9% on minting costs",
    icon: <Users className="w-6 h-6" />,
    stat: "50MB artworks",
  },
  {
    project: "GameFi Studios",
    metric: "100K+ players",
    description: "Built entire game logic on-chain with Bitcoin Script",
    icon: <Zap className="w-6 h-6" />,
    stat: "<$0.01 per tx",
  },
  {
    project: "DataVault",
    metric: "500TB stored",
    description: "Enterprise data archival solution using 1Sat Ordinals",
    icon: <TrendingUp className="w-6 h-6" />,
    stat: "Instant access",
  },
];

export function SuccessStories() {
  return (
    <section className="py-24 border-t border-primary/20 bg-black/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Proven at Scale
          </h2>
          <p className="text-xl text-gray-400">
            Leading projects trust 1Sat Ordinals for production workloads
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stories.map((story, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-primary">
                  {story.icon}
                </div>
                <span className="text-3xl font-black text-primary">
                  {story.metric}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {story.project}
              </h3>
              <p className="text-gray-400 mb-4">
                {story.description}
              </p>
              <div className="text-sm text-primary font-mono">
                {story.stat}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400">
            Join thousands of developers building the future on 1Sat Ordinals
          </p>
        </motion.div>
      </div>
    </section>
  );
}