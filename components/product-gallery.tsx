"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl border-4 border-foreground bg-white comic-shadow">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 h-full w-full"
          >
            <Image
              src={images[selectedIndex]}
              alt={`${name} view ${selectedIndex + 1}`}
              fill
              className="object-contain p-4"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            type="button"
            key={image}
            onClick={() => setSelectedIndex(index)}
            className={cn(
              "relative aspect-square w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-white transition-all hover:scale-105",
              index === selectedIndex
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-foreground hover:border-primary",
            )}
          >
            <Image
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              className="object-contain p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
