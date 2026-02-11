"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ComponentProps {
  children: ReactNode;
  className?: string;
}

export function PullQuote({ children, className }: ComponentProps) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn("relative my-12 pl-8 border-l-4 border-primary", className)}
    >
      <div className="absolute -left-4 -top-4 text-6xl text-primary/20 font-serif">
        "
      </div>
      <p className="text-2xl font-light italic text-gray-200 leading-relaxed">
        {children}
      </p>
    </motion.blockquote>
  );
}

export function HighlightBox({ children, className }: ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "my-8 p-8 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

export function KeyTakeaway({
  title,
  children,
}: { title: string } & ComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="my-8 p-6 bg-black/50 border border-gray-800 rounded-lg"
    >
      <h4 className="text-primary font-mono text-sm mb-3 uppercase tracking-wider">
        {title}
      </h4>
      <div className="text-gray-300">{children}</div>
    </motion.div>
  );
}

export function CodeComparison({
  leftTitle,
  leftCode,
  rightTitle,
  rightCode,
}: {
  leftTitle: string;
  leftCode: string;
  rightTitle: string;
  rightCode: string;
}) {
  return (
    <div className="my-12 grid md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >
        <h5 className="text-sm font-mono text-gray-400 mb-3">{leftTitle}</h5>
        <pre className="p-4 bg-black/80 border border-gray-800 rounded-lg overflow-x-auto">
          <code className="text-sm text-gray-300">{leftCode}</code>
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
      >
        <h5 className="text-sm font-mono text-gray-400 mb-3">{rightTitle}</h5>
        <pre className="p-4 bg-black/80 border border-gray-800 rounded-lg overflow-x-auto">
          <code className="text-sm text-gray-300">{rightCode}</code>
        </pre>
      </motion.div>
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="my-16 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <div className="w-16 h-px bg-gradient-to-r from-transparent to-primary/50" />
        <div className="w-2 h-2 rotate-45 bg-primary/50" />
        <div className="w-16 h-px bg-gradient-to-l from-transparent to-primary/50" />
      </div>
    </div>
  );
}

export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="p-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg hover:border-primary/50 transition-all duration-300"
    >
      <div className="text-primary mb-4">{icon}</div>
      <h4 className="text-xl font-semibold mb-2">{title}</h4>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}
