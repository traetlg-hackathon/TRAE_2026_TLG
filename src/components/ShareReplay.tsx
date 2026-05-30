"use client";

import { useState } from "react";

export default function ShareReplay() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
        copied 
          ? "bg-green-600 text-white" 
          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
      }`}
    >
      {copied ? "Link Copied!" : "Share Replay"}
    </button>
  );
}
