"use client";

import { useState } from "react";
import { Twitter, Link2, Check } from "lucide-react";

interface ArticleShareProps {
  title: string;
  url?: string;
}

export function ArticleShare({ title, url }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleTwitterShare = () => {
    const tweetText = encodeURIComponent(title);
    const tweetUrl = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}&url=${tweetUrl}&via=1satordinals`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400 mr-2">Share:</span>

      {/* Twitter Share */}
      <button
        onClick={handleTwitterShare}
        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200 flex items-center gap-1"
        aria-label="Copy link"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            <span className="text-xs">Copied!</span>
          </>
        ) : (
          <Link2 className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}