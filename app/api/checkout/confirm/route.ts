import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createOrder } from "@/lib/printful";

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 },
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });

    // Retrieve the checkout session with all relevant data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details", "shipping_details"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 },
      );
    }

    // Check if order already processed (idempotency)
    if (session.metadata?.printful_order_id) {
      return NextResponse.json({
        success: true,
        orderId: session.metadata.printful_order_id,
        alreadyProcessed: true,
      });
    }

    // Get order data from session metadata
    const printfulItems = JSON.parse(session.metadata?.printful_items || "[]");
    const shippingMethod = session.metadata?.shipping_method;

    if (!printfulItems.length || !shippingMethod) {
      return NextResponse.json(
        { error: "Missing order data in session" },
        { status: 400 },
      );
    }

    // Get shipping address from Stripe checkout
    const shippingDetails = session.shipping_details;
    const customerDetails = session.customer_details;

    if (!shippingDetails?.address) {
      return NextResponse.json(
        { error: "Missing shipping address" },
        { status: 400 },
      );
    }

    // Create Printful order
    const printfulOrder = await createOrder(
      {
        external_id: session.id,
        shipping: shippingMethod,
        recipient: {
          name: shippingDetails.name || customerDetails?.name || "Customer",
          address1: shippingDetails.address.line1 || "",
          address2: shippingDetails.address.line2 || undefined,
          city: shippingDetails.address.city || "",
          state_code: shippingDetails.address.state || "",
          country_code: shippingDetails.address.country || "US",
          zip: shippingDetails.address.postal_code || "",
          email: customerDetails?.email || undefined,
          phone: customerDetails?.phone || undefined,
        },
        items: printfulItems.map(
          (item: { sync_variant_id: number; quantity: number }) => ({
            sync_variant_id: item.sync_variant_id,
            quantity: item.quantity,
          }),
        ),
      },
      true, // Confirm immediately
    );

    // Update Stripe session metadata with Printful order ID for idempotency
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...session.metadata,
        printful_order_id: String(printfulOrder.id),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: printfulOrder.id,
    });
  } catch (err) {
    console.error("Order confirmation error:", err);
    return NextResponse.json(
      { error: "Failed to confirm order" },
      { status: 500 },
    );
  }
}
