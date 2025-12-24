// Product utilities

export const formatPrice = (priceInCents: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceInCents / 100);
};

export const formatPriceRange = (
  minPrice: number,
  maxPrice: number,
): string => {
  if (minPrice === maxPrice) {
    return formatPrice(minPrice);
  }
  return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`;
};

// Category display names
export const categoryNames: Record<string, string> = {
  mugs: "Mugs",
  shirts: "Shirts",
  stickers: "Stickers",
  hoodies: "Hoodies",
  prints: "Prints",
  hats: "Hats",
  other: "Other",
};

export const getCategoryName = (category: string): string => {
  return categoryNames[category] || category;
};
