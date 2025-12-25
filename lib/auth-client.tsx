/**
 * Auth Context for Sigma Identity
 * Manages authentication state locally (not session cookies)
 */

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { SigmaUserInfo } from "./auth";

interface AuthContextType {
  user: SigmaUserInfo | null;
  isLoading: boolean;
  setUser: (user: SigmaUserInfo | null) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  setUser: () => {},
  signOut: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SigmaUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("sigma_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load user from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user to localStorage when it changes
  const handleSetUser = (newUser: SigmaUserInfo | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("sigma_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("sigma_user");
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem("sigma_user");
    localStorage.removeItem("sigma_access_token");
    localStorage.removeItem("sigma_id_token");
    localStorage.removeItem("sigma_refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        setUser: handleSetUser,
        signOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

// Re-export types
export type { SigmaUserInfo };
