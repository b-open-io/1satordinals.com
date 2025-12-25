/**
 * Printful API v1 client
 * Low-level fetch wrapper for all Printful API calls
 */

/**
 * Generic fetch wrapper for Printful API v1
 * Handles authentication, error handling, and response parsing
 */
export async function printfulFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const token = process.env.PRINTFUL_API_KEY;
  if (!token) {
    throw new Error("PRINTFUL_API_KEY is not configured");
  }

  const response = await fetch(`https://api.printful.com${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMsg = data.error?.message || data.result || "Printful API error";
    console.error("Printful API error:", {
      endpoint,
      status: response.status,
      statusText: response.statusText,
      data,
    });
    throw new Error(errorMsg);
  }

  return data;
}
