/**
 * Better Auth Client for Sigma Identity OAuth
 * https://sigmaidentity.com/docs
 *
 * NOTE: This is an OAuth CLIENT authenticating with Sigma Identity.
 * We don't run our own Better Auth server - we use Sigma's auth server.
 * User data is managed locally via Context/localStorage, not session cookies.
 */

import { createAuthClient } from "better-auth/client";
import { sigmaClient } from "@sigma-auth/better-auth-plugin/client";

// Re-export types from Sigma plugin
export type { SigmaUserInfo } from "@sigma-auth/better-auth-plugin/client";

if (!process.env.NEXT_PUBLIC_SIGMA_AUTH_URL) {
  throw new Error("NEXT_PUBLIC_SIGMA_AUTH_URL environment variable is required");
}

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SIGMA_AUTH_URL,
  plugins: [sigmaClient()],
});

// Export sign in method for OAuth flow
export const { signIn } = authClient;
