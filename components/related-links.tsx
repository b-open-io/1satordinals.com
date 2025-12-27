"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const relatedLinks = [
  {
    title: "Protocol Documentation",
    description: "Deep dive into 1Sat Ordinals technical specifications",
    href: "/protocol",
    category: "Technical",
  },
  {
    title: "Developer Guide",
    description: "Start building with 1Sat Ordinals in minutes",
    href: "/developers",
    category: "Developers",
  },
  {
    title: "Ecosystem Projects",
    description: "Explore applications built on 1Sat Ordinals",
    href: "/projects",
    category: "Ecosystem",
  },
];

export function RelatedLinks() {
  return (
    <section className="py-16 border-t border-primary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-8">Learn More</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="group block p-6 border border-primary/20 hover:border-primary/50 transition-all duration-300"
              >
                <div className="text-sm text-primary mb-2">
                  {link.category}
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {link.title}
                </h4>
                <p className="text-gray-400 text-sm mb-4">
                  {link.description}
                </p>
                <div className="flex items-center text-primary text-sm font-medium">
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}