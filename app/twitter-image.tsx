import { ImageResponse } from "next/og";

// Image metadata
export const alt = "1Sat Ordinals - Fast, Flexible Tokenization on BSV";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
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
        padding: "80px",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          color: "white",
          marginBottom: 24,
          textAlign: "center",
        }}
      >
        1Sat Ordinals
      </div>
      <div
        style={{
          fontSize: 36,
          color: "#999",
          textAlign: "center",
          maxWidth: 800,
        }}
      >
        Fast, Flexible Tokenization on BSV
      </div>
    </div>,
    {
      ...size,
    },
  );
}
