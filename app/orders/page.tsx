/**
 * Orders Page - View order history
 * Requires Sigma authentication
 */

"use client";

import {
  AlertCircle,
  CheckCircle,
  Clock,
  Package,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-client";
import { formatPrice } from "@/lib/products";

interface Order {
  id: string;
  stripe_test_mode: boolean;
  printful_order_id: string;
  status: string;
  items: Array<{
    sync_variant_id: number;
    quantity: number;
  }>;
  shipping_address: {
    name: string;
    city: string;
    state_code?: string;
    country_code: string;
  };
  total: number;
  currency: string;
  tracking_number?: string;
  tracking_url?: string;
  created_at: string;
  shipped_at?: string;
}

function getStatusBadge(status: string, testMode: boolean) {
  const statusConfig: Record<
    string,
    { label: string; icon: typeof Package; className: string }
  > = {
    printful_draft: {
      label: "Draft",
      icon: Clock,
      className:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    },
    printful_pending: {
      label: "Pending",
      icon: Clock,
      className:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    },
    in_production: {
      label: "In Production",
      icon: Package,
      className:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    },
    shipped: {
      label: "Shipped",
      icon: Truck,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    delivered: {
      label: "Delivered",
      icon: CheckCircle,
      className:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    },
    failed: {
      label: "Failed",
      icon: XCircle,
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    },
    canceled: {
      label: "Canceled",
      icon: XCircle,
      className:
        "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    },
  };

  const config = statusConfig[status] || statusConfig.printful_pending;
  const Icon = config.icon;

  return (
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
      >
        <Icon className="h-3 w-3" />
        {config.label}
      </span>
      {testMode && (
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200">
          <AlertCircle className="h-3 w-3" />
          Test
        </span>
      )}
    </div>
  );
}

export default function OrdersPage() {
  const { user, isLoading } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) {
      fetchOrders();
    }
  }, [user, isLoading, fetchOrders]);

  async function fetchOrders() {
    try {
      setLoading(true);
      // Use email for now, will use pubkey when fully integrated
      const response = await fetch(
        `/api/orders?email=${encodeURIComponent(user?.email || "")}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  if (isLoading || loading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Sign In Required</h1>
          <p className="mt-4 text-muted-foreground">
            Please sign in with Sigma to view your orders.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="text-center">
          <XCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-3xl font-bold">Error Loading Orders</h1>
          <p className="mt-4 text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={fetchOrders}
            className="mt-6 rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Your Orders</h1>
        <p className="mt-2 text-muted-foreground">
          View and track your order history
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h2 className="mt-4 text-xl font-semibold">No Orders Yet</h2>
          <p className="mt-2 text-muted-foreground">
            When you place an order, it will appear here.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-block rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block rounded-lg border bg-card p-6 transition-colors hover:border-primary"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusBadge(order.status, order.stripe_test_mode)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {order.tracking_number && (
                    <p className="mt-1 text-sm font-medium text-primary">
                      Tracking: {order.tracking_number}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold">
                      {formatPrice(order.total)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Items</p>
                    <p className="text-xl font-bold">
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
