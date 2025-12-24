"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/printful-types";
import { formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasMultipleVariants = product.variants.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/shop/${product.id}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl border-4 border-foreground bg-card comic-shadow transition-all group-hover:comic-shadow-hover">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No image
              </div>
            )}

            {/* Variant count badge */}
            {hasMultipleVariants && (
              <div className="absolute top-3 right-3 px-2 py-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full border-2 border-foreground">
                {product.variants.length} options
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 space-y-2">
            <h3 className="font-black text-lg leading-tight line-clamp-2">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xl font-black text-primary">
                {hasMultipleVariants && (
                  <span className="text-sm font-medium text-muted-foreground mr-1">
                    From
                  </span>
                )}
                {formatPrice(product.minPrice)}
              </span>

              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-bold rounded-full border-2 border-foreground">
                View
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
