import type { LucideIcon } from "lucide-react";
import { Book, Code2, Github, MessageSquare } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/breadcrumb";

interface SdkEntry {
  name: string;
  useFor: string;
  install: string;
  snippet: string;
}

interface ExternalReference {
  name: string;
  href: string;
  description: string;
}

interface DeveloperResource {
  title: string;
  href: string;
  description: string;
  icon: LucideIcon;
}

interface QuickStartStep {
  title: string;
  content: ReactNode;
}

const sdkMatrix: SdkEntry[] = [
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
];

const protocolReferences: ExternalReference[] = [
  {
    name: "BSV20",
    href: "https://docs.1satordinals.com/fungible-tokens/bsv20",
    description: "Fungible token specification on 1Sat Ordinals.",
  },
  {
    name: "BSV21",
    href: "https://docs.1satordinals.com/fungible-tokens/bsv-21",
    description: "Enhanced fungible token model for advanced use cases.",
  },
  {
    name: "POW20",
    href: "https://protocol.pow20.io/",
    description: "POW20 protocol reference and documentation.",
  },
  {
    name: "MAP",
    href: "https://map.sv",
    description: "Magic Attribute Protocol for structured metadata.",
  },
  {
    name: "Sigma Identity",
    href: "https://sigmaidentity.com",
    description: "Cryptographic identity and auth primitives.",
  },
  {
    name: "AIP",
    href: "https://github.com/b-open-io/AIP",
    description: "Author Identity Protocol reference implementation.",
  },
];

const ecosystemLibraries: ExternalReference[] = [
  {
    name: "js-1sat-ord",
    href: "https://github.com/bitcoinschema/js-1sat-ord",
    description: "JavaScript tooling for 1Sat Ordinals workflows.",
  },
  {
    name: "bsv20-indexer (arrorLabArts)",
    href: "https://github.com/arrorLabArts/bsv20-indexer",
    description: "Community BSV20 indexer implementation.",
  },
  {
    name: "1sat-indexer (shruggr)",
    href: "https://github.com/shruggr/1sat-indexer",
    description: "Indexer service for ordinal/token state tracking.",
  },
  {
    name: "scrypt-ord",
    href: "https://github.com/sCrypt-Inc/scrypt-ord",
    description: "sCrypt-focused 1Sat Ordinals development utilities.",
  },
  {
    name: "bitcoin-sv/go-sdk",
    href: "https://github.com/bitcoin-sv/go-sdk",
    description: "Bitcoin SV Go SDK for backend/infrastructure services.",
  },
];

const apiReferences: ExternalReference[] = [
  {
    name: "JavaScript API Docs",
    href: "https://js.1satordinals.com",
    description: "API docs for JavaScript ordinal/token integrations.",
  },
  {
    name: "GorillaPool Ordinals API",
    href: "https://ordinals.gorillapool.io/api/docs/",
    description: "Indexer/API endpoints for Ordinals data access.",
  },
  {
    name: "1Sat SDK Repository",
    href: "https://github.com/b-open-io/1sat-sdk",
    description: "Canonical SDK source for current package modules.",
  },
];

const developerResources: DeveloperResource[] = [
  {
    title: "Documentation",
    href: "https://docs.1satordinals.com",
    description:
      "Complete protocol specification, API references, and guides to get you started.",
    icon: Book,
  },
  {
    title: "GitHub Repository",
    href: "https://github.com/bitcoinschema/1sat-ordinals",
    description:
      "Explore the source code, contribute, and see examples from the community.",
    icon: Github,
  },
  {
    title: "sCrypt Smart Contracts",
    href: "https://scrypt.io",
    description:
      "Build programmable tokens and smart contracts using sCrypt on BSV.",
    icon: Code2,
  },
  {
    title: "Community Discord",
    href: "https://discord.gg/3jsTXCzmv5",
    description:
      "Join developers, ask questions, and get help from the community.",
    icon: MessageSquare,
  },
];

const quickStartSteps: QuickStartStep[] = [
  {
    title: "1. Read the Documentation",
    content: (
      <>
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
      </>
    ),
  },
  {
    title: "2. Explore the Ecosystem",
    content: (
      <>
        Check out existing projects and tools on the{" "}
        <Link href="/projects" className="text-primary hover:underline">
          Projects page
        </Link>{" "}
        to see what&apos;s possible.
      </>
    ),
  },
  {
    title: "3. Join the Community",
    content: (
      <>
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
      </>
    ),
  },
  {
    title: "4. Start Building",
    content: (
      <>
        Use the{" "}
        <a href="#sdk" className="text-primary hover:underline">
          SDK matrix above
        </a>{" "}
        to choose the right package for your app surface.
      </>
    ),
  },
];

const ecosystemTools: ExternalReference[] = [
  {
    name: "1Sat.Market",
    href: "https://1sat.market",
    description: "Marketplace for trading ordinals",
  },
  {
    name: "WhatsOnChain",
    href: "https://whatsonchain.com",
    description: "BSV blockchain explorer",
  },
  {
    name: "sCrypt",
    href: "https://scrypt.io",
    description: "Smart contract development",
  },
  {
    name: "Bitcoin Schema",
    href: "https://bitcoinschema.org",
    description: "Data schemas for BSV",
  },
];

function SdkCard({ entry }: { entry: SdkEntry }) {
  return (
    <article className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">{entry.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{entry.useFor}</p>
      <p className="mt-4 text-sm font-medium">Install</p>
      <pre className="mt-2 overflow-x-auto rounded-md border bg-muted/30 p-3 text-xs">
        <code>{entry.install}</code>
      </pre>
      <p className="mt-4 text-sm font-medium">Example</p>
      <pre className="mt-2 overflow-x-auto rounded-md border bg-muted/30 p-3 text-xs">
        <code>{entry.snippet}</code>
      </pre>
    </article>
  );
}

function ReferenceListCard({
  title,
  items,
}: {
  title: string;
  items: ExternalReference[];
}) {
  return (
    <article className="rounded-lg border bg-card p-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              {item.name}
            </a>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

function DeveloperResourceCard({ resource }: { resource: DeveloperResource }) {
  const Icon = resource.icon;

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
    >
      <Icon className="h-12 w-12 text-primary" />
      <h3 className="mt-4 text-xl font-semibold group-hover:text-primary transition-colors">
        {resource.title}
      </h3>
      <p className="mt-2 text-muted-foreground">{resource.description}</p>
    </a>
  );
}

export const metadata = {
  title: "Developers | 1Sat Ordinals",
  description: "Resources and tools for building on 1Sat Ordinals",
};

export default function DevelopersPage() {
  return (
    <>
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
              {sdkMatrix.map((entry) => (
                <SdkCard key={entry.name} entry={entry} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Protocol & Library References
            </h2>
            <p className="mt-3 text-muted-foreground">
              Reference links carried forward from the current live ecosystem
              resources so builders can find the same protocol and tooling
              surfaces after cutover.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <ReferenceListCard
                title="Protocol Specs"
                items={protocolReferences}
              />
              <ReferenceListCard
                title="GitHub Libraries"
                items={ecosystemLibraries}
              />
            </div>

            <article className="mt-6 rounded-lg border bg-card p-6">
              <h3 className="text-lg font-semibold">API References</h3>
              <ul className="mt-4 grid gap-4 sm:grid-cols-3">
                {apiReferences.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {item.name}
                    </a>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold tracking-tight text-center">
              Developer Resources
            </h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {developerResources.map((resource) => (
                <DeveloperResourceCard
                  key={resource.title}
                  resource={resource}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">Quick Start</h2>
            <div className="mt-8 space-y-6">
              {quickStartSteps.map((step) => (
                <div key={step.title}>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold tracking-tight">
              Ecosystem Tools
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {ecosystemTools.map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border bg-card p-4 hover:shadow transition-shadow"
                >
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
