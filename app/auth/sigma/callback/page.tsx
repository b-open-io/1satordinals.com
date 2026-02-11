/**
 * Sigma Auth OAuth Callback Page
 * Handles OAuth redirect and stores authenticated user
 */

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth";
import { useAuth } from "@/lib/auth-client";

function getOAuthErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }

  if (
    typeof err === "object" &&
    err !== null &&
    "message" in err &&
    typeof err.message === "string"
  ) {
    return err.message;
  }

  return "Authentication failed";
}

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const hasHandledCallback = useRef(false);

  useEffect(() => {
    // Prevent duplicate callback handling in React Strict Mode/dev remounts
    if (hasHandledCallback.current) {
      return;
    }

    const handleCallback = async () => {
      try {
        const params = new URLSearchParams(searchParams.toString());

        if (!params.get("code") && !params.get("error")) {
          setError("Missing OAuth callback parameters");
          return;
        }

        hasHandledCallback.current = true;

        // Exchange code for tokens and get user data
        const result = await authClient.sigma.handleCallback(params);

        // Store tokens in localStorage
        localStorage.setItem("sigma_access_token", result.access_token);
        localStorage.setItem("sigma_id_token", result.id_token);
        if (result.refresh_token) {
          localStorage.setItem("sigma_refresh_token", result.refresh_token);
        }

        // Store user in auth context (which also saves to localStorage)
        setUser(result.user);

        // Redirect to home
        router.replace("/");
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(getOAuthErrorMessage(err));
      }
    };

    handleCallback();
  }, [searchParams, router, setUser]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600">
            Authentication Failed
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Completing sign in...</h2>
        <p className="mt-2 text-sm text-muted-foreground">Please wait</p>
      </div>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Loading...</h2>
          </div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
