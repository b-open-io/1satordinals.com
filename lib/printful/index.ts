/**
 * Printful API Client
 * Re-exports all Printful API modules for convenient importing
 */

// Client
export { printfulFetch } from "./client";

// Products
export {
  getSyncProducts,
  getSyncProduct,
  transformSyncProduct,
  transformSyncVariant,
} from "./products";
export type { PrintfulSyncProduct, PrintfulSyncVariant } from "./products";

// Shipping
export { calculateShipping } from "./shipping";

// Orders
export {
  createOrder,
  getOrder,
  confirmOrder,
  estimateOrderCosts,
} from "./orders";
export type {
  PrintfulOrder,
  PrintfulOrderItem,
  PrintfulOrderRecipient,
} from "./orders";
