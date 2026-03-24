"use client";

import { useState } from "react";
import { Repo } from "@/types";
import { GP_AGENTS } from "@/lib/data";
import Sidebar from "@/components/Sidebar";
import RepoConnector from "@/components/RepoConnector";
import GitproPanel from "@/components/GitproPanel";
import AgentPlaceholder from "@/components/AgentPlaceholder";

type AgentId = "gitpal" | "gitpub" | "gitpro" | "gitpin";

export default function Home() {
  const [activeAgent, setActiveAgent] = useState<AgentId>("gitpro");
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const currentAgent = GP_AGENTS.find((a) => a.id === activeAgent)!;

  return (
    <div className="flex h-screen w-full overflow-hidden relative z-10">
      {/* Sidebar */}
      <div
        className={`flex-shrink-0 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        <Sidebar activeAgent={activeAgent} onAgentChange={setActiveAgent} />
      </div>

      {/* Main area */}
      <div className="flex flex-1 min-w-0 overflow-hidden">
        {/* Repo panel (only shown for gitpro) */}
        {activeAgent === "gitpro" && (
          <div className="w-72 flex-shrink-0 border-r border-white/8 bg-[#0a0a12] flex flex-col overflow-hidden">
            <RepoConnector
              selectedRepo={selectedRepo}
              onSelect={(r) => setSelectedRepo(r)}
            />
          </div>
        )}

        {/* AI panel */}
        <div className="flex-1 min-w-0 bg-[#0b0b14] overflow-hidden flex flex-col">
          {/* Top bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-white/8 bg-[#0d0d18] flex-shrink-0">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="text-white/40 hover:text-white/70 transition-colors text-lg leading-none"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <div className="flex items-center gap-2 flex-1">
              <span className="text-lg">{currentAgent.symbol}</span>
              <span className="text-white font-semibold text-sm">
                {currentAgent.name}
              </span>
              <span className="text-white/35 text-xs">·</span>
              <span className="text-white/35 text-xs">
                {currentAgent.tagline}
              </span>
            </div>

            {/* GP Suite badge */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <span className="text-xs">🛸</span>
              <span className="text-[11px] font-semibold text-white/50 tracking-wider">
                GP SUITE
              </span>
            </div>
          </div>

          {/* Agent content */}
          <div className="flex-1 overflow-hidden">
            {activeAgent === "gitpro" ? (
              <GitproPanel repo={selectedRepo} />
            ) : (
              <div className="h-full overflow-y-auto">
                <AgentPlaceholder agent={currentAgent} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
