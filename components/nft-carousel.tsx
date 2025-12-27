"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useAnimationFrame } from "framer-motion";

interface NFTImage {
  src: string;
  alt?: string;
}

const nftImages: NFTImage[] = [
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658d50f1fe00e5e9ebb4715_6352cd99e4df66f727175b71da91f0bf0276cd4541ab6cb213126ea22c7f8f61_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658d53d22ddf19d2623f677_e101fcfe-ed92-42c0-a8ee-e1355fa9852f.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658d5688aa3168373546810_a8b9bc7a-3156-4eea-83f7-777b83b11b67.webp",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658fb45de488e65a4a97381_1611d956f397caa80b56bc148b4bce87b54f39b234aeca4668b4d5a7785eb9fa_0.webp",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658fbd9581feba1712ca402_d4d9f56ac42133771a01e116c99ea5f116a3f0fd07d1a616ebefec8b9cc67551_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658fb726054a474ff18c131_fe01b47ad8e3c8ade377efe47c2e405e0908c8f020233ebfa08776dad1c12409_0.webp",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658fc48722b6cd9c2fbef2d_7c223ed3-9fa2-42bc-bde8-4293b9f67269.png",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/6658fc780e5678eb5eb50819_87459ead23591c06e2e06de62051e2265c6697dad8647d0aaba4933265ad5dba_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/66798fa10654e4eadb79c8d2_ba11660cc3d3b71d196034e4ecf0e47aa2b90f362e9a36ead9df3bfa15bccb42_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/66798fb7022339323be10b1b_94f664c15f3f8a5f2930a053381b4b94e264c77434cd99b49b03734f7862bc6e_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/66799025512e1dc5dcc20bac_65b7ccfffc6b4dacc2b30ddbd7bd016c0cffe1026f3245829e030542fa5a4fe9_0.jpeg",
    alt: "1Sat Ordinal NFT"
  },
  {
    src: "https://cdn.prod.website-files.com/6658bbaeab357b66a3a9773f/66799058221855d3ef9d39a5_d665bf0809c8aa58c0b9f5022ef254349bd78abdb1dcade081e014fa4fdf0d10_0.jpeg",
    alt: "1Sat Ordinal NFT"
  }
];

export function NFTCarousel() {
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless loop
  const allImages = [...nftImages, ...nftImages];

  useAnimationFrame(() => {
    setTranslateX((prev) => {
      const newTranslate = prev - 0.5; // Adjust speed here
      // Reset when first set is completely off screen
      if (Math.abs(newTranslate) >= (nftImages.length * 320)) {
        return 0;
      }
      return newTranslate;
    });
  });

  return (
    <section className="relative w-full overflow-hidden py-12 bg-black/50">
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-2">
          EXPLORE <span className="text-primary">ORDINALS</span>
        </h2>
        <p className="text-gray-400">Discover unique digital assets on Bitcoin SV</p>
      </div>

      {/* Carousel container */}
      <div ref={containerRef} className="relative">
        <div
          className="flex gap-4"
          style={{
            transform: `translateX(${translateX}px)`,
            willChange: 'transform',
          }}
        >
          {allImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="flex-shrink-0 w-80 h-80 relative group cursor-pointer overflow-hidden"
            >
              {/* Border decoration */}
              <div className="absolute inset-0 border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300" />

              {/* Image */}
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-semibold">1Sat Ordinal</p>
                  <p className="text-primary text-sm">View on marketplace →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}