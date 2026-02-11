import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import type {
  CartItem,
  ShippingAddress,
  ShippingOption,
} from "@/lib/printful-types";

interface CheckoutRequest {
  items: CartItem[];
  shipping: ShippingOption;
  shippingAddress: ShippingAddress;
}

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-12-15.clover",
    });

    const { items, shipping, shippingAddress }: CheckoutRequest =
      await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    if (!shipping) {
      return NextResponse.json(
        { error: "Shipping method required" },
        { status: 400 },
      );
    }

    if (!shippingAddress) {
      return NextResponse.json(
        { error: "Shipping address required" },
        { status: 400 },
      );
    }

    // Build line items for Stripe
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.variantName,
            images: item.image ? [item.image] : undefined,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      }),
    );

    // Add shipping as a line item
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: `Shipping (${shipping.name})`,
        },
        unit_amount: shipping.rate,
      },
      quantity: 1,
    });

    // Store order data in metadata for Printful order creation on success
    // Stripe metadata values must be strings and max 500 chars each
    // Note: Printful orders use sync_variant_id (your customized products)
    const orderMetadata = {
      printful_items: JSON.stringify(
        items.map((item) => ({
          sync_variant_id: item.syncVariantId,
          quantity: item.quantity,
        })),
      ),
      shipping_method: shipping.id,
      shipping_address: JSON.stringify({
        city: shippingAddress.city,
        state_code: shippingAddress.stateCode,
        country_code: shippingAddress.countryCode,
        zip: shippingAddress.zip,
      }),
    };

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.nextUrl.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
      metadata: orderMetadata,
      // Collect full shipping address at Stripe checkout for Printful fulfillment
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "CA",
          "GB",
          "AU",
          "DE",
          "FR",
          "ES",
          "IT",
          "NL",
          "BE",
          "AT",
          "CH",
        ],
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
