"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { ThemeToggle } from "./theme-toggle";
import { UserButton } from "./user-button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4 mx-auto max-w-7xl">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/logo-light.png"
            alt="1Sat Ordinals"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          <Link
            href="/protocol"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Protocol
          </Link>
          <Link
            href="/developers"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Developers
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Projects
          </Link>
          <Link
            href="/shop"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Shop
          </Link>
          <a
            href="https://docs.1satordinals.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Docs
          </a>
          <a
            href="https://discord.gg/vqj6wpKeEn"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Discord
          </a>
          <Link
            href="/cart"
            className="relative inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <UserButton />
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {itemCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
          <UserButton />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container space-y-1 px-4 py-4">
            <Link
              href="/protocol"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Protocol
            </Link>
            <Link
              href="/developers"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Developers
            </Link>
            <Link
              href="/projects"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/shop"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <a
              href="https://docs.1satordinals.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent"
            >
              Docs
            </a>
            <a
              href="https://discord.gg/vqj6wpKeEn"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md bg-primary px-3 py-2 text-base font-medium text-primary-foreground"
            >
              Discord
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
