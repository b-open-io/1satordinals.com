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

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY environment variable is required");
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2025-12-15.clover",
    });

    // Retrieve the checkout session with all relevant data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "customer_details", "collected_information"],
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

    // Get shipping address from Stripe checkout (newer API exposes this under collected_information)
    const shippingDetails = session.collected_information?.shipping_details;
    const customerDetails = session.customer_details;
    const shippingAddress =
      shippingDetails?.address || customerDetails?.address;

    if (!shippingAddress) {
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
          name: shippingDetails?.name || customerDetails?.name || "Customer",
          address1: shippingAddress.line1 || "",
          address2: shippingAddress.line2 || undefined,
          city: shippingAddress.city || "",
          state_code: shippingAddress.state || "",
          country_code: shippingAddress.country || "US",
          zip: shippingAddress.postal_code || "",
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
