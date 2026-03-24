"use client";

import { useState } from "react";
import { Repo } from "@/types";
import { SAMPLE_REPOS, LANGUAGE_COLORS, formatDate } from "@/lib/data";

interface RepoConnectorProps {
  selectedRepo: Repo | null;
  onSelect: (repo: Repo) => void;
}

export default function RepoConnector({
  selectedRepo,
  onSelect,
}: RepoConnectorProps) {
  const [search, setSearch] = useState("");
  const [connected] = useState(true); // simulated connected state

  const filtered = SAMPLE_REPOS.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description ?? "").toLowerCase().includes(search.toLowerCase())
  );

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <span className="text-5xl mb-4">🔗</span>
        <h2 className="text-white text-xl font-bold mb-2">
          Connect Your GitHub
        </h2>
        <p className="text-white/50 text-sm mb-6 max-w-xs">
          Link your GitHub account to pull in your repos and let Gitpro 🛸
          analyze and upgrade them.
        </p>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg transition-colors">
          Authorize with GitHub
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-white/8">
        <h2 className="text-white font-semibold text-sm mb-3">
          Your Repositories
        </h2>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 text-sm">
            🔍
          </span>
          <input
            type="text"
            placeholder="Filter repos…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-indigo-500/60 focus:bg-white/8 transition-all"
          />
        </div>
      </div>

      {/* Repo list */}
      <div className="flex-1 overflow-y-auto py-2">
        {filtered.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">
            No repos match your filter.
          </p>
        ) : (
          filtered.map((repo) => {
            const isSelected = selectedRepo?.id === repo.id;
            const langColor = repo.language
              ? (LANGUAGE_COLORS[repo.language] ?? "#888")
              : null;

            return (
              <button
                key={repo.id}
                onClick={() => onSelect(repo)}
                className={`w-full text-left px-4 py-3 border-b border-white/5 transition-all duration-150 hover:bg-white/5 ${
                  isSelected
                    ? "bg-indigo-600/10 border-l-2 border-l-indigo-500"
                    : "border-l-2 border-l-transparent"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white/80 text-sm font-medium truncate">
                        {repo.name}
                      </span>
                      {repo.isPrivate && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-white/40 font-medium flex-shrink-0">
                          Private
                        </span>
                      )}
                    </div>
                    {repo.description && (
                      <p className="text-white/35 text-[11px] mt-0.5 line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  {repo.language && langColor && (
                    <div className="flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: langColor }}
                      />
                      <span className="text-[10px] text-white/40">
                        {repo.language}
                      </span>
                    </div>
                  )}
                  <span className="text-[10px] text-white/30">
                    ⭐ {repo.stars}
                  </span>
                  <span className="text-[10px] text-white/30 ml-auto">
                    {formatDate(repo.updatedAt)}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
