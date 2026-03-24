"use client";

import { GPAgent } from "@/types";

interface AgentPlaceholderProps {
  agent: GPAgent;
}

const COMING_FEATURES: Record<GPAgent["id"], string[]> = {
  gitpal: [
    "Floating orb companion that follows your cursor",
    "Suggests pinned content based on your current repo context",
    "Professional career move recommendations",
    "Context-aware tips as you browse code",
  ],
  gitpub: [
    "Checks repos are published and live on every push",
    "Emits file signals when deployments drift from latest commit",
    "One-click build & deploy with configurable toolchains",
    "Live status dashboard for all your published projects",
  ],
  gitpro: [],
  gitpin: [
    "Pins and maps exact content coordinates across your repos",
    "Vector triangulation for optimal content placement",
    "Cross-repo relationship mapping",
    "Semantic clustering of related code and docs",
  ],
};

export default function AgentPlaceholder({ agent }: AgentPlaceholderProps) {
  const features = COMING_FEATURES[agent.id];

  return (
    <div className="flex flex-col items-center justify-center h-full p-10 text-center max-w-md mx-auto">
      {/* Symbol */}
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-5 border-2"
        style={{
          borderColor: `${agent.color}40`,
          background: `${agent.color}12`,
          boxShadow: `0 0 40px ${agent.color}20`,
        }}
      >
        {agent.symbol}
      </div>

      <h2 className="text-white text-2xl font-bold mb-1">{agent.name}</h2>
      <p
        className="text-sm font-semibold mb-2"
        style={{ color: agent.color }}
      >
        {agent.tagline}
      </p>
      <p className="text-white/45 text-sm leading-relaxed mb-6">
        {agent.description}
      </p>

      {/* Features list */}
      <div className="w-full text-left space-y-2.5 mb-8">
        {features.map((f, i) => (
          <div
            key={i}
            className="flex items-start gap-3 px-4 py-3 rounded-lg bg-white/3 border border-white/7"
          >
            <span className="text-lg flex-shrink-0 mt-0.5">
              {["✨", "📡", "🔗", "∆"][i % 4]}
            </span>
            <p className="text-white/55 text-sm leading-snug">{f}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div
        className="w-full px-4 py-3 rounded-xl border text-sm font-medium"
        style={{
          borderColor: `${agent.color}30`,
          background: `${agent.color}10`,
          color: agent.color,
        }}
      >
        Coming soon — part of the GP Suite
      </div>
    </div>
  );
}
