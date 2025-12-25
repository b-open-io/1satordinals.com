/**
 * Sigma Auth Token Exchange API
 * Exchanges OAuth code for tokens using Bitcoin Auth signatures
 * https://sigmaidentity.com/docs
 */

import { createCallbackHandler } from "@sigma-auth/better-auth-plugin/next";

export const runtime = "nodejs";
export const POST = createCallbackHandler();
