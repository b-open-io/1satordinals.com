"use client";

import { useState, useCallback } from "react";
import type { Product, ProductVariant } from "@/lib/printful-types";
import { VariantSelector } from "@/components/variant-selector";
import { AddToCartButton } from "@/components/add-to-cart-button";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants.length === 1 ? product.variants[0] : null,
  );

  const handleVariantSelect = useCallback((variant: ProductVariant | null) => {
    setSelectedVariant(variant);
  }, []);

  return (
    <div className="space-y-6">
      {/* Variant selector (only if multiple variants) */}
      {product.variants.length > 1 && (
        <div className="rounded-lg border bg-card p-6">
          <VariantSelector
            variants={product.variants}
            onSelect={handleVariantSelect}
            selectedVariant={selectedVariant}
          />
        </div>
      )}

      {/* Add to cart button */}
      <AddToCartButton product={product} variant={selectedVariant} />
    </div>
  );
}
