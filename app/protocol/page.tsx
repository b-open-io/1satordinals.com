import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

export const metadata = {
  title: "Protocol Documentation | 1Sat Ordinals - Bitcoin SV Token System",
  description:
    "Technical documentation for 1Sat Ordinals protocol. Learn how to create 50MB+ NFTs and tokens on Bitcoin SV with single transaction minting and sub-cent costs.",
  keywords: [
    "1Sat Ordinals protocol",
    "BSV token documentation",
    "ordinals specification",
    "Bitcoin SV NFT protocol",
    "token creation guide",
  ],
};

export default function ProtocolPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb items={[{ label: "Protocol" }]} />
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              The 1Sat Ordinals Protocol
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              A chain of single satoshi output spends on Bitcoin SV
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">
              What is 1Sat Ordinals?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              1Sat Ordinals is a superset of the Ordinals Protocol, taking a
              different approach to indexing due to the expanded capacity of the
              BSV blockchain. It&apos;s 100% backward compatible with the
              original Ordinals specification.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              Each 1Sat Ordinal is defined as a chain of single satoshi output
              spends, where each owner transfers 1 satoshi by creating a
              transaction that has a single satoshi output in a position
              determined by ordinals theory.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">Key Features</h2>
            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Single Transaction Minting
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Unlike BTC Ordinals which require commit and reveal
                    transactions, 1Sat Ordinals are minted in a single
                    transaction.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Massive Payload Size
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    Support for inscriptions over 50MB, enabling rich media and
                    complex applications.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Ultra Low Fees</h3>
                  <p className="mt-1 text-muted-foreground">
                    Transaction costs of approximately $0.0001, making it
                    economically viable for any use case.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">Fully Scriptable</h3>
                  <p className="mt-1 text-muted-foreground">
                    Native Bitcoin Script support enables programmable tokens
                    and smart contract functionality.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <Check className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="text-lg font-semibold">
                    Origin-Based Indexing
                  </h3>
                  <p className="mt-1 text-muted-foreground">
                    BSV&apos;s unique capability to support single satoshi
                    outputs enables efficient origin-based indexing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Token Types */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">Token Types</h2>
            <div className="mt-8 space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold">Ordinals (NFTs)</h3>
                <p className="mt-2 text-muted-foreground">
                  Unique, non-fungible tokens used for art, collectibles, and
                  any application requiring distinct, individual tokens. Each
                  ordinal has its own unique identifier and cannot be
                  replicated.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold">BSV20</h3>
                <p className="mt-2 text-muted-foreground">
                  Fungible tokens that work like traditional cryptocurrencies.
                  Perfect for creating currencies, reward points, or any asset
                  where all tokens are interchangeable.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-xl font-semibold">BSV21</h3>
                <p className="mt-2 text-muted-foreground">
                  Enhanced fungible tokens with additional programmability and
                  features. Build advanced token systems with custom logic and
                  functionality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Build?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore the documentation and start creating on 1Sat Ordinals
            </p>
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <a
                href="https://docs.1satordinals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                Read the Docs
              </a>
              <Link
                href="/developers"
                className="text-sm font-semibold leading-6 flex items-center gap-2 hover:text-primary transition-colors"
              >
                Developer Resources <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
