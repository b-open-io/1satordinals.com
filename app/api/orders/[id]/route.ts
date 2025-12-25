/**
 * Order Details API - Get single order with event history
 * Requires Sigma authentication
 */

import { type NextRequest, NextResponse } from "next/server";
import { ensureOrdersInitialized, sql } from "@/lib/db/client";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  await ensureOrdersInitialized();

  try {
    const { id } = await params;
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");
    const userPubkey = searchParams.get("pubkey");

    if (!userEmail && !userPubkey) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Fetch order (verify ownership)
    const orders = await sql`
      SELECT
        id,
        user_pubkey,
        user_email,
        stripe_payment_intent_id,
        stripe_checkout_session_id,
        stripe_test_mode,
        printful_order_id,
        printful_external_id,
        status,
        items,
        shipping_address,
        shipping_method,
        subtotal,
        shipping_cost,
        tax,
        total,
        currency,
        tracking_number,
        tracking_url,
        carrier,
        error_message,
        printful_error,
        created_at,
        updated_at,
        paid_at,
        shipped_at,
        delivered_at
      FROM orders
      WHERE
        id = ${id}
        AND ${userPubkey ? sql`user_pubkey = ${userPubkey}` : sql`user_email = ${userEmail}`}
    `;

    if (orders.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const order = orders[0];

    // Fetch order events
    const events = await sql`
      SELECT
        id,
        event_type,
        source,
        status,
        created_at
      FROM order_events
      WHERE order_id = ${id}
      ORDER BY created_at ASC
    `;

    return NextResponse.json({
      order: {
        ...order,
        // Parse JSON fields
        items:
          typeof order.items === "string"
            ? JSON.parse(order.items)
            : order.items,
        shipping_address:
          typeof order.shipping_address === "string"
            ? JSON.parse(order.shipping_address)
            : order.shipping_address,
      },
      events,
    });
  } catch (error) {
    console.error("❌ Error fetching order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 },
    );
  }
}
