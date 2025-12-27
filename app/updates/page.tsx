import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata: Metadata = {
  title: "Updates & News | 1Sat Ordinals - Latest Protocol Developments",
  description:
    "Stay updated with the latest 1Sat Ordinals protocol developments, feature releases, and ecosystem news. Learn about new capabilities for Bitcoin SV tokens.",
  keywords: [
    "1Sat Ordinals updates",
    "BSV token news",
    "protocol updates",
    "ordinals development",
    "Bitcoin SV news",
  ],
};

// Mock data - replace with CMS or markdown files
const updates = [
  {
    id: 1,
    title: "Building on Bedrock: The Case for Simple, Stable Protocols",
    excerpt: "Explore why simple, stable protocols like 1Sat Ordinals provide the best foundation for blockchain development. Learn from Bitcoin's philosophy of protocol stability.",
    date: "2025-12-27",
    readTime: "8 min read",
    category: "Technical Deep Dive",
    slug: "building-on-bedrock",
  },
  {
    id: 2,
    title: "50MB File Support Now Live on Mainnet",
    excerpt: "Create massive NFTs and store entire applications on-chain with our expanded file size support, now available for all users.",
    date: "2025-12-20",
    readTime: "2 min read",
    category: "Feature Release",
    slug: "50mb-file-support",
  },
  {
    id: 3,
    title: "Partnership with Major BSV Wallets",
    excerpt: "1Sat Ordinals is now natively supported in HandCash, MoneyButton, and ElectrumSV, making token management easier than ever.",
    date: "2025-12-15",
    readTime: "4 min read",
    category: "Ecosystem",
    slug: "wallet-partnerships",
  },
];

export default function UpdatesPage() {
  const latestUpdate = updates[0];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-16 md:py-24 border-b border-primary/20">
        <div className="container mx-auto px-4">
          <Breadcrumb items={[{ label: "Updates" }]} />
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-black mb-6">
              Protocol Updates & News
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Stay informed about the latest developments in the 1Sat Ordinals ecosystem
            </p>

            {/* Latest Update Feature */}
            <div className="mt-12 p-8 bg-primary/10 border border-primary/30 rounded-lg text-left">
              <div className="flex items-center gap-2 text-primary text-sm mb-4">
                <span className="font-semibold">LATEST UPDATE</span>
                <Calendar className="w-4 h-4" />
                <span>{new Date(latestUpdate.date).toLocaleDateString()}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3">
                {latestUpdate.title}
              </h2>
              <p className="text-gray-400 mb-4">
                {latestUpdate.excerpt}
              </p>
              <Link
                href={`/updates/${latestUpdate.slug}`}
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                Read full update
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Updates List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">All Updates</h2>

            <div className="space-y-8">
              {updates.map((update) => (
                <article
                  key={update.id}
                  className="p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                    <span className="text-primary font-medium">
                      {update.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(update.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {update.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    <Link
                      href={`/updates/${update.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {update.title}
                    </Link>
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {update.excerpt}
                  </p>

                  <Link
                    href={`/updates/${update.slug}`}
                    className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
                  >
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </article>
              ))}
            </div>

            {/* RSS Feed Link */}
            <div className="mt-12 p-6 bg-black/40 border border-primary/20 rounded-lg text-center">
              <p className="text-gray-400 mb-4">
                Subscribe to stay updated with the latest 1Sat Ordinals developments
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="/feed.xml"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded transition-colors"
                >
                  RSS Feed
                </Link>
                <Link
                  href="https://discord.gg/1satordinals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-black font-semibold rounded transition-colors"
                >
                  Join Discord
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}