import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CartItem, ShippingOption } from "./printful-types";

interface CartStore {
  items: CartItem[];
  shipping: ShippingOption | null;
  shippingAddress: {
    countryCode: string;
    stateCode?: string;
    city?: string;
    zip?: string;
  } | null;

  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (syncVariantId: number) => void;
  updateQuantity: (syncVariantId: number, quantity: number) => void;
  clearCart: () => void;
  setShipping: (option: ShippingOption | null) => void;
  setShippingAddress: (address: CartStore["shippingAddress"]) => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shipping: null,
      shippingAddress: null,

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.syncVariantId === item.syncVariantId,
      );

      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.syncVariantId === item.syncVariantId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        };
      }

      return {
        items: [...state.items, { ...item, quantity: 1 }],
      };
    }),

  removeItem: (syncVariantId) =>
    set((state) => ({
      items: state.items.filter((item) => item.syncVariantId !== syncVariantId),
      // Clear shipping if cart changes
      shipping: null,
    })),

  updateQuantity: (syncVariantId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.syncVariantId !== syncVariantId),
          shipping: null,
        };
      }

      return {
        items: state.items.map((item) =>
          item.syncVariantId === syncVariantId ? { ...item, quantity } : item,
        ),
        // Clear shipping if quantity changes
        shipping: null,
      };
    }),

  clearCart: () => set({ items: [], shipping: null, shippingAddress: null }),

  setShipping: (option) => set({ shipping: option }),

  setShippingAddress: (address) =>
    set({
      shippingAddress: address,
      // Clear shipping when address changes
      shipping: null,
    }),

  getSubtotal: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getTotal: () => {
    const { items, shipping } = get();
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    return subtotal + (shipping?.rate || 0);
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },
    }),
    {
      name: "1sat-cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Re-export types for convenience
export type { CartItem, ShippingOption } from "./printful-types";
