"use client";

import { useState, useEffect } from "react";
import { Repo, GitproSuggestion } from "@/types";
import { generateSuggestions, TYPE_CONFIG } from "@/lib/data";
import SuggestionCard from "./SuggestionCard";
import QuantumOrb from "./QuantumOrb";

interface GitproPanelProps {
  repo: Repo | null;
}

type FilterType = "all" | GitproSuggestion["type"];

const SCAN_MESSAGES = [
  "Scanning repo structure…",
  "Analyzing content quality…",
  "Checking styling consistency…",
  "Evaluating design signals…",
  "Computing assimilation pathways…",
  "Triangulating quantum vectors…",
  "Generating recommendations…",
];

export default function GitproPanel({ repo }: GitproPanelProps) {
  const [suggestions, setSuggestions] = useState<GitproSuggestion[]>([]);
  const [scanning, setScanning] = useState(false);
  const [scanMsg, setScanMsg] = useState(SCAN_MESSAGES[0]);
  const [scanProgress, setScanProgress] = useState(0);
  const [filter, setFilter] = useState<FilterType>("all");
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<{ role: "user" | "pro"; text: string }[]>([]);
  const [activeTab, setActiveTab] = useState<"suggestions" | "chat">(
    "suggestions"
  );

  useEffect(() => {
    if (!repo) {
      setSuggestions([]);
      setDismissed(new Set());
      return;
    }
    runScan(repo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repo?.id]);

  async function runScan(r: Repo) {
    setScanning(true);
    setScanProgress(0);
    setSuggestions([]);

    for (let i = 0; i < SCAN_MESSAGES.length; i++) {
      setScanMsg(SCAN_MESSAGES[i]);
      setScanProgress(Math.round(((i + 1) / SCAN_MESSAGES.length) * 100));
      await delay(400);
    }

    setSuggestions(generateSuggestions(r));
    setScanning(false);
    setDismissed(new Set());
    setFilter("all");
  }

  function handleApply(id: string) {
    setSuggestions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, applied: true } : s))
    );
  }

  function handleDismiss(id: string) {
    setDismissed((prev) => new Set([...prev, id]));
  }

  async function handleChat(e: React.FormEvent) {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    setChatInput("");
    setChatLog((prev) => [...prev, { role: "user", text }]);

    await delay(700);
    const response = generateProResponse(text, repo);
    setChatLog((prev) => [...prev, { role: "pro", text: response }]);
  }

  const visible = suggestions.filter(
    (s) =>
      !dismissed.has(s.id) &&
      (filter === "all" || s.type === filter)
  );

  const appliedCount = suggestions.filter((s) => s.applied).length;
  const totalCount = suggestions.length;

  if (!repo) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-10 text-center">
        <QuantumOrb />
        <h2 className="text-white text-xl font-bold mt-6 mb-2">
          Gitpro 🛸 Quantum Mechanic
        </h2>
        <p className="text-white/40 text-sm max-w-xs leading-relaxed">
          Select a repository from the left panel to start a quantum scan.
          I&apos;ll analyze your content, styling, design, and suggest
          assimilations.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-xs">
          {(["content", "styling", "design", "assimilation"] as const).map(
            (t) => (
              <div
                key={t}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/4 border border-white/8"
              >
                <span className="text-base">{TYPE_CONFIG[t].icon}</span>
                <span className="text-xs text-white/50">{TYPE_CONFIG[t].label}</span>
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Panel header */}
      <div className="px-5 py-4 border-b border-white/8 bg-[#0d0d14]">
        <div className="flex items-center gap-3">
          <QuantumOrb />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-white font-bold text-base">Gitpro Pro</h2>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-600/25 text-indigo-300 font-medium">
                🛸 Active
              </span>
            </div>
            <p className="text-white/40 text-xs mt-0.5 truncate">
              Quantum scanning{" "}
              <span className="text-indigo-400 font-medium">{repo.name}</span>
            </p>
          </div>
          {!scanning && totalCount > 0 && (
            <div className="text-right flex-shrink-0">
              <p className="text-white font-bold text-lg leading-none">
                {totalCount}
              </p>
              <p className="text-white/35 text-[10px] mt-0.5">suggestions</p>
            </div>
          )}
        </div>

        {/* Progress bar */}
        {scanning && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-indigo-300">{scanMsg}</span>
              <span className="text-xs text-white/30">{scanProgress}%</span>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          </div>
        )}

        {!scanning && totalCount > 0 && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-white/30">
                {appliedCount}/{totalCount} applied
              </span>
              <button
                onClick={() => runScan(repo)}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Re-scan ↻
              </button>
            </div>
            <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-green-500 rounded-full transition-all duration-500"
                style={{
                  width: totalCount > 0 ? `${(appliedCount / totalCount) * 100}%` : "0%",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/8 bg-[#0d0d14]">
        {(["suggestions", "chat"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-white border-b-2 border-indigo-500"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            {tab === "chat" ? "💬 Ask Pro" : `✨ ${tab}`}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "suggestions" ? (
        <>
          {/* Type filter chips */}
          {!scanning && totalCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto border-b border-white/5">
              <button
                onClick={() => setFilter("all")}
                className={`flex-shrink-0 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                  filter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-white/6 text-white/50 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {(
                Object.keys(TYPE_CONFIG) as GitproSuggestion["type"][]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`flex-shrink-0 flex items-center gap-1.5 text-xs px-3 py-1 rounded-full font-medium transition-colors ${
                    filter === t
                      ? "bg-indigo-600 text-white"
                      : "bg-white/6 text-white/50 hover:bg-white/10"
                  }`}
                >
                  <span>{TYPE_CONFIG[t].icon}</span>
                  {TYPE_CONFIG[t].label}
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {scanning ? (
              <div className="flex flex-col items-center justify-center h-32 gap-3">
                <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white/40 text-sm">Quantum scan in progress…</p>
              </div>
            ) : visible.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-center">
                <span className="text-3xl mb-2">✨</span>
                <p className="text-white/40 text-sm">
                  {suggestions.length === 0
                    ? "No suggestions yet"
                    : "All clear for this filter!"}
                </p>
              </div>
            ) : (
              visible.map((s) => (
                <SuggestionCard
                  key={s.id}
                  suggestion={s}
                  onApply={handleApply}
                  onDismiss={handleDismiss}
                />
              ))
            )}
          </div>
        </>
      ) : (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatLog.length === 0 && (
              <div className="text-center py-6">
                <p className="text-white/30 text-sm">
                  Ask Gitpro 🛸 anything about {repo.name}…
                </p>
                <div className="mt-4 space-y-2">
                  {[
                    "What's the most impactful change I can make?",
                    "How do I improve the README?",
                    "Suggest a better folder structure",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setChatInput(q);
                      }}
                      className="block w-full text-left text-xs text-indigo-400/70 hover:text-indigo-300 px-3 py-2 rounded-lg bg-white/3 hover:bg-white/6 transition-colors border border-white/5"
                    >
                      &ldquo;{q}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chatLog.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "pro" && (
                  <span className="text-lg flex-shrink-0">🛸</span>
                )}
                <div
                  className={`max-w-[85%] px-3 py-2 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-indigo-600/30 text-white border border-indigo-500/20"
                      : "bg-white/5 text-white/80 border border-white/8"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleChat}
            className="flex gap-2 p-4 border-t border-white/8"
          >
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask Gitpro…"
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:outline-none focus:border-indigo-500/60 transition-all"
            />
            <button
              type="submit"
              disabled={!chatInput.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateProResponse(input: string, repo: Repo | null): string {
  const lower = input.toLowerCase();
  if (!repo) return "Please select a repository first and I'll get to work! 🛸";

  if (lower.includes("readme") || lower.includes("read me")) {
    return `For ${repo.name}'s README, I'd focus on: (1) a bold hero section with a screenshot or GIF, (2) badge strip for build/coverage/license, (3) a clear "Quick Start" code block. First impressions matter — readers decide in under 10 seconds whether to stay.`;
  }
  if (lower.includes("folder") || lower.includes("structure")) {
    return `For a ${repo.language ?? "code"} repo like ${repo.name}, a clean top-level structure would be: src/ for all source, tests/ next to the code they cover, docs/ for long-form docs, and scripts/ for CLI helpers. Keep config files in root but minimise clutter.`;
  }
  if (lower.includes("impactful") || lower.includes("important")) {
    return `The highest-impact action right now for ${repo.name} is adding a CI workflow. Repos with green badges get 2–3× more contributors and signal to visitors that the code is actively maintained. I can generate the full YAML — just say the word.`;
  }
  if (lower.includes("design") || lower.includes("style")) {
    return `On design signals: ${repo.name} would benefit from a social preview image (1280×640px), a consistent colour palette in docs, and a logo or icon in the README. These surface across GitHub search, social shares, and the contributor graph.`;
  }
  if (lower.includes("performance") || lower.includes("speed") || lower.includes("fast")) {
    return `For performance in ${repo.name}: audit dependencies for unused packages, enable tree-shaking, add a bundle size badge if it's a frontend repo, and consider caching in your CI workflow. Small wins compound.`;
  }
  return `Quantum mechanic insight for ${repo.name}: the best repos I've analyzed combine clear intent (README), automatic quality gates (CI), and visual identity (design). Tell me which dimension you want to level up and I'll give you a precise action plan. 🛸`;
}
