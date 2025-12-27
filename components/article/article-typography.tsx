import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function ArticleTitle({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      "text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent",
      className
    )}>
      {children}
    </h1>
  );
}

export function ArticleLead({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-xl md:text-2xl text-gray-300 leading-relaxed font-light",
      className
    )}>
      {children}
    </p>
  );
}

export function ArticleH2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      "text-3xl md:text-4xl font-bold mt-16 mb-6 text-white",
      className
    )}>
      {children}
    </h2>
  );
}

export function ArticleH3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      "text-2xl md:text-3xl font-semibold mt-12 mb-4 text-white",
      className
    )}>
      {children}
    </h3>
  );
}

export function ArticleP({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      "text-lg leading-relaxed text-gray-300 mb-6",
      className
    )}>
      {children}
    </p>
  );
}