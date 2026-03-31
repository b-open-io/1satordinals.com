import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://1satordinals.com";

  return [
    {
      url: baseUrl,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/protocol`,
      lastModified: "2025-06-01",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/developers`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: "2025-06-01",
      changeFrequency: "daily",
      priority: 0.8,
    },
    // Individual update articles
    {
      url: `${baseUrl}/updates/50mb-file-support`,
      lastModified: "2025-06-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/updates/building-on-bedrock`,
      lastModified: "2025-06-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/updates/wallet-partnerships`,
      lastModified: "2025-06-01",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Shop
    {
      url: `${baseUrl}/shop`,
      lastModified: "2025-06-01",
      changeFrequency: "daily",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/shop/mugs`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shop/shirts`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/shop/stickers`,
      lastModified: "2025-06-01",
      changeFrequency: "weekly",
      priority: 0.5,
    },
    // Legal
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: "2025-06-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2025-06-01",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
