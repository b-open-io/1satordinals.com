import {
  type BundledLanguage,
  createHighlighter,
  type Highlighter,
} from "shiki";
import { CopyButton } from "@/components/copy-button";

// Languages used across the site's code samples.
const LANGS: BundledLanguage[] = ["bash", "typescript", "tsx", "json"];
const THEMES = { light: "github-light", dark: "github-dark" } as const;

// Cache a single highlighter instance across renders/builds.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [THEMES.light, THEMES.dark],
      langs: LANGS,
    });
  }
  return highlighterPromise;
}

interface CodeBlockProps {
  code: string;
  lang?: BundledLanguage;
}

/**
 * Server component: syntax-highlights `code` with Shiki at build/SSR time
 * (no client-side highlighting JS) and overlays a copy button. Dual light/dark
 * themes are emitted via CSS variables and switched by the `.dark` class in
 * globals.css.
 */
export async function CodeBlock({ code, lang = "bash" }: CodeBlockProps) {
  const highlighter = await getHighlighter();
  const trimmed = code.replace(/\n+$/, "");
  const html = highlighter.codeToHtml(trimmed, {
    lang,
    themes: THEMES,
    // Emit per-token CSS variables (no inline color) so light/dark can be
    // switched with plain CSS in globals.css — no !important needed.
    defaultColor: false,
  });

  return (
    <div className="code-block group relative mt-2 min-w-0">
      <CopyButton code={trimmed} />
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, build-time Shiki output of in-repo strings */}
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
