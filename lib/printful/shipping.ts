/**
 * Printful Shipping API
 * Handles shipping rate calculations
 *
 * IMPORTANT: This endpoint requires catalogVariantId (variant_id), not syncVariantId!
 */

import type { ShippingOption } from "../printful-types";
import { printfulFetch } from "./client";

// ============ API Types ============

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

// ============ API Functions ============

/**
 * Calculate shipping rates for a destination and items
 *
 * IMPORTANT: Items must use catalogVariantId (variant_id), NOT syncVariantId!
 * This is because shipping rates are based on the physical product dimensions/weight,
 * which come from Printful's catalog, not your customized products.
 *
 * @param recipient - Shipping destination address
 * @param items - Items to ship (must use catalogVariantId from variant.variant_id)
 * @returns Available shipping options with rates
 */
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
