import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, DollarSign, Code2, Lock, FileText, Gauge } from "lucide-react";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            A Simple, Powerful{" "}
            <span className="text-primary">Token Protocol</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            Fast, affordable, and fully scriptable tokens on Bitcoin SV
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/protocol"
              className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
            >
              Learn More
            </Link>
            <a
              href="https://discord.gg/vqj6wpKeEn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 flex items-center gap-2 hover:text-primary transition-colors"
            >
              Join Discord <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* What are 1Sat Ordinals */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What are 1Sat Ordinals?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A chain of single satoshi output spends, where each owner transfers 1 satoshi
              by creating a transaction that has a single satoshi output
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-3">
            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Ordinals (NFTs)</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Unique tokens for art and collectibles where each token is distinct
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">BSV20</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Fungible tokens for currencies and tradable assets
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">BSV21</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Enhanced fungible tokens with advanced features
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why &quot;One Satoshi&quot;?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Because it doesn&apos;t require dust
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <FileText className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Payload Size</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                50MB+ inscriptions supported natively
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Zap className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Single Transaction</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mint in one transaction, not commit and reveal
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <DollarSign className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Low Cost</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                ~$0.0001 per transaction on BSV
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Lock className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Ordinal Locking</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Advanced locking mechanisms for security
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Code2 className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Fully Scriptable</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Native Bitcoin Script support
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <Gauge className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">Scalable</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Built on BSV&apos;s unbounded blockchain
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Showcase */}
      <section className="border-t bg-muted/50 py-24">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              The cool kids
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              An open-protocol ecosystem with rapid development, unexpected turns, and emergent interoperability
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <Image
                  src="/images/glow-ordi.png"
                  alt="1Sat Ordinal Example"
                  width={400}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
                <Image
                  src="/images/scrypt-1sat.png"
                  alt="sCrypt 1Sat Integration"
                  width={400}
                  height={300}
                  className="aspect-video object-cover"
                />
              </div>
              <div className="flex items-center justify-center rounded-lg border bg-card p-8">
                <p className="text-center text-sm text-muted-foreground">
                  More projects coming soon
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/projects"
                className="rounded-md border border-primary px-6 py-3 text-sm font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Browse Projects
              </Link>
              <a
                href="https://docs.1satordinals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold leading-6 flex items-center gap-2 hover:text-primary transition-colors"
              >
                Build Something <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
