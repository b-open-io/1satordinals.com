import Image from "next/image";

export const metadata = {
  title: "Projects | 1Sat Ordinals",
  description: "Explore projects and applications built on 1Sat Ordinals",
};

const projects = [
  {
    name: "MintFlow.me",
    description: "Streamlined NFT minting platform built on 1Sat Ordinals protocol",
    url: "https://mintflow.me",
    category: "Tools",
  },
  {
    name: "Alchema.world",
    description: "World of Alchema - decentralized multiplayer online role-playing game",
    url: "https://alchema.world",
    category: "Gaming",
  },
  {
    name: "1Sat.Market",
    description: "Marketplace for trading 1Sat Ordinals and tokens",
    url: "https://1sat.market",
    category: "Marketplace",
  },
  {
    name: "sCrypt",
    description: "Smart contract development platform for BSV",
    url: "https://scrypt.io",
    category: "Development",
  },
  {
    name: "WhatsOnChain",
    description: "BSV blockchain explorer with ordinals support",
    url: "https://whatsonchain.com",
    category: "Infrastructure",
  },
  {
    name: "BubbleMint",
    description: "Token creation and minting platform",
    url: "https://bubblemint.io",
    category: "Tools",
  },
  {
    name: "Zoide",
    description: "Ordinals viewing and management tools",
    url: "https://zoide.io",
    category: "Tools",
  },
  {
    name: "Firesat",
    description: "Ordinals indexer and API services",
    url: "https://firesat.io",
    category: "Infrastructure",
  },
  {
    name: "JungleBus",
    description: "Real-time blockchain data subscription service",
    url: "https://junglebus.gorillapool.io",
    category: "Infrastructure",
  },
  {
    name: "Bitcoin Schema",
    description: "Standard schemas for Bitcoin data",
    url: "https://bitcoinschema.org",
    category: "Development",
  },
];

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Projects & Ecosystem
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Discover tools, marketplaces, and applications built on 1Sat
              Ordinals
            </p>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
            Featured Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Image
                src="/images/glow-ordi.png"
                alt="1Sat Ordinal Example"
                width={400}
                height={300}
                className="aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">1Sat Ordinals Gallery</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Explore unique digital art and collectibles
                </p>
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-shadow">
              <Image
                src="/images/scrypt-1sat.png"
                alt="sCrypt 1Sat Integration"
                width={400}
                height={300}
                className="aspect-video object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">sCrypt Smart Contracts</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Programmable 1Sat Ordinals with smart contracts
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="w-full py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold tracking-tight mb-12">
            All Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {project.category}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {project.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full border-t bg-muted/50 py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              Want to Add Your Project?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join the growing ecosystem of 1Sat Ordinals applications
            </p>
            <div className="mt-8">
              <a
                href="https://discord.gg/vqj6wpKeEn"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors inline-block"
              >
                Join Discord
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
