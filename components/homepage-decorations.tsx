"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ThreeBackgroundLazy = dynamic(
  () =>
    import("@/components/three-background").then((m) => ({
      default: m.ThreeBackground,
    })),
  { ssr: false },
);

/**
 * Client-side wrapper that loads the Three.js WebGL background
 * via dynamic import with ssr:false so it never runs on the server
 * or in crawlers without WebGL support.
 */
export function ThreeBackgroundWrapper() {
  return <ThreeBackgroundLazy />;
}

/**
 * Animated marquee with decorative text. Uses span (not h1)
 * and aria-hidden so it does not compete with the real h1.
 */
export function Marquee({
  text,
  reverse = false,
}: {
  text: string;
  reverse?: boolean;
}) {
  const marqueeItems = Array.from(
    { length: 10 },
    (_, index) => `${text}-${index}`,
  );

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {marqueeItems.map((item) => (
          <span
            key={item}
            aria-hidden="true"
            className="text-[120px] md:text-[180px] font-black tracking-tighter text-transparent"
            style={{
              WebkitTextStroke: "2px rgb(255, 140, 0, 0.3)",
            }}
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Client wrapper that fades its children as the user scrolls down.
 * Purely decorative; server-renders children at full opacity.
 */
export function ScrollFadeWrapper({ children }: { children: ReactNode }) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return <motion.div style={{ opacity }}>{children}</motion.div>;
}
