import { Book, Code2, Github, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Breadcrumb } from "@/components/breadcrumb";

const sdkMatrix = [
  {
    name: "@1sat/connect",
    useFor: "Browser dApps that need wallet connect/sign flows.",
    install: "bun add @1sat/connect",
    snippet: `import { createOneSat } from "@1sat/connect";

const onesat = createOneSat({ appName: "My dApp" });
await onesat.connect();`,
  },
  {
    name: "@1sat/react",
    useFor: "React apps using provider/hooks/components.",
    install: "bun add @1sat/react",
    snippet: `import { ConnectButton, OneSatProvider } from "@1sat/react";

<OneSatProvider appName="My App">
  <ConnectButton />
</OneSatProvider>;`,
  },
  {
    name: "@1sat/core + @1sat/client + @1sat/types",
    useFor: "Server scripts, transaction building, and service clients.",
    install: "bun add @1sat/core @1sat/client @1sat/types",
    snippet: `import { createOrdinals } from "@1sat/core";
import { ArcadeClient } from "@1sat/client";
import { ONESAT_MAINNET_URL } from "@1sat/types";`,
  },
  {
    name: "@1sat/wallet-browser + @1sat/wallet-node",
    useFor: "BRC-100 wallet engine factories for browser/node.",
    install: "bun add @1sat/wallet-browser @1sat/wallet-node",
    snippet: `import { createNodeWallet } from "@1sat/wallet-node";

const { wallet } = await createNodeWallet({
  rootKey: process.env.ROOT_KEY!,
  chain: "main",
  dbFilename: "wallet.sqlite",
});`,
  },
] as const;

export const metadata = {
  title: "Developers | 1Sat Ordinals",
  description: "Resources and tools for building on 1Sat Ordinals",
};

export default function DevelopersPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <Breadcrumb items={[{ label: "Developers" }]} />
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Build on 1Sat Ordinals
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Everything you need to create tokens, NFTs, and applications on
              Bitcoin SV
            </p>
          </div>
        </div>
      </section>

      {/* SDK Matrix */}
      <section id="sdk" className="w-full border-t py-16 scroll-mt-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight">
              1Sat SDK Use-Case Matrix
            </h2>
            <p className="mt-3 text-muted-foreground">
              Pick packages by app surface. These are reference snippets for
              builders and are not wired into this website runtime.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Source repository:{" "}
              <a
                href="https://github.com/b-open-io/1sat-sdk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                github.com/b-open-io/1sat-sdk
              </a>
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {sdkMatrix.map((item) => (
                <article
                  key={item.name}
                  className="rounded-lg border bg-card p-6"
                >
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.useFor}
                  </p>
                  <p className="mt-4 text-sm font-medium">Install</p>
                  <pre className="mt-2 overflow-x-auto rounded-md border bg-muted/30 p-3 text-xs">
                    <code>{item.install}</code>
                  </pre>
                  <p className="mt-4 text-sm font-medium">Example</p>
                  <pre className="mt-2 overflow-x-auto rounded-md border bg-muted/30 p-3 text-xs">
                    <code>{item.snippet}</code>
                  </pre>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center">
              Developer Resources
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <a
                href="https://docs.1satordinals.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <Book className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
                  Documentation
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Complete protocol specification, API references, and guides to
                  get you started.
                </p>
              </a>

              <a
                href="https://github.com/bitcoinschema/1sat-ordinals"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <Github className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
                  GitHub Repository
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Explore the source code, contribute, and see examples from the
                  community.
                </p>
              </a>

              <a
                href="https://scrypt.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <Code2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
                  sCrypt Smart Contracts
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Build programmable tokens and smart contracts using sCrypt on
                  BSV.
                </p>
              </a>

              <a
                href="https://discord.gg/3jsTXCzmv5"
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <MessageSquare className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
                  Community Discord
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Join developers, ask questions, and get help from the
                  community.
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">Quick Start</h2>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-semibold">
                  1. Read the Documentation
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Start with the protocol specification at{" "}
                  <a
                    href="https://docs.1satordinals.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    docs.1satordinals.com
                  </a>{" "}
                  to understand how 1Sat Ordinals work.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  2. Explore the Ecosystem
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Check out existing projects and tools on the{" "}
                  <Link
                    href="/projects"
                    className="text-primary hover:underline"
                  >
                    Projects page
                  </Link>{" "}
                  to see what&apos;s possible.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">3. Join the Community</h3>
                <p className="mt-2 text-muted-foreground">
                  Connect with other developers in{" "}
                  <a
                    href="https://discord.gg/3jsTXCzmv5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Discord
                  </a>{" "}
                  to get help and share your work.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold">4. Start Building</h3>
                <p className="mt-2 text-muted-foreground">
                  Use the{" "}
                  <a href="#sdk" className="text-primary hover:underline">
                    SDK matrix above
                  </a>{" "}
                  to choose the right package for your app surface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Tools */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Ecosystem Tools
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <a
                href="https://1sat.market"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-card p-4 hover:shadow transition-shadow"
              >
                <h3 className="font-semibold">1Sat.Market</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Marketplace for trading ordinals
                </p>
              </a>
              <a
                href="https://whatsonchain.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-card p-4 hover:shadow transition-shadow"
              >
                <h3 className="font-semibold">WhatsOnChain</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  BSV blockchain explorer
                </p>
              </a>
              <a
                href="https://scrypt.io"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-card p-4 hover:shadow transition-shadow"
              >
                <h3 className="font-semibold">sCrypt</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Smart contract development
                </p>
              </a>
              <a
                href="https://bitcoinschema.org"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border bg-card p-4 hover:shadow transition-shadow"
              >
                <h3 className="font-semibold">Bitcoin Schema</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Data schemas for BSV
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
