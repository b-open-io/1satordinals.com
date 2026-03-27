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
  alternates: {
    canonical: "https://1satordinals.com/shop",
  },
};

const shopJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://1satordinals.com/shop/#collectionpage",
      "name": "Shop All Products | 1Sat Ordinals",
      "description":
        "Browse the full collection of 1Sat Ordinals fox-themed merchandise including mugs, shirts, and stickers.",
      "url": "https://1satordinals.com/shop",
      "isPartOf": { "@id": "https://1satordinals.com/#website" },
      "publisher": { "@id": "https://bopen.io/#organization" },
      "inLanguage": "en-US",
      "knowsAbout": [
        "1Sat Ordinals Merchandise",
        "Fox-themed Merch",
        "BSV Community Gear",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://1satordinals.com",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Shop",
          "item": "https://1satordinals.com/shop",
        },
      ],
    },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />
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
