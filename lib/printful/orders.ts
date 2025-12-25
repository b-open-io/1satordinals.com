/**
 * Printful Orders API
 * Handles order creation, confirmation, and retrieval
 *
 * IMPORTANT: This endpoint requires syncVariantId (sync_variant_id), not catalogVariantId!
 */

import { printfulFetch } from "./client";

// ============ API Types ============

export interface PrintfulOrderRecipient {
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

export interface PrintfulOrderItem {
  sync_variant_id: number;
  quantity: number;
  retail_price?: string;
}

export interface PrintfulOrder {
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

// ============ API Functions ============

/**
 * Create a Printful order (draft or confirmed)
 *
 * IMPORTANT: Items must use syncVariantId (sync_variant_id), NOT catalogVariantId!
 * This is because orders are for YOUR customized products in your store.
 *
 * @param order - Order details with sync variant IDs
 * @param confirm - Whether to confirm the order immediately (default: false for draft)
 * @returns Created order
 */
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

/**
 * Get an existing order by ID
 */
export async function getOrder(id: string | number): Promise<PrintfulOrder> {
  const response = await printfulFetch<OrderResponse>(`/orders/${id}`);
  return response.result;
}

/**
 * Confirm a draft order
 */
export async function confirmOrder(
  id: string | number,
): Promise<PrintfulOrder> {
  const response = await printfulFetch<OrderResponse>(`/orders/${id}/confirm`, {
    method: "POST",
  });
  return response.result;
}

/**
 * Estimate order costs before creating the order
 *
 * IMPORTANT: Items must use syncVariantId (sync_variant_id)
 */
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
