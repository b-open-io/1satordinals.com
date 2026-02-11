"use client";

import { useEffect, useMemo, useState } from "react";
import type { ProductVariant } from "@/lib/printful-types";
import { formatPrice } from "@/lib/products";

interface VariantSelectorProps {
  variants: ProductVariant[];
  onSelect: (variant: ProductVariant | null) => void;
  selectedVariant?: ProductVariant | null;
}

export function VariantSelector({
  variants,
  onSelect,
  selectedVariant: controlledVariant,
}: VariantSelectorProps) {
  // Extract unique sizes and colors
  const sizes = useMemo(() => {
    const uniqueSizes = [
      ...new Set(variants.map((v) => v.size).filter(Boolean)),
    ];
    return uniqueSizes as string[];
  }, [variants]);

  const colors = useMemo(() => {
    const uniqueColors = [
      ...new Set(variants.map((v) => v.color).filter(Boolean)),
    ];
    return uniqueColors as string[];
  }, [variants]);

  const [selectedSize, setSelectedSize] = useState<string | null>(
    controlledVariant?.size || sizes[0] || null,
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    controlledVariant?.color || colors[0] || null,
  );

  // Find matching variant based on selections
  const selectedVariant = useMemo(() => {
    return variants.find((v) => {
      const sizeMatch = !sizes.length || v.size === selectedSize;
      const colorMatch = !colors.length || v.color === selectedColor;
      return sizeMatch && colorMatch;
    });
  }, [variants, selectedSize, selectedColor, sizes.length, colors.length]);

  // Get available options based on current selection
  const availableSizes = useMemo(() => {
    if (!selectedColor) return sizes;
    return sizes.filter((size) =>
      variants.some((v) => v.size === size && v.color === selectedColor),
    );
  }, [variants, sizes, selectedColor]);

  const availableColors = useMemo(() => {
    if (!selectedSize) return colors;
    return colors.filter((color) =>
      variants.some((v) => v.color === color && v.size === selectedSize),
    );
  }, [variants, colors, selectedSize]);

  // Notify parent of selection changes
  useEffect(() => {
    onSelect(selectedVariant || null);
  }, [selectedVariant, onSelect]);

  const isOutOfStock =
    selectedVariant?.availability === "out_of_stock" ||
    selectedVariant?.availability === "temporary_out_of_stock";

  return (
    <div className="space-y-4">
      {/* Size selector */}
      {sizes.length > 0 && (
        <div>
          <p className="block text-sm font-bold uppercase tracking-wide mb-2">
            Size
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const isAvailable = availableSizes.includes(size);
              const isSelected = selectedSize === size;

              return (
                <button
                  type="button"
                  key={size}
                  onClick={() => isAvailable && setSelectedSize(size)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border-2 border-foreground rounded-lg font-bold transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground comic-shadow"
                      : isAvailable
                        ? "bg-card hover:bg-muted"
                        : "opacity-40 cursor-not-allowed line-through"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color selector */}
      {colors.length > 0 && (
        <div>
          <p className="block text-sm font-bold uppercase tracking-wide mb-2">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const isAvailable = availableColors.includes(color);
              const isSelected = selectedColor === color;

              return (
                <button
                  type="button"
                  key={color}
                  onClick={() => isAvailable && setSelectedColor(color)}
                  disabled={!isAvailable}
                  className={`px-4 py-2 border-2 border-foreground rounded-lg font-bold transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground comic-shadow"
                      : isAvailable
                        ? "bg-card hover:bg-muted"
                        : "opacity-40 cursor-not-allowed line-through"
                  }`}
                >
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Selected variant info */}
      {selectedVariant && (
        <div className="pt-4 border-t-2 border-border">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-black">
              {formatPrice(selectedVariant.price)}
            </span>
            {isOutOfStock && (
              <span className="px-3 py-1 bg-destructive text-destructive-foreground text-sm font-bold rounded-full">
                Out of Stock
              </span>
            )}
          </div>
          {selectedVariant.sku && (
            <p className="text-sm text-muted-foreground mt-1">
              SKU: {selectedVariant.sku}
            </p>
          )}
        </div>
      )}

      {/* No variant found */}
      {!selectedVariant && (sizes.length > 0 || colors.length > 0) && (
        <p className="text-muted-foreground text-sm">
          Please select {sizes.length > 0 && "a size"}
          {sizes.length > 0 && colors.length > 0 && " and "}
          {colors.length > 0 && "a color"}
        </p>
      )}
    </div>
  );
}
