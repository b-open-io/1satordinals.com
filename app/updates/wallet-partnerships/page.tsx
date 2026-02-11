import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Partnership with Major BSV Wallets | 1Sat Ordinals",
  description:
    "1Sat Ordinals expands wallet ecosystem support to simplify user onboarding, token visibility, and everyday ordinal usage.",
};

export default function WalletPartnershipsPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Updates", href: "/updates" },
              { label: "Wallet Partnerships" },
            ]}
          />

          <div className="max-w-4xl mx-auto mt-8">
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Updates
            </Link>

            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Partnership with Major BSV Wallets
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                December 15, 2025
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />4 min read
              </span>
              <span className="text-primary font-mono">Ecosystem</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto space-y-8 text-gray-300 leading-8">
            <p className="text-xl text-gray-200">
              Wallet integrations are critical for protocol adoption. This
              partnership wave improves discoverability and day-to-day usage of
              1Sat Ordinals assets across the BSV ecosystem.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Why It Matters
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Lower onboarding friction for non-technical users</li>
                <li>Better visibility for token balances and ordinal assets</li>
                <li>More consistent signing and transfer experiences</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                For Builders
              </h2>
              <p>
                Broader wallet support reduces custom integration work for each
                product. Teams can focus on core product behavior while relying
                on standardized wallet surfaces for signing and identity.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                Explore the ecosystem directory
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
