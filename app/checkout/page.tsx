"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CreditCard, Loader2, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCartStore } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, shipping, getSubtotal, getTotal, shippingAddress } =
    useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    } else if (!shipping) {
      router.push("/cart");
    }
  }, [items, shipping, router]);

  const handleCheckout = async () => {
    if (items.length === 0 || !shipping) {
      router.push("/cart");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          shipping,
          shippingAddress,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

      if (!publishableKey) {
        throw new Error(
          "Stripe publishable key is not configured. Please add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to your environment variables.",
        );
      }

      const stripe = await loadStripe(publishableKey);

      if (!stripe) {
        throw new Error("Stripe failed to load");
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (stripeError) {
        throw stripeError;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred during checkout";
      console.error("Full error details:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0 || !shipping) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Checkout</h1>
          <p className="mt-2 text-muted-foreground">
            Review your order and complete payment
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-2xl px-4">
          <div className="rounded-xl border-2 border-foreground bg-card p-8 comic-shadow">
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 border-b-2 border-border pb-6">
              {items.map((item) => (
                <div key={item.syncVariantId} className="flex justify-between">
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.variantName} &times; {item.quantity}
                    </p>
                  </div>
                  <p className="font-bold">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">{formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Shipping ({shipping.name})
                </span>
                <span className="font-bold">{formatPrice(shipping.rate)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-border text-xl font-bold">
                <span>Total</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
            </div>

            {/* Shipping info */}
            {shippingAddress && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm font-bold mb-1">Shipping to:</p>
                <p className="text-sm text-muted-foreground">
                  {shippingAddress.city && `${shippingAddress.city}, `}
                  {shippingAddress.stateCode && `${shippingAddress.stateCode} `}
                  {shippingAddress.zip && `${shippingAddress.zip}, `}
                  {shippingAddress.countryCode}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Estimated delivery: {shipping.minDays}-{shipping.maxDays} days
                </p>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-lg border-2 border-destructive bg-destructive/10 p-4 text-sm text-destructive font-medium">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={isLoading}
              className="mt-8 w-full flex items-center justify-center gap-3 rounded-xl border-4 border-foreground bg-primary px-6 py-4 text-lg font-bold text-primary-foreground transition-all comic-shadow hover:comic-shadow-hover disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  Pay {formatPrice(getTotal())}
                </>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Secure payment powered by Stripe</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
