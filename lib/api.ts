// API client functions and types for frontend fetching
// All API calls go through our Next.js backend

import type { ShippingAddress, ShippingOption } from "./printful-types";

// ============ Shipping API ============

/**
 * Request to calculate shipping rates.
 * Uses catalogVariantId (Printful's base catalog variant) for shipping calculations.
 */
export interface CalculateShippingRequest {
  address: {
    countryCode: string;
    stateCode?: string;
    city?: string;
    zip?: string;
  };
  items: Array<{
    /** Catalog variant ID - Printful's base product variant (required for shipping rates) */
    printfulVariantId: number;
    quantity: number;
  }>;
}

export interface CalculateShippingResponse {
  shippingOptions: ShippingOption[];
}

export async function calculateShipping(
  request: CalculateShippingRequest,
): Promise<CalculateShippingResponse> {
  const response = await fetch("/api/printful/shipping", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to calculate shipping");
  }

  return response.json();
}

// ============ Checkout API ============

export interface ConfirmOrderRequest {
  sessionId: string;
}

export interface ConfirmOrderResponse {
  success: boolean;
  orderId?: string;
  alreadyProcessed?: boolean;
  error?: string;
}

export async function confirmOrder(
  request: ConfirmOrderRequest,
): Promise<ConfirmOrderResponse> {
  const response = await fetch("/api/checkout/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to confirm order");
  }

  return response.json();
}

export interface CreateCheckoutRequest {
  items: Array<{
    productId: string;
    variantId: number;
    printfulVariantId: number;
    name: string;
    variantName: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  shipping: ShippingOption;
  shippingAddress: ShippingAddress;
}

export interface CreateCheckoutResponse {
  sessionId: string;
}

export async function createCheckout(
  request: CreateCheckoutRequest,
): Promise<CreateCheckoutResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to create checkout session");
  }

  return response.json();
}
