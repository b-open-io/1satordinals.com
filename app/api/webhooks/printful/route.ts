/**
 * Printful Webhook Handler
 * Handles order status updates from Printful
 *
 * Events:
 * - package_shipped: Order has been shipped
 * - order_updated: Order status changed
 * - order_failed: Order production failed
 * - order_canceled: Order was canceled
 */

import { type NextRequest, NextResponse } from "next/server";
import { ensureOrdersInitialized, sql } from "@/lib/db/client";

export const runtime = "nodejs";

interface PrintfulWebhookPayload {
  type: string;
  created: number;
  retries: number;
  data: {
    order?: {
      id: number;
      external_id?: string;
      status: string;
      shipping?: string;
      shipments?: Array<{
        id: number;
        carrier: string;
        service: string;
        tracking_number: string;
        tracking_url: string;
        created: number;
        ship_date: string;
        shipped_at: number;
        reshipment: boolean;
        items: Array<{
          item_id: number;
          quantity: number;
        }>;
      }>;
    };
  };
}

export async function POST(req: NextRequest) {
  // Ensure orders database is initialized
  await ensureOrdersInitialized();

  try {
    const payload: PrintfulWebhookPayload = await req.json();

    console.log("📦 Printful webhook received:", payload.type);

    const { type, data } = payload;
    const order = data.order;

    if (!order) {
      console.log("ℹ️ No order data in webhook");
      return NextResponse.json({ received: true });
    }

    // Find order in database by Printful order ID
    const dbOrder = await sql`
      SELECT id, status
      FROM orders
      WHERE printful_order_id = ${order.id.toString()}
    `;

    if (dbOrder.length === 0) {
      console.warn(`⚠️ Order not found for Printful ID: ${order.id}`);
      return NextResponse.json({ received: true, warning: "Order not found" });
    }

    const orderId = dbOrder[0].id;
    let newStatus = dbOrder[0].status;

    // Handle different webhook types
    switch (type) {
      case "package_shipped": {
        // Extract shipping info from first shipment
        const shipment = order.shipments?.[0];
        if (shipment) {
          await sql`
            UPDATE orders
            SET
              status = 'shipped',
              tracking_number = ${shipment.tracking_number},
              tracking_url = ${shipment.tracking_url},
              carrier = ${shipment.carrier},
              shipped_at = NOW(),
              updated_at = NOW()
            WHERE id = ${orderId}
          `;
          newStatus = "shipped";
          console.log(
            `✅ Order ${orderId} marked as shipped with tracking: ${shipment.tracking_number}`,
          );
        }
        break;
      }

      case "order_updated": {
        // Map Printful status to our status
        const statusMap: Record<string, string> = {
          draft: "printful_draft",
          pending: "printful_pending",
          failed: "failed",
          canceled: "canceled",
          inprocess: "in_production",
          onhold: "printful_pending",
          partial: "in_production",
          fulfilled: "shipped",
        };

        const mappedStatus = statusMap[order.status] || order.status;

        await sql`
          UPDATE orders
          SET
            status = ${mappedStatus},
            updated_at = NOW()
          WHERE id = ${orderId}
        `;
        newStatus = mappedStatus;
        console.log(`✅ Order ${orderId} status updated to: ${mappedStatus}`);
        break;
      }

      case "order_failed": {
        await sql`
          UPDATE orders
          SET
            status = 'failed',
            printful_error = ${JSON.stringify(order)},
            updated_at = NOW()
          WHERE id = ${orderId}
        `;
        newStatus = "failed";
        console.log(`❌ Order ${orderId} failed`);
        break;
      }

      case "order_canceled": {
        await sql`
          UPDATE orders
          SET
            status = 'canceled',
            updated_at = NOW()
          WHERE id = ${orderId}
        `;
        newStatus = "canceled";
        console.log(`🚫 Order ${orderId} canceled`);
        break;
      }

      default:
        console.log(`ℹ️ Unhandled webhook type: ${type}`);
    }

    // Log event to audit trail
    await sql`
      INSERT INTO order_events (order_id, event_type, source, status, payload)
      VALUES (
        ${orderId},
        ${type},
        'printful',
        ${newStatus},
        ${JSON.stringify(payload)}
      )
    `;

    return NextResponse.json({ received: true, orderId, status: newStatus });
  } catch (error) {
    console.error("❌ Printful webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
