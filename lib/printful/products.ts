/**
 * Printful Products API
 * Handles sync products (your customized products in your store)
 */

import type { Product, ProductVariant } from "../printful-types";
import { printfulFetch } from "./client";

// ============ API Types ============

export interface PrintfulSyncProduct {
  id: number;
  external_id: string | null;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string | null;
  is_ignored: boolean;
}

export interface PrintfulSyncVariant {
  id: number;
  external_id: string | null;
  sync_product_id: number;
  name: string;
  synced: boolean;
  variant_id: number;
  retail_price: string;
  currency: string;
  is_ignored: boolean;
  sku: string | null;
  product: {
    variant_id: number;
    product_id: number;
    image: string;
    name: string;
  };
  files: Array<{
    id: number;
    type: string;
    preview_url: string | null;
    thumbnail_url: string | null;
  }>;
  size: string | null;
  color: string | null;
  availability_status:
    | "active"
    | "discontinued"
    | "out_of_stock"
    | "temporary_out_of_stock";
}

interface SyncProductsResponse {
  code: number;
  result: PrintfulSyncProduct[];
  paging?: { total: number; offset: number; limit: number };
}

interface SyncProductInfoResponse {
  code: number;
  result: {
    sync_product: PrintfulSyncProduct;
    sync_variants: PrintfulSyncVariant[];
  };
}

// ============ API Functions ============

/**
 * Get all sync products from your Printful store
 * Automatically handles pagination
 */
export async function getSyncProducts(): Promise<PrintfulSyncProduct[]> {
  const products: PrintfulSyncProduct[] = [];
  let offset = 0;
  const limit = 100;

  while (true) {
    const response = await printfulFetch<SyncProductsResponse>(
      `/store/products?offset=${offset}&limit=${limit}`,
    );
    products.push(...response.result);

    if (!response.paging || offset + limit >= response.paging.total) {
      break;
    }
    offset += limit;
  }

  return products;
}

/**
 * Get a single sync product with all its variants
 */
export async function getSyncProduct(id: string | number): Promise<{
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}> {
  const response = await printfulFetch<SyncProductInfoResponse>(
    `/store/products/${id}`,
  );
  return response.result;
}

// ============ Transform Functions ============

/**
 * Transforms a Printful sync variant to our ProductVariant type.
 *
 * Note: Printful has two types of variant IDs:
 * - variant.id: Sync variant ID (your customized product in your store)
 * - variant.variant_id: Catalog variant ID (base Printful product)
 *
 * Use syncVariantId for creating orders, catalogVariantId for shipping rates.
 */
export function transformSyncVariant(
  variant: PrintfulSyncVariant,
): ProductVariant {
  const priceInCents = Math.round(
    Number.parseFloat(variant.retail_price) * 100,
  );
  const previewFile = variant.files.find(
    (f) => f.type === "preview" && f.preview_url,
  );
  const image = previewFile?.preview_url || variant.product?.image || "";

  return {
    syncVariantId: variant.id,
    catalogVariantId: variant.variant_id,
    name: variant.name,
    size: variant.size,
    color: variant.color,
    price: priceInCents,
    sku: variant.sku,
    image,
    availability: variant.availability_status,
  };
}

/**
 * Transform a Printful sync product to our Product type
 */
export function transformSyncProduct(
  syncProduct: PrintfulSyncProduct,
  syncVariants: PrintfulSyncVariant[],
): Product {
  const variants = syncVariants
    .filter((v) => v.synced && v.availability_status !== "discontinued")
    .map(transformSyncVariant);

  const prices = variants.map((v) => v.price);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;

  return {
    id: String(syncProduct.id),
    name: syncProduct.name,
    description: generateDescription(syncProduct.name, variants),
    thumbnail: syncProduct.thumbnail_url || variants[0]?.image || "",
    category: deriveCategory(syncProduct.name),
    variants,
    minPrice,
    maxPrice,
  };
}

function deriveCategory(productName: string): string {
  const name = productName.toLowerCase();
  if (name.includes("mug") || name.includes("cup")) return "mugs";
  if (name.includes("shirt") || name.includes("tee")) return "shirts";
  if (name.includes("sticker")) return "stickers";
  if (name.includes("hoodie") || name.includes("sweatshirt")) return "hoodies";
  if (name.includes("poster") || name.includes("print")) return "prints";
  if (name.includes("hat") || name.includes("cap")) return "hats";
  return "other";
}

function generateDescription(name: string, variants: ProductVariant[]): string {
  const sizes = [...new Set(variants.map((v) => v.size).filter(Boolean))];
  const colors = [...new Set(variants.map((v) => v.color).filter(Boolean))];

  const parts: string[] = [];
  if (colors.length > 0)
    parts.push(`${colors.length} color${colors.length > 1 ? "s" : ""}`);
  if (sizes.length > 0)
    parts.push(`${sizes.length} size${sizes.length > 1 ? "s" : ""}`);

  return parts.length > 0
    ? `${name}. Available in ${parts.join(" and ")}.`
    : name;
}
