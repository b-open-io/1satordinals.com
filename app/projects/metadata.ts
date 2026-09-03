import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/projects",
  title: "Ecosystem Projects",
  description:
    "Explore the ecosystem of applications, tools, and platforms built on 1Sat Ordinals protocol on Bitcoin SV.",
});
