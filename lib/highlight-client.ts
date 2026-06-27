import type { BundledLanguage, Highlighter } from "shiki";

// Lazily load Shiki on the client so it ships as a separate async chunk
// (kept out of the initial bundle). Used by client components that can't
// highlight at build time; server components use components/code-block.tsx.
let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then(({ createHighlighter }) =>
      createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: ["bash", "typescript", "tsx", "json"],
      }),
    );
  }
  return highlighterPromise;
}

export async function highlightClient(code: string, lang: BundledLanguage) {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });
}
