import { NextResponse } from "next/server";
import {
  getSyncProduct,
  getSyncProducts,
  transformSyncProduct,
} from "@/lib/printful";
import type { Product } from "@/lib/printful-types";

export const dynamic = "force-dynamic"; // This route must be dynamic
export const revalidate = 60; // Cache for 60 seconds

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Fetch all sync products
    const syncProducts = await getSyncProducts();

    // Fetch full details for each product (to get variants)
    const products: Product[] = await Promise.all(
      syncProducts.map(async (sp) => {
        const { sync_product, sync_variants } = await getSyncProduct(sp.id);
        return transformSyncProduct(sync_product, sync_variants);
      }),
    );

    // Filter by category if specified
    const filteredProducts = category
      ? products.filter((p) => p.category === category)
      : products;

    return NextResponse.json({ products: filteredProducts });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
