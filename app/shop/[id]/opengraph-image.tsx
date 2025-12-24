import { ImageResponse } from "next/og";
import { getSyncProduct, transformSyncProduct } from "@/lib/printful";
import { formatPrice } from "@/lib/products";

// Image metadata
export const alt = "1SatOrdinals Product";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product;
  try {
    const { sync_product, sync_variants } = await getSyncProduct(Number(id));
    product = transformSyncProduct(sync_product, sync_variants);
  } catch {
    product = null;
  }

  if (!product) {
    return new ImageResponse(
      <div
        style={{
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: "bold", color: "#ef4444" }}>
          Product Not Found
        </div>
      </div>,
      { ...size },
    );
  }

  return new ImageResponse(
    <div
      style={{
        background: "linear-gradient(135deg, #000000 0%, #1a1a1a 100%)",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        padding: "60px",
      }}
    >
      {/* Product Image Container */}
      <div
        style={{
          display: "flex",
          width: "500px",
          height: "500px",
          background: "white",
          border: "4px solid #333",
          borderRadius: "12px",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          marginRight: "60px",
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      {/* Text Content */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <div
          style={{
            fontSize: 32,
            fontWeight: "600",
            color: "#ef4444",
            marginBottom: "16px",
            letterSpacing: "1px",
          }}
        >
          1SatOrdinals Merch
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          {product.name}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              background: "#ef4444",
              color: "white",
              fontSize: 48,
              fontWeight: "bold",
              padding: "16px 32px",
              borderRadius: "8px",
            }}
          >
            {product.minPrice === product.maxPrice
              ? formatPrice(product.minPrice)
              : `From ${formatPrice(product.minPrice)}`}
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
    },
  );
}
