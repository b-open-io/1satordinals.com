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
import type { SigmaSignInOptions } from "@sigma-auth/better-auth-plugin/client";

// Re-export types from Sigma plugin
export type { SigmaUserInfo, OAuthCallbackResult } from "@sigma-auth/better-auth-plugin/client";

if (!process.env.NEXT_PUBLIC_SIGMA_AUTH_URL) {
  throw new Error("NEXT_PUBLIC_SIGMA_AUTH_URL environment variable is required");
}

const client = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SIGMA_AUTH_URL,
  plugins: [sigmaClient() as any], // Type assertion needed - plugin built for older Better Auth version
});

// Type the client with Sigma methods (runtime has them, TypeScript doesn't infer them)
export const authClient = client as typeof client & {
  signIn: typeof client.signIn & {
    sigma: (options?: SigmaSignInOptions) => Promise<unknown>;
  };
  sigma: {
    handleCallback: (searchParams: URLSearchParams) => Promise<import("@sigma-auth/better-auth-plugin/client").OAuthCallbackResult>;
    sign: (requestPath: string, body?: string | object, signatureType?: "bsm" | "brc77") => Promise<string>;
    getIdentity: () => string | null;
    setIdentity: (bapId: string) => void;
    clearIdentity: () => void;
    isReady: () => boolean;
  };
};

// Export sign in method for OAuth flow
export const { signIn } = authClient;
