"use client";

import {
  BookOpen,
  Boxes,
  Code2,
  FileText,
  Home,
  MessageCircle,
  Moon,
  Newspaper,
  Package,
  ShoppingBag,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Protocol", href: "/protocol", icon: FileText },
  { label: "Developers", href: "/developers", icon: Code2 },
  { label: "Projects", href: "/projects", icon: Boxes },
  { label: "Updates", href: "/updates", icon: Newspaper },
  { label: "Shop", href: "/shop", icon: ShoppingBag },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Orders", href: "/orders", icon: Package },
];

const EXTERNAL_ITEMS = [
  {
    label: "Documentation",
    href: "https://docs.1satordinals.com",
    icon: BookOpen,
  },
  {
    label: "Discord",
    href: "https://discord.gg/3jsTXCzmv5",
    icon: MessageCircle,
  },
];

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Cmd/Ctrl+K opens the command menu
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }

      // Ignore shortcuts while typing in form fields or editable content.
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        el?.isContentEditable
      ) {
        return;
      }

      // "d" (or Cmd/Ctrl+Shift+D) toggles the dark-mode theme.
      const isThemeCombo =
        (e.metaKey || e.ctrlKey) &&
        e.shiftKey &&
        (e.key === "d" || e.key === "D");
      const isPlainD =
        e.key === "d" && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey;
      if (isThemeCombo || isPlainD) {
        e.preventDefault();
        setTheme(theme === "dark" ? "light" : "dark");
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [theme, setTheme]);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Search pages and actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() => runCommand(() => router.push(item.href))}
              >
                <Icon />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Links">
          {EXTERNAL_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <CommandItem
                key={item.href}
                value={item.label}
                onSelect={() =>
                  runCommand(() => window.open(item.href, "_blank"))
                }
              >
                <Icon />
                <span>{item.label}</span>
              </CommandItem>
            );
          })}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem
            value="Toggle theme dark light mode"
            onSelect={() =>
              runCommand(() => setTheme(theme === "dark" ? "light" : "dark"))
            }
          >
            {theme === "dark" ? <Sun /> : <Moon />}
            <span>Toggle theme</span>
            <CommandShortcut>D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
