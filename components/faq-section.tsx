"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "What are 1Sat Ordinals?",
    answer:
      "1Sat Ordinals is an open protocol on Bitcoin SV that enables creation of fungible and non-fungible tokens using ordinal inscription technology, supporting files up to 50MB+ in a single transaction.",
  },
  {
    question: "How do 1Sat Ordinals differ from BTC Ordinals?",
    answer:
      "1Sat Ordinals offers significant advantages: 50MB+ file support vs ~400KB on BTC, sub-cent transaction costs vs $10-100+, single transaction minting vs multiple transactions, and full Bitcoin Script support vs limited scripting.",
  },
  {
    question: "What can I build with 1Sat Ordinals?",
    answer:
      "You can create NFTs, fungible tokens, store large files on-chain, build decentralized applications, create digital collectibles, and implement complex smart contracts using full Bitcoin Script capabilities.",
  },
  {
    question: "How much does it cost to create a 1Sat Ordinal?",
    answer:
      "Creating a 1Sat Ordinal typically costs less than $0.01 USD, regardless of file size (up to 50MB+), making it extremely cost-effective compared to other blockchain protocols.",
  },
  {
    question: "What file types and sizes are supported?",
    answer:
      "1Sat Ordinals supports all file types including images, videos, audio, documents, and more. The protocol can handle files over 50MB in a single transaction, with no practical upper limit on file size.",
  },
  {
    question: "Is 1Sat Ordinals compatible with existing BSV infrastructure?",
    answer:
      "Yes, 1Sat Ordinals is fully compatible with BSV infrastructure including wallets, explorers, and APIs. It works seamlessly with tools like WhatsOnChain, sCrypt, and other BSV ecosystem projects.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-primary/20 hover:border-primary/40 transition-all duration-300"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <button
        className="w-full p-6 text-left flex items-center justify-between group"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold pr-4" itemProp="name">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0 }}
        className="overflow-hidden"
      >
        <div
          className="px-6 pb-6 text-gray-400"
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p itemProp="text">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="relative py-32 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Everything you need to know about 1Sat Ordinals
            </p>
          </div>

          <div
            className="space-y-4"
            itemScope
            itemType="https://schema.org/FAQPage"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <FAQItem {...faq} />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-gray-400">
              Have more questions?{" "}
              <a
                href="https://discord.gg/1satordinals"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join our Discord community
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}