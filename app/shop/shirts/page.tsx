import { ProductCard } from "@/components/product-card";
import {
  getSyncProduct,
  getSyncProducts,
  transformSyncProduct,
} from "@/lib/printful";
import type { Product } from "@/lib/printful-types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fox T-Shirts",
  description:
    "Shop our collection of custom fox-themed t-shirts. Soft, comfortable, and adorable!",
};

async function getProducts(): Promise<Product[]> {
  const syncProducts = await getSyncProducts();

  const products = await Promise.all(
    syncProducts.map(async (sp) => {
      const { sync_product, sync_variants } = await getSyncProduct(sp.id);
      return transformSyncProduct(sync_product, sync_variants);
    }),
  );

  return products.filter((p) => p.category === "shirts");
}

export default async function ShirtsPage() {
  const shirts = await getProducts();

  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-gradient-to-b from-background to-muted/20 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h1 className="text-4xl font-bold">Fox T-Shirts</h1>
          <p className="mt-2 text-muted-foreground">
            Soft cotton tees with custom fox artwork
          </p>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto max-w-7xl px-4">
          {shirts.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">
              No shirts available at the moment. Check back soon!
            </p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {shirts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
