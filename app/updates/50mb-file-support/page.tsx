import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "50MB File Support Now Live on Mainnet | 1Sat Ordinals",
  description:
    "1Sat Ordinals now supports 50MB+ payloads on mainnet, enabling richer media, larger artifacts, and fully on-chain application assets.",
};

export default function FiftyMbFileSupportPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Updates", href: "/updates" },
              { label: "50MB File Support" },
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
              50MB File Support Now Live on Mainnet
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                December 20, 2025
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />2 min read
              </span>
              <span className="text-primary font-mono">Feature Release</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <article className="max-w-4xl mx-auto space-y-8 text-gray-300 leading-8">
            <p className="text-xl text-gray-200">
              1Sat Ordinals now supports payloads over 50MB on mainnet. This
              expands what builders can publish on-chain while preserving the
              same single-transaction ordinal model.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                What This Unlocks
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>High-resolution media and complex digital artifacts</li>
                <li>Larger game assets and richer interactive experiences</li>
                <li>Fewer external dependencies for on-chain applications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Builder Impact
              </h2>
              <p>
                Teams can keep protocol behavior stable while pushing product
                surface area much further. Existing indexing and ownership flows
                remain unchanged, so adoption does not require protocol
                migration.
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/developers#sdk"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                See the SDK matrix for implementation paths
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
