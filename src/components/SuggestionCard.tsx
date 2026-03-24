"use client";

import { useState } from "react";
import { GitproSuggestion } from "@/types";
import { PRIORITY_CONFIG, TYPE_CONFIG } from "@/lib/data";

interface SuggestionCardProps {
  suggestion: GitproSuggestion;
  onApply: (id: string) => void;
  onDismiss: (id: string) => void;
}

export default function SuggestionCard({
  suggestion,
  onApply,
  onDismiss,
}: SuggestionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const pConfig = PRIORITY_CONFIG[suggestion.priority];
  const tConfig = TYPE_CONFIG[suggestion.type];

  async function handleCopy() {
    if (!suggestion.codeSnippet) return;
    await navigator.clipboard.writeText(suggestion.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (suggestion.applied) {
    return (
      <div className="px-4 py-3 border border-white/5 rounded-xl bg-white/3 flex items-center gap-3 opacity-60">
        <span className="text-green-400 text-lg">✓</span>
        <span className="text-white/50 text-sm line-through">
          {suggestion.title}
        </span>
        <span className="ml-auto text-[10px] text-green-500 font-medium">
          Applied
        </span>
      </div>
    );
  }

  return (
    <div
      className="border rounded-xl overflow-hidden transition-all duration-200"
      style={{
        borderColor: expanded ? "rgba(99,102,241,0.35)" : "rgba(255,255,255,0.07)",
        background: expanded ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.02)",
      }}
    >
      {/* Header */}
      <button
        className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-white/3 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="text-lg flex-shrink-0 mt-0.5">{tConfig.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white text-sm font-medium">
              {suggestion.title}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className="text-[9px] font-bold px-1.5 py-0.5 rounded"
              style={{
                color: pConfig.color,
                background: pConfig.bg,
              }}
            >
              {pConfig.label}
            </span>
            <span className="text-[10px] text-white/35">{tConfig.label}</span>
            {suggestion.file && (
              <span className="text-[10px] text-indigo-400/70 font-mono truncate max-w-[160px]">
                {suggestion.file}
              </span>
            )}
          </div>
        </div>
        <span
          className={`text-white/30 text-xs flex-shrink-0 transition-transform duration-200 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-white/6">
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            {suggestion.description}
          </p>

          {suggestion.codeSnippet && (
            <div className="mt-3 relative">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-white/30 uppercase tracking-wider font-medium">
                  Suggested snippet
                </span>
                <button
                  onClick={handleCopy}
                  className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                >
                  {copied ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <pre className="bg-black/40 border border-white/8 rounded-lg p-3 text-xs text-green-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
                {suggestion.codeSnippet}
              </pre>
            </div>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={() => onApply(suggestion.id)}
              className="flex-1 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Apply Suggestion
            </button>
            <button
              onClick={() => onDismiss(suggestion.id)}
              className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/50 text-sm rounded-lg transition-colors"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
