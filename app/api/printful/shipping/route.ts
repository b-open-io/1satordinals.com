import { NextResponse } from "next/server";
import { calculateShipping } from "@/lib/printful";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, items } = body;

    if (!address?.countryCode) {
      return NextResponse.json(
        { error: "Country code is required" },
        { status: 400 },
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "Items are required" },
        { status: 400 },
      );
    }

    const shippingOptions = await calculateShipping(
      {
        address1: address.address1,
        city: address.city,
        country_code: address.countryCode,
        state_code: address.stateCode,
        zip: address.zip,
      },
      items.map((item: { variantId: number; quantity: number }) => ({
        sync_variant_id: item.variantId,
        quantity: item.quantity,
      })),
    );

    return NextResponse.json({ shippingOptions });
  } catch (error) {
    console.error("Error calculating shipping:", error);
    return NextResponse.json(
      { error: "Failed to calculate shipping rates" },
      { status: 500 },
    );
  }
}
