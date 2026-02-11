/**
 * Stripe Webhook Handler
 * Handles checkout.session.completed events to create Printful orders
 */

import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ensureOrdersInitialized, sql } from "@/lib/db/client";
import type {
  PrintfulOrderItem,
  PrintfulOrderRecipient,
} from "@/lib/printful/orders";
import { createOrder } from "@/lib/printful/orders";

// Disable body parsing - Stripe needs raw body for signature verification
export const runtime = "nodejs";

const requireEnv = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} environment variable is required`);
  }
  return value;
};

const stripeSecretKey = requireEnv("STRIPE_SECRET_KEY");
const webhookSecret = requireEnv("STRIPE_WEBHOOK_SECRET");

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  // Ensure orders database is initialized
  await ensureOrdersInitialized();

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 },
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("⚠️ Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Handle checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log("✅ Checkout session completed:", session.id);

      // Extract order data from metadata
      const printfulItems = JSON.parse(
        session.metadata?.printful_items || "[]",
      );
      const shippingAddressPartial = JSON.parse(
        session.metadata?.shipping_address || "{}",
      );
      const shippingMethod = session.metadata?.shipping_method || "STANDARD";

      // Get full shipping address from collected_information (fallback: customer_details.address)
      const customerDetails = session.customer_details;
      const shippingDetails = session.collected_information?.shipping_details;
      const shippingAddress =
        shippingDetails?.address || customerDetails?.address;

      if (!shippingAddress || !customerDetails?.email) {
        console.error(
          "⚠️ Missing shipping address or email in session:",
          session.id,
        );
        return NextResponse.json(
          { error: "Missing shipping information" },
          { status: 400 },
        );
      }

      // Build Printful recipient from Stripe data
      const recipient: PrintfulOrderRecipient = {
        name: shippingDetails?.name || customerDetails.name || "Customer",
        email: customerDetails.email,
        address1: shippingAddress.line1 || "",
        address2: shippingAddress.line2 || undefined,
        city: shippingAddress.city || shippingAddressPartial.city || "",
        state_code: shippingAddress.state || shippingAddressPartial.state_code,
        country_code:
          shippingAddress.country ||
          shippingAddressPartial.country_code ||
          "US",
        zip: shippingAddress.postal_code || shippingAddressPartial.zip || "",
        phone: customerDetails.phone || undefined,
      };

      // Map cart items to Printful order items
      const orderItems: PrintfulOrderItem[] = printfulItems.map(
        (item: { sync_variant_id: number; quantity: number }) => ({
          sync_variant_id: item.sync_variant_id,
          quantity: item.quantity,
        }),
      );

      // Get user pubkey from Sigma auth (stored in session metadata if available)
      // For now, use email as fallback until we implement storing pubkey in Stripe metadata
      const userPubkey = session.metadata?.user_pubkey || customerDetails.email;

      // Check if order already exists (prevent duplicates)
      const existingOrder = await sql`
        SELECT id FROM orders
        WHERE stripe_checkout_session_id = ${session.id}
      `;

      if (existingOrder.length > 0) {
        console.log("ℹ️ Order already exists for session:", session.id);
        return NextResponse.json({ received: true, duplicate: true });
      }

      try {
        // Create Printful order as DRAFT (confirm=false for safety)
        // This ensures no accidental fulfillment of test orders
        const printfulOrder = await createOrder(
          {
            external_id: `stripe_${session.id}`,
            shipping: shippingMethod,
            recipient,
            items: orderItems,
          },
          false, // ALWAYS create as draft - manual confirmation required
        );

        console.log("✅ Printful draft order created:", printfulOrder.id);

        // Store order in database
        const isTestMode =
          session.mode === "payment" && session.livemode === false;

        await sql`
          INSERT INTO orders (
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
            paid_at
          ) VALUES (
            ${userPubkey},
            ${customerDetails.email},
            ${(session.payment_intent as string) || null},
            ${session.id},
            ${isTestMode},
            ${printfulOrder.id.toString()},
            ${`stripe_${session.id}`},
            'printful_draft',
            ${JSON.stringify(printfulItems)},
            ${JSON.stringify(recipient)},
            ${shippingMethod},
            ${session.amount_subtotal || 0},
            ${(session.amount_total || 0) - (session.amount_subtotal || 0)},
            ${0},
            ${session.amount_total || 0},
            ${session.currency || "usd"},
            NOW()
          )
        `;

        // Log event
        const orderResult = await sql`
          SELECT id FROM orders
          WHERE stripe_checkout_session_id = ${session.id}
        `;

        if (orderResult.length > 0) {
          await sql`
            INSERT INTO order_events (order_id, event_type, source, status, payload)
            VALUES (
              ${orderResult[0].id},
              'checkout.session.completed',
              'stripe',
              'printful_draft',
              ${JSON.stringify(event)}
            )
          `;
        }

        console.log("✅ Order stored in database");

        return NextResponse.json({
          received: true,
          orderId: printfulOrder.id,
          testMode: isTestMode,
        });
      } catch (error) {
        console.error("❌ Error creating Printful order:", error);

        // Store failed order in database for manual review
        await sql`
          INSERT INTO orders (
            user_pubkey,
            user_email,
            stripe_checkout_session_id,
            stripe_test_mode,
            status,
            items,
            shipping_address,
            subtotal,
            total,
            error_message,
            paid_at
          ) VALUES (
            ${userPubkey},
            ${customerDetails.email},
            ${session.id},
            ${session.livemode === false},
            'failed',
            ${JSON.stringify(printfulItems)},
            ${JSON.stringify(recipient)},
            ${session.amount_subtotal || 0},
            ${session.amount_total || 0},
            ${error instanceof Error ? error.message : "Unknown error"},
            NOW()
          )
        `;

        // Still return 200 to acknowledge receipt (don't retry failed Printful orders)
        return NextResponse.json({
          received: true,
          error: "Printful order creation failed",
        });
      }
    }

    // Acknowledge other event types
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("❌ Webhook handler error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 },
    );
  }
}
