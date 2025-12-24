import { NextResponse } from "next/server";
import { confirmOrder, createOrder, estimateOrderCosts } from "@/lib/printful";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, order, orderId } = body;

    if (action === "confirm" && orderId) {
      // Confirm an existing draft order
      const confirmedOrder = await confirmOrder(orderId);
      return NextResponse.json({ order: confirmedOrder });
    }

    if (action === "estimate" && order) {
      // Get cost estimate without creating order
      const estimate = await estimateOrderCosts({
        recipient: {
          name: order.recipient.name,
          address1: order.recipient.address1,
          city: order.recipient.city,
          state_code: order.recipient.stateCode,
          country_code: order.recipient.countryCode,
          zip: order.recipient.zip,
        },
        items: order.items.map(
          (item: { variantId: number; quantity: number }) => ({
            sync_variant_id: item.variantId,
            quantity: item.quantity,
          }),
        ),
      });
      return NextResponse.json({ estimate });
    }

    if (order) {
      // Create a new order (draft by default)
      const confirm = body.confirm === true;
      const newOrder = await createOrder(
        {
          external_id: order.externalId,
          shipping: order.shippingMethod,
          recipient: {
            name: order.recipient.name,
            address1: order.recipient.address1,
            address2: order.recipient.address2,
            city: order.recipient.city,
            state_code: order.recipient.stateCode,
            country_code: order.recipient.countryCode,
            zip: order.recipient.zip,
            phone: order.recipient.phone,
            email: order.recipient.email,
          },
          items: order.items.map(
            (item: {
              variantId: number;
              quantity: number;
              retailPrice?: string;
            }) => ({
              sync_variant_id: item.variantId,
              quantity: item.quantity,
              retail_price: item.retailPrice,
            }),
          ),
        },
        confirm,
      );
      return NextResponse.json({ order: newOrder });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (error) {
    console.error("Error with order:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 },
    );
  }
}
