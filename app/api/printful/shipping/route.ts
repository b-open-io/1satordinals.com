import { NextResponse } from "next/server";
import { calculateShipping } from "@/lib/printful";

interface ShippingAddressInput {
  address1?: string;
  city?: string;
  countryCode?: string;
  stateCode?: string;
  zip?: string;
}

interface ShippingItemInput {
  printfulVariantId: number;
  quantity: number;
}

export async function POST(request: Request) {
  let address: ShippingAddressInput | undefined;
  let items: ShippingItemInput[] | undefined;

  try {
    const body = (await request.json()) as {
      address?: ShippingAddressInput;
      items?: ShippingItemInput[];
    };
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
      items.map((item) => ({
        variant_id: item.printfulVariantId,
        quantity: item.quantity,
      })),
    );

    return NextResponse.json({ shippingOptions });
  } catch (error) {
    console.error("Error calculating shipping:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to calculate shipping rates";
    console.error("Detailed error:", {
      message: errorMessage,
      address,
      items,
      error,
    });
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
