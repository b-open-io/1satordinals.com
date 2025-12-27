import { ImageResponse } from "next/og";

// Update metadata
export const runtime = "edge";
export const alt = "1Sat Ordinals Article";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

// We'll use the default font since we don't have custom font files

// Article data (in production, this would come from your CMS or file system)
const getArticleData = (slug: string) => {
  // Map of article slugs to metadata
  const articles = {
    "building-on-bedrock": {
      title: "Building on Bedrock: The Case for Simple, Stable Protocols",
      category: "Technical Deep Dive",
      readTime: "8 min read",
      date: "December 27, 2025"
    },
    "50mb-file-support": {
      title: "50MB File Support Now Live on Mainnet",
      category: "Feature Release",
      readTime: "2 min read",
      date: "December 20, 2025"
    },
    "wallet-partnerships": {
      title: "Partnership with Major BSV Wallets",
      category: "Ecosystem",
      readTime: "4 min read",
      date: "December 15, 2025"
    }
  };

  return articles[slug] || {
    title: "1Sat Ordinals Update",
    category: "Update",
    readTime: "5 min read",
    date: new Date().toLocaleDateString()
  };
};

export default async function Image({ params }: { params: { slug: string } }) {
  const article = getArticleData(params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#000000",
          backgroundImage: `
            linear-gradient(to bottom right, rgba(255, 140, 0, 0.1), transparent),
            linear-gradient(to top left, rgba(255, 140, 0, 0.05), transparent)
          `,
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(rgba(255, 140, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 140, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            opacity: 0.3,
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "60px",
            height: "100%",
            position: "relative",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "auto" }}>
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "32px",
                fontWeight: 700,
                color: "#FF8C00",
                fontFamily: "system-ui",
              }}
            >
              1SAT ORDINALS
            </div>

            {/* Category badge */}
            <div
              style={{
                padding: "8px 16px",
                border: "1px solid rgba(255, 140, 0, 0.5)",
                color: "#FF8C00",
                fontSize: "14px",
                fontFamily: "system-ui",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              {article.category}
            </div>
          </div>

          {/* Article Title */}
          <div
            style={{
              fontSize: article.title.length > 60 ? "48px" : "56px",
              fontWeight: 800,
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "32px",
              fontFamily: "Inter",
              maxWidth: "90%",
            }}
          >
            {article.title}
          </div>

          {/* Metadata */}
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FF8C00",
                  opacity: 0.3,
                  borderRadius: "50%",
                }}
              />
              <span style={{ color: "#999999", fontSize: "18px", fontFamily: "Inter" }}>
                {article.date}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#FF8C00",
                  opacity: 0.3,
                  borderRadius: "50%",
                }}
              />
              <span style={{ color: "#999999", fontSize: "18px", fontFamily: "Inter" }}>
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Decorative elements */}
          <div
            style={{
              position: "absolute",
              top: "40px",
              right: "40px",
              width: "120px",
              height: "120px",
              border: "2px solid rgba(255, 140, 0, 0.2)",
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "40px",
              right: "80px",
              width: "80px",
              height: "80px",
              border: "1px solid rgba(255, 140, 0, 0.1)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}