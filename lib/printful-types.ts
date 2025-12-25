/**
 * App-level types for Printful integration
 *
 * IMPORTANT: Understanding Printful's Variant ID System
 * =====================================================
 *
 * Printful uses TWO different variant IDs, and it's critical to use the right one:
 *
 * 1. **Sync Variant ID** (syncVariantId)
 *    - Your customized product variant in YOUR Printful store
 *    - Example: 5121034259
 *    - Obtained from: /store/products API (sync_variant.id)
 *    - Used for: Creating Printful orders (/orders API)
 *    - Think: "This is MY 1sat Ordinals logo on a red shirt"
 *
 * 2. **Catalog Variant ID** (catalogVariantId)
 *    - Printful's base catalog product variant
 *    - Example: 4012
 *    - Obtained from: /store/products API (sync_variant.variant_id)
 *    - Used for: Calculating shipping rates (/shipping/rates API)
 *    - Think: "This is a Gildan 5000 shirt in Large/Red"
 *
 * Why two IDs?
 * - Shipping rates are based on the PHYSICAL product (catalog)
 * - Orders are for YOUR CUSTOMIZED version (sync)
 *
 * API Endpoints:
 * - POST /shipping/rates → requires catalogVariantId (variant_id)
 * - POST /orders → requires syncVariantId (sync_variant_id)
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;
  variants: ProductVariant[];
  minPrice: number;
  maxPrice: number;
}

/**
 * Product variant with both Printful ID types:
 * - syncVariantId: Your store's customized product variant (used for orders)
 * - catalogVariantId: Printful's base catalog variant (used for shipping rates)
 */
export interface ProductVariant {
  /** Sync variant ID - used when creating Printful orders */
  syncVariantId: number;
  /** Catalog variant ID - used when calculating shipping rates */
  catalogVariantId: number;
  name: string;
  size: string | null;
  color: string | null;
  price: number;
  sku: string | null;
  image: string;
  availability:
    | "active"
    | "discontinued"
    | "out_of_stock"
    | "temporary_out_of_stock";
}

/**
 * Shopping cart item with both Printful ID types:
 * - syncVariantId: Your store's customized product variant (used for orders)
 * - catalogVariantId: Printful's base catalog variant (used for shipping rates)
 */
export interface CartItem {
  productId: string;
  /** Sync variant ID - used when creating Printful orders */
  syncVariantId: number;
  /** Catalog variant ID - used when calculating shipping rates */
  catalogVariantId: number;
  name: string;
  variantName: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ShippingOption {
  id: string;
  name: string;
  rate: number;
  currency: string;
  minDays: number;
  maxDays: number;
  minDate: string;
  maxDate: string;
}

export interface ShippingAddress {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  stateCode?: string;
  countryCode: string;
  zip: string;
  phone?: string;
  email?: string;
}
