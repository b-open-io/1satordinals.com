/**
 * Orders API - Get user's orders
 * Requires Sigma authentication
 */

import { type NextRequest, NextResponse } from "next/server";
import { ensureOrdersInitialized, sql } from "@/lib/db/client";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  await ensureOrdersInitialized();

  try {
    // Get user pubkey from Authorization header (Sigma access token)
    // For now, we'll use email from query params until we implement full Sigma auth
    const { searchParams } = new URL(req.url);
    const userEmail = searchParams.get("email");
    const userPubkey = searchParams.get("pubkey");

    if (!userEmail && !userPubkey) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // Fetch orders for this user
    const orders = await sql`
      SELECT
        id,
        user_pubkey,
        user_email,
        stripe_checkout_session_id,
        stripe_test_mode,
        printful_order_id,
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
        created_at,
        paid_at,
        shipped_at,
        delivered_at
      FROM orders
      WHERE
        ${userPubkey ? sql`user_pubkey = ${userPubkey}` : sql`user_email = ${userEmail}`}
      ORDER BY created_at DESC
    `;

    return NextResponse.json({
      orders: orders.map((order) => ({
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
      })),
    });
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
