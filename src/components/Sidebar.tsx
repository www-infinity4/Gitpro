"use client";

import { GPAgent } from "@/types";
import { GP_AGENTS } from "@/lib/data";

interface SidebarProps {
  activeAgent: GPAgent["id"];
  onAgentChange: (id: GPAgent["id"]) => void;
}

export default function Sidebar({ activeAgent, onAgentChange }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-[#0d0d14] border-r border-white/8 flex flex-col">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/8">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛸</span>
          <div>
            <h1 className="text-white font-bold text-lg leading-none tracking-tight">
              GP Suite
            </h1>
            <p className="text-[10px] text-indigo-400 font-medium tracking-widest uppercase mt-0.5">
              Quantum Intelligence
            </p>
          </div>
        </div>
      </div>

      {/* Agent nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest px-2 mb-3">
          AI Agents
        </p>
        {GP_AGENTS.map((agent) => {
          const isActive = agent.id === activeAgent;
          return (
            <button
              key={agent.id}
              onClick={() => onAgentChange(agent.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-600/20 border border-indigo-500/30"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <span
                className={`text-xl flex-shrink-0 ${
                  isActive ? "drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" : ""
                }`}
              >
                {agent.symbol}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold truncate ${
                      isActive ? "text-white" : "text-white/70"
                    }`}
                  >
                    {agent.name}
                  </span>
                  {isActive && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-300 uppercase tracking-wide flex-shrink-0">
                      Active
                    </span>
                  )}
                </div>
                <p
                  className={`text-[11px] truncate mt-0.5 ${
                    isActive ? "text-indigo-300" : "text-white/35"
                  }`}
                >
                  {agent.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/8">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
            G
          </div>
          <div>
            <p className="text-xs font-semibold text-white/80">Guest User</p>
            <p className="text-[10px] text-white/35">Connect GitHub →</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
