import { NextResponse } from "next/server";
import { calculateShipping } from "@/lib/printful";

export async function POST(request: Request) {
  let address;
  let items;

  try {
    const body = await request.json();
    address = body.address;
    items = body.items;

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
      items.map((item: { printfulVariantId: number; quantity: number }) => ({
        variant_id: item.printfulVariantId,
        quantity: item.quantity,
      })),
    );

    return NextResponse.json({ shippingOptions });
  } catch (error) {
    console.error("Error calculating shipping:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to calculate shipping rates";
    console.error("Detailed error:", {
      message: errorMessage,
      address,
      items,
      error,
    });
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 },
    );
  }
}
