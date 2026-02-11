/**
 * Order Details Page - View single order with tracking and timeline
 * Requires Sigma authentication
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  MapPin,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-client";
import { formatPrice } from "@/lib/products";

interface OrderEvent {
  id: string;
  event_type: string;
  source: string;
  status: string;
  created_at: string;
}

interface Order {
  id: string;
  user_email: string;
  stripe_checkout_session_id: string;
  stripe_test_mode: boolean;
  printful_order_id: string;
  status: string;
  items: Array<{
    sync_variant_id: number;
    quantity: number;
  }>;
  shipping_address: {
    name: string;
    address1: string;
    address2?: string;
    city: string;
    state_code?: string;
    country_code: string;
    zip: string;
  };
  shipping_method: string;
  subtotal: number;
  shipping_cost: number;
  tax: number;
  total: number;
  currency: string;
  tracking_number?: string;
  tracking_url?: string;
  carrier?: string;
  error_message?: string;
  created_at: string;
  paid_at?: string;
  shipped_at?: string;
  delivered_at?: string;
}

function getStatusIcon(status: string) {
  const icons: Record<string, typeof Package> = {
    printful_draft: Clock,
    printful_pending: Clock,
    in_production: Package,
    shipped: Truck,
    delivered: CheckCircle,
    failed: XCircle,
    canceled: XCircle,
  };
  return icons[status] || Clock;
}

async function fetchOrder(
  orderId: string,
  email: string,
): Promise<{ order: Order; events: OrderEvent[] }> {
  const response = await fetch(
    `/api/orders/${orderId}?email=${encodeURIComponent(email)}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Order not found");
    }
    throw new Error("Failed to fetch order");
  }

  const data = await response.json();
  return { order: data.order, events: data.events || [] };
}

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { user, isLoading: authLoading } = useAuth();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["order", id, user?.email],
    queryFn: () => fetchOrder(id, user?.email || ""),
    enabled: !authLoading && !!user?.email && !!id,
    staleTime: 30000, // 30 seconds
    refetchInterval: (query) => {
      // Auto-refresh every 30s if order is in progress
      const order = query.state.data?.order;
      if (
        order &&
        ["printful_draft", "printful_pending", "in_production"].includes(
          order.status,
        )
      ) {
        return 30000;
      }
      return false;
    },
  });

  const order = data?.order;
  const events = data?.events || [];

  if (authLoading || (isLoading && !order)) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In Required</h1>
          <p className="mt-4 text-muted-foreground">
            Please sign in with Sigma to view this order.
          </p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>
        <div className="mt-8 text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold">
            {error instanceof Error && error.message === "Order not found"
              ? "Order Not Found"
              : "Error Loading Order"}
          </h1>
          <p className="mt-4 text-muted-foreground">
            {error instanceof Error ? error.message : "Failed to load order"}
          </p>
        </div>
      </div>
    );
  }

  const StatusIcon = getStatusIcon(order.status);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mt-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Order #{order.id.slice(0, 8)}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Placed on{" "}
              {new Date(order.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon className="h-5 w-5" />
            <span className="font-medium capitalize">
              {order.status.replace("_", " ")}
            </span>
            {order.stripe_test_mode && (
              <span className="ml-2 rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                Test Mode
              </span>
            )}
          </div>
        </div>

        {/* Tracking */}
        {order.tracking_number && (
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="font-semibold">Tracking Information</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Carrier: {order.carrier || "Unknown"}
                </p>
                <p className="mt-1 font-mono text-sm">
                  {order.tracking_number}
                </p>
              </div>
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Track Package
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Error Message */}
        {order.error_message && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-100">
                  Order Error
                </h3>
                <p className="mt-1 text-sm text-red-800 dark:text-red-200">
                  {order.error_message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Shipping Address */}
        <div className="rounded-lg border bg-card p-6">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <div>
              <h2 className="font-semibold">Shipping Address</h2>
              <div className="mt-2 text-sm text-muted-foreground">
                <p>{order.shipping_address.name}</p>
                <p>{order.shipping_address.address1}</p>
                {order.shipping_address.address2 && (
                  <p>{order.shipping_address.address2}</p>
                )}
                <p>
                  {order.shipping_address.city}
                  {order.shipping_address.state_code &&
                    `, ${order.shipping_address.state_code}`}{" "}
                  {order.shipping_address.zip}
                </p>
                <p>{order.shipping_address.country_code}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Order Summary</h2>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Shipping ({order.shipping_method})
              </span>
              <span>{formatPrice(order.shipping_cost)}</span>
            </div>
            {order.tax > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        {events.length > 0 && (
          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold">Order Timeline</h2>
            <div className="mt-4 space-y-4">
              {events.map((event, index) => (
                <div key={event.id} className="flex gap-4">
                  <div className="relative">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                    </div>
                    {index < events.length - 1 && (
                      <div className="absolute left-4 top-8 h-full w-px bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-medium capitalize">
                      {event.event_type.replace(/_/g, " ").replace(".", " ")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {" · "}
                      {event.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
