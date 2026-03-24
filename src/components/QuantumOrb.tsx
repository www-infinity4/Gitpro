"use client";

import { useEffect, useState } from "react";

export default function QuantumOrb() {
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const particles = Array.from({ length: 6 }, (_, i) => {
    const angle = (i / 6) * 2 * Math.PI + (pulse / 100) * 2 * Math.PI;
    const radius = 28 + Math.sin((pulse / 100) * Math.PI * 2 + i) * 6;
    return {
      x: 40 + Math.cos(angle) * radius,
      y: 40 + Math.sin(angle) * radius,
      size: 3 + Math.sin((pulse / 100) * Math.PI * 2 + i * 0.8) * 1.5,
      opacity: 0.4 + Math.sin((pulse / 100) * Math.PI * 2 + i * 1.2) * 0.4,
    };
  });

  const glowSize = 18 + Math.sin((pulse / 100) * Math.PI * 2) * 4;

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80">
        <defs>
          <radialGradient id="orbGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#a5b4fc" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#6366f1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#312e81" stopOpacity="0.6" />
          </radialGradient>
          <filter id="orbGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer glow ring */}
        <circle
          cx="40"
          cy="40"
          r={glowSize + 8}
          fill="none"
          stroke="rgba(99,102,241,0.15)"
          strokeWidth="1"
        />

        {/* Orbit ring */}
        <ellipse
          cx="40"
          cy="40"
          rx="32"
          ry="10"
          fill="none"
          stroke="rgba(165,180,252,0.2)"
          strokeWidth="1"
          strokeDasharray="4 3"
          transform={`rotate(${(pulse / 100) * 360} 40 40)`}
        />

        {/* Particles */}
        {particles.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="#a5b4fc"
            opacity={p.opacity}
            filter="url(#orbGlow)"
          />
        ))}

        {/* Core orb */}
        <circle cx="40" cy="40" r={glowSize} fill="url(#orbGrad)" />

        {/* Specular highlight */}
        <ellipse
          cx="34"
          cy="33"
          rx="7"
          ry="5"
          fill="rgba(255,255,255,0.25)"
        />
      </svg>

      {/* 🛸 emoji overlay */}
      <span className="absolute text-2xl select-none pointer-events-none">
        🛸
      </span>
    </div>
  );
}
