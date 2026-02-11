import { NextResponse } from "next/server";
import { getSyncProduct, transformSyncProduct } from "@/lib/printful";

export const revalidate = 60; // Cache for 60 seconds

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { sync_product, sync_variants } = await getSyncProduct(id);
    const product = transformSyncProduct(sync_product, sync_variants);

    return NextResponse.json({ product });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}
