/**
 * OrdLock listing policy for 1satordinals.com (OPL-4693).
 *
 * Create is off until the replacement contract is live (OPL-4699).
 * Buy and cancel of existing listings stay on.
 */
export const listingCreate = false;
export const listingBuy = true;
export const listingCancel = true;
