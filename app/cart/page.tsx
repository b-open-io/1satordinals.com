"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ShippingCalculator } from "@/components/shipping-calculator";
import { formatPrice } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getTotal, shipping } =
    useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col">
        <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <h1 className="text-4xl font-bold">Shopping Cart</h1>
          </div>
        </section>

        <section className="bg-background py-16">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <p className="mb-6 text-lg text-muted-foreground">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="mt-2 text-muted-foreground">
            {items.length} {items.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items */}
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.syncVariantId}
                    className="flex gap-4 rounded-xl border-2 border-foreground bg-card p-4 comic-shadow"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 border-foreground bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-bold">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {item.variantName}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.syncVariantId)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.syncVariantId,
                                item.quantity - 1,
                              )
                            }
                            className="rounded-lg border-2 border-foreground p-1 transition-colors hover:bg-accent"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-8 text-center font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.syncVariantId,
                                item.quantity + 1,
                              )
                            }
                            className="rounded-lg border-2 border-foreground p-1 transition-colors hover:bg-accent"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="font-bold text-lg">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Calculator */}
              <ShippingCalculator />
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-xl border-2 border-foreground bg-card p-6 sticky top-20 comic-shadow">
                <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

                <div className="space-y-3 border-b-2 border-border pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">
                      {formatPrice(getSubtotal())}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shipping ? (
                      <span className="font-bold">
                        {formatPrice(shipping.rate)}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Calculate above
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>{formatPrice(getTotal())}</span>
                </div>

                <Link
                  href="/checkout"
                  className={`mt-6 block w-full rounded-xl border-4 border-foreground bg-primary px-6 py-3 text-center font-bold text-primary-foreground transition-all comic-shadow hover:comic-shadow-hover ${
                    !shipping ? "opacity-50 pointer-events-none" : ""
                  }`}
                  aria-disabled={!shipping}
                >
                  {shipping ? "Proceed to Checkout" : "Select Shipping First"}
                </Link>

                <Link
                  href="/shop"
                  className="mt-4 block text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
