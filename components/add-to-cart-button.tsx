"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Product, ProductVariant } from "@/lib/printful-types";
import { useCartStore } from "@/lib/store";

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant | null;
}

export function AddToCartButton({ product, variant }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const isDisabled =
    !variant ||
    variant.availability === "out_of_stock" ||
    variant.availability === "temporary_out_of_stock";

  const handleAddToCart = () => {
    if (!variant || isDisabled) return;

    // Build variant name from size/color
    const variantParts = [variant.color, variant.size].filter(Boolean);
    const variantName = variantParts.join(" / ") || variant.name;

    addItem({
      productId: product.id,
      syncVariantId: variant.syncVariantId,
      catalogVariantId: variant.catalogVariantId,
      name: product.name,
      variantName,
      price: variant.price,
      image: variant.image || product.thumbnail,
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const getButtonText = () => {
    if (isAdded) return "Added to Cart!";
    if (!variant) return "Select Options";
    if (variant.availability === "out_of_stock") return "Out of Stock";
    if (variant.availability === "temporary_out_of_stock")
      return "Temporarily Unavailable";
    return "Add to Cart";
  };

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.02 } : undefined}
      whileTap={!isDisabled ? { scale: 0.95 } : undefined}
      onClick={handleAddToCart}
      disabled={isDisabled}
      className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl border-4 border-foreground bg-primary px-8 py-4 text-xl font-black uppercase tracking-wide text-primary-foreground transition-all hover:bg-primary/90 comic-shadow hover:comic-shadow-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    >
      <div className="relative z-10 flex items-center gap-3">
        <ShoppingCart className="h-6 w-6" strokeWidth={3} />
        {getButtonText()}
      </div>

      {/* Fun stripe animation on background */}
      {!isDisabled && (
        <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%,transparent_100%)] bg-[length:250%_250%,100%_100%] opacity-0 transition-opacity duration-1000 group-hover:animate-[shimmer_2s_infinite] group-hover:opacity-100" />
      )}
    </motion.button>
  );
}
