/**
 * User Button Component
 * Shows sign-in button or user menu with Sigma Auth
 */

"use client";

import { LogOut, User } from "lucide-react";
import { useState } from "react";
import { signIn } from "@/lib/auth";
import { useAuth } from "@/lib/auth-client";

export function UserButton() {
  const { user, isLoading, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignIn = () => {
    const callbackURL = `${window.location.origin}/auth/sigma/callback`;
    signIn.sigma({
      clientId: process.env.NEXT_PUBLIC_SIGMA_CLIENT_ID || "1satordinals",
      callbackURL,
    });
  };

  const handleSignOut = () => {
    signOut();
    setMenuOpen(false);
  };

  if (isLoading) {
    return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />;
  }

  if (!user) {
    return (
      <button
        type="button"
        onClick={handleSignIn}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
      >
        {user.picture ? (
          // biome-ignore lint/performance/noImgElement: External avatar from Sigma Identity, not in our control
          <img
            src={user.picture}
            alt={user.name || "Bitcoin User"}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <User className="h-4 w-4" />
        )}
      </button>

      {menuOpen && (
        <>
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: Backdrop click to close menu is standard UX pattern */}
          {/* biome-ignore lint/a11y/noStaticElementInteractions: Backdrop for closing dropdown menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border bg-background shadow-lg">
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium">
                {user.name || "Bitcoin User"}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {user.email ||
                  `${user.pubkey.slice(0, 8)}...${user.pubkey.slice(-6)}`}
              </p>
            </div>
            <div className="py-1">
              <button
                type="button"
                onClick={handleSignOut}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-left transition-colors hover:bg-accent"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
