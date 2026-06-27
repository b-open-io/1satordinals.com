"use client";

import { useEffect, useState } from "react";
import type { BundledLanguage } from "shiki";
import { CopyButton } from "@/components/copy-button";
import { highlightClient } from "@/lib/highlight-client";

interface CodeBlockClientProps {
  code: string;
  lang?: BundledLanguage;
}

/**
 * Client counterpart to components/code-block.tsx for code that lives inside
 * client components. Highlighting is lazy (Shiki loads as a separate chunk);
 * a styled fallback renders until it resolves. Output matches the server
 * component via the shared `.code-block` / `.shiki` styles in globals.css.
 */
export function CodeBlockClient({ code, lang = "bash" }: CodeBlockClientProps) {
  const trimmed = code.replace(/\n+$/, "");
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    highlightClient(trimmed, lang).then((out) => {
      if (active) setHtml(out);
    });
    return () => {
      active = false;
    };
  }, [trimmed, lang]);

  return (
    <div className="code-block group relative mt-2 min-w-0">
      <CopyButton code={trimmed} />
      {html ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted Shiki output of in-repo strings
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre className="fallback">
          <code>{trimmed}</code>
        </pre>
      )}
    </div>
  );
}
