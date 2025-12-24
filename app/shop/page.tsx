import { ProductCard } from "@/components/product-card";
import {
  getSyncProduct,
  getSyncProducts,
  transformSyncProduct,
} from "@/lib/printful";
import type { Product } from "@/lib/printful-types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shop All Products",
  description:
    "Browse all our custom fox-themed merch including mugs, shirts, and more.",
};

async function getProducts(): Promise<Product[]> {
  const syncProducts = await getSyncProducts();

  const products = await Promise.all(
    syncProducts.map(async (sp) => {
      const { sync_product, sync_variants } = await getSyncProduct(sp.id);
      return transformSyncProduct(sync_product, sync_variants);
    }),
  );

  return products;
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Shop All Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our full collection of fox-themed merch
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {products.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No products available at the moment. Check back soon!
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
