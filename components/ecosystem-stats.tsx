"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// These would be fetched from an API in production
const stats = [
  { label: "Total Inscriptions", value: 12500000, suffix: "+" },
  { label: "Active Projects", value: 450, suffix: "" },
  { label: "Daily Transactions", value: 85000, suffix: "+" },
  { label: "Total Data Stored", value: 2.5, suffix: "PB", decimals: 1 },
];

function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  decimals = 0,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      setCount(Math.floor(end * progress * 10 ** decimals) / 10 ** decimals);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, decimals]);

  return (
    <>
      {count.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
}

export function EcosystemStats() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="py-24 border-t border-primary/20 bg-gradient-to-b from-black/50 to-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Ecosystem Growth
            </h2>
            <p className="text-xl text-gray-400">
              Real-time statistics from the 1Sat Ordinals network
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">
                  {isVisible ? (
                    <AnimatedCounter
                      end={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 p-6 bg-primary/10 border border-primary/30 rounded-lg text-center"
          >
            <p className="text-lg text-gray-300">
              Growing{" "}
              <span className="text-primary font-semibold">
                47% month-over-month
              </span>{" "}
              as developers discover the power of Bitcoin SV
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
