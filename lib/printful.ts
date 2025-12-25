// Printful API v1 client
// Direct fetch for all endpoints (SDK has type issues)

import type { Product, ProductVariant, ShippingOption } from "./printful-types";

// Printful API fetch helper
async function printfulFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) {
    throw new Error("PRINTFUL_API_KEY is not configured");
  }

  const response = await fetch(`https://api.printful.com${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || data.result || "Printful API error";
    console.error("Printful API error:", {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      data,
    });
    throw new Error(errorMsg);
  }

  return data;
}

// ============ Sync Products (custom - not in SDK) ============

interface PrintfulSyncProduct {
  id: number;
  external_id: string | null;
  name: string;
  variants: number;
  synced: number;
  thumbnail_url: string | null;
  is_ignored: boolean;
}

interface PrintfulSyncVariant {
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

export async function getSyncProduct(id: string | number): Promise<{
  sync_product: PrintfulSyncProduct;
  sync_variants: PrintfulSyncVariant[];
}> {
  const response = await printfulFetch<SyncProductInfoResponse>(
    `/store/products/${id}`,
  );
  return response.result;
}

// ============ Shipping (custom fetch - SDK has issues) ============

interface ShippingRateResponse {
  code: number;
  result: Array<{
    id: string;
    name: string;
    rate: string;
    currency: string;
    minDeliveryDays: number;
    maxDeliveryDays: number;
    minDeliveryDate: string;
    maxDeliveryDate: string;
  }>;
}

export async function calculateShipping(
  recipient: {
    address1?: string;
    city?: string;
    country_code: string;
    state_code?: string;
    zip?: string;
  },
  items: Array<{ variant_id: number; quantity: number }>,
): Promise<ShippingOption[]> {
  const response = await printfulFetch<ShippingRateResponse>(
    "/shipping/rates",
    {
      method: "POST",
      body: JSON.stringify({
        recipient,
        items,
      }),
    },
  );

  // Transform to our ShippingOption type
  return (response.result || []).map((rate) => ({
    id: rate.id,
    name: rate.name,
    rate: Math.round(Number.parseFloat(rate.rate) * 100),
    currency: rate.currency,
    minDays: rate.minDeliveryDays,
    maxDays: rate.maxDeliveryDays,
    minDate: rate.minDeliveryDate,
    maxDate: rate.maxDeliveryDate,
  }));
}

// ============ Orders (custom fetch - SDK has type issues) ============

interface PrintfulOrderRecipient {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  country_code: string;
  zip: string;
  phone?: string;
  email?: string;
}

interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
  retail_price?: string;
}

interface PrintfulOrder {
  id: number;
  external_id: string | null;
  status: string;
  shipping: string;
  created: number;
  recipient: PrintfulOrderRecipient;
  items: PrintfulOrderItem[];
  costs?: {
    subtotal: string;
    discount: string;
    shipping: string;
    tax: string;
    total: string;
  };
}

interface OrderResponse {
  code: number;
  result: PrintfulOrder;
}

export async function createOrder(
  order: {
    external_id?: string;
    shipping?: string;
    recipient: PrintfulOrderRecipient;
    items: PrintfulOrderItem[];
  },
  confirm = false,
): Promise<PrintfulOrder> {
  const response = await printfulFetch<OrderResponse>(
    `/orders${confirm ? "?confirm=true" : ""}`,
    {
      method: "POST",
      body: JSON.stringify(order),
    },
  );
  return response.result;
}

export async function getOrder(id: string | number): Promise<PrintfulOrder> {
  const response = await printfulFetch<OrderResponse>(`/orders/${id}`);
  return response.result;
}

export async function confirmOrder(
  id: string | number,
): Promise<PrintfulOrder> {
  const response = await printfulFetch<OrderResponse>(`/orders/${id}/confirm`, {
    method: "POST",
  });
  return response.result;
}

interface EstimateResponse {
  code: number;
  result: {
    costs: {
      subtotal: string;
      discount: string;
      shipping: string;
      tax: string;
      total: string;
    };
    retail_costs: {
      subtotal: string;
      discount: string;
      shipping: string;
      tax: string;
      total: string;
    };
  };
}

export async function estimateOrderCosts(order: {
  recipient: {
    name: string;
    address1: string;
    city: string;
    state_code?: string;
    country_code: string;
    zip: string;
  };
  items: Array<{
    sync_variant_id: number;
    quantity: number;
  }>;
}): Promise<EstimateResponse["result"]> {
  const response = await printfulFetch<EstimateResponse>(
    "/orders/estimate-costs",
    {
      method: "POST",
      body: JSON.stringify(order),
    },
  );
  return response.result;
}

// ============ Transform helpers ============

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
    id: variant.id,
    variantId: variant.variant_id,
    name: variant.name,
    size: variant.size,
    color: variant.color,
    price: priceInCents,
    sku: variant.sku,
    image,
    availability: variant.availability_status,
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
