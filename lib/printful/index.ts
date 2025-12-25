/**
 * Printful API Client
 * Re-exports all Printful API modules for convenient importing
 */

// Client
export { printfulFetch } from "./client";
export type {
  PrintfulOrder,
  PrintfulOrderItem,
  PrintfulOrderRecipient,
} from "./orders";
// Orders
export {
  confirmOrder,
  createOrder,
  estimateOrderCosts,
  getOrder,
} from "./orders";
export type { PrintfulSyncProduct, PrintfulSyncVariant } from "./products";
// Products
export {
  getSyncProduct,
  getSyncProducts,
  transformSyncProduct,
  transformSyncVariant,
} from "./products";
// Shipping
export { calculateShipping } from "./shipping";
