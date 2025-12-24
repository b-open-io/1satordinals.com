import { notFound } from "next/navigation";
import { getSyncProduct, transformSyncProduct } from "@/lib/printful";
import { formatPrice } from "@/lib/products";
import { ProductGallery } from "@/components/product-gallery";
import { ArrowLeft, Package, Truck } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { ProductDetail } from "./product-detail";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getProduct(id: string) {
  try {
    const { sync_product, sync_variants } = await getSyncProduct(id);
    return transformSyncProduct(sync_product, sync_variants);
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | 1SatOrdinals`,
    description: product.description,
    openGraph: {
      title: `${product.name} | 1SatOrdinals`,
      description: product.description,
      images: [product.thumbnail],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | 1SatOrdinals`,
      description: product.description,
      images: [product.thumbnail],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  // Collect all unique images from variants
  const variantImages = product.variants
    .map((v) => v.image)
    .filter((img): img is string => !!img);
  const images = [product.thumbnail, ...variantImages].filter(
    (img, idx, arr) => img && arr.indexOf(img) === idx,
  );

  return (
    <div className="container mx-auto px-4 py-12 lg:py-16 max-w-7xl">
      <div className="mb-8">
        <Link
          href={`/shop/${product.category}`}
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to {product.category}
        </Link>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <ProductGallery images={images} name={product.name} />
        </div>

        <div className="flex flex-col">
          <div className="mb-2 inline-block w-fit rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {product.category}
          </div>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <div className="mb-6 flex items-baseline gap-4">
            <span className="text-3xl font-bold text-foreground">
              {product.minPrice === product.maxPrice
                ? formatPrice(product.minPrice)
                : `${formatPrice(product.minPrice)} - ${formatPrice(product.maxPrice)}`}
            </span>
          </div>

          <div className="mb-8 rounded-lg border bg-muted/50 p-6">
            <p className="text-base leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <ProductDetail product={product} />

          <div className="mt-8 grid grid-cols-2 gap-4 border-t pt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <span>Quality Products</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
