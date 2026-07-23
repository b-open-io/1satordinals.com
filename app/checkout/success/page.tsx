"use client";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import {
  type ConfirmOrderRequest,
  type ConfirmOrderResponse,
  confirmOrder,
} from "@/lib/api";
import { useCartStore } from "@/lib/store";

export const dynamic = "force-dynamic";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);
  const confirmOrderMutation = useMutation<
    ConfirmOrderResponse,
    Error,
    ConfirmOrderRequest
  >({
    mutationFn: confirmOrder,
  });

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!sessionId) return;
    if (
      confirmOrderMutation.isPending ||
      confirmOrderMutation.isSuccess ||
      confirmOrderMutation.isError
    )
      return;

    confirmOrderMutation.mutate({ sessionId });
  }, [sessionId, confirmOrderMutation]);

  const isLoading = confirmOrderMutation.isPending;
  const orderId = confirmOrderMutation.data?.orderId;

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <section className="bg-background py-24">
          <div
            className="container mx-auto max-w-2xl px-4 text-center"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">Processing Order...</h1>
            <p className="text-lg text-muted-foreground">
              Please wait while we confirm your order.
            </p>
          </div>
        </section>
      </div>
    );
  }

  if (confirmOrderMutation.isError && sessionId) {
    return (
      <div className="flex flex-col">
        <section className="bg-background py-24">
          <div
            className="container mx-auto max-w-2xl px-4 text-center"
            role="alert"
            aria-live="assertive"
          >
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
            <h1 className="mb-4 text-4xl font-bold">
              We couldn&apos;t confirm your order
            </h1>
            <p className="mb-8 text-lg text-muted-foreground">
              {confirmOrderMutation.error?.message ||
                "Your payment went through, but we hit a snag confirming the order."}{" "}
              You can retry — you won&apos;t be charged twice.
            </p>
            <button
              type="button"
              onClick={() => confirmOrderMutation.mutate({ sessionId })}
              disabled={confirmOrderMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {confirmOrderMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Retrying…
                </>
              ) : (
                "Try Again"
              )}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <section className="bg-background py-24">
        <div className="container mx-auto max-w-2xl px-4 text-center">
          <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-12 w-12 text-primary" />
          </div>

          <h1 className="mb-4 text-4xl font-bold">Thank You!</h1>

          <p className="mb-4 text-lg text-muted-foreground">
            Your order has been received and is being processed.
          </p>

          {orderId && (
            <p className="mb-4 text-sm text-muted-foreground">
              Order #{orderId}
            </p>
          )}

          <p className="mb-8 text-muted-foreground">
            You'll receive a confirmation email with tracking information once
            your order ships.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background px-6 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col">
          <section className="bg-background py-24">
            <div className="container mx-auto max-w-2xl px-4 text-center">
              <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
              </div>
              <h1 className="mb-4 text-4xl font-bold">Loading...</h1>
            </div>
          </section>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
