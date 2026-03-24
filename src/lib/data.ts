import { Repo, GitproSuggestion, GPAgent } from "@/types";

export const GP_AGENTS: GPAgent[] = [
  {
    id: "gitpal",
    name: "Gitpal",
    nickname: "Ace",
    symbol: "🔮",
    tagline: "The Palace AI",
    description:
      "Pop-up orb companion that follows you, suggests pinned content and professional moves.",
    color: "#a855f7",
    active: false,
  },
  {
    id: "gitpub",
    name: "Gitpub",
    nickname: "Pubby",
    symbol: "📡",
    tagline: "Publisher AI",
    description:
      "Emits file signals, checks your repos are published and live, edits and builds your repos with tools.",
    color: "#22d3ee",
    active: false,
  },
  {
    id: "gitpro",
    name: "Gitpro",
    nickname: "Pro",
    symbol: "🛸",
    tagline: "Quantum Mechanic",
    description:
      "Hooks you up with top-level page content edits, styling, design ideas, and adds assimilations.",
    color: "#6366f1",
    active: true,
  },
  {
    id: "gitpin",
    name: "Gitpin",
    nickname: "Pin",
    symbol: "∆",
    tagline: "Vector Triangulator",
    description:
      "Pins and maps the exact coordinates of your content, triangulating the best placements.",
    color: "#f59e0b",
    active: false,
  },
];

export const SAMPLE_REPOS: Repo[] = [
  {
    id: "1",
    name: "portfolio-site",
    fullName: "devuser/portfolio-site",
    description: "My personal portfolio built with Next.js and Tailwind CSS",
    language: "TypeScript",
    stars: 42,
    forks: 7,
    updatedAt: "2026-03-20T14:32:00Z",
    htmlUrl: "https://github.com/devuser/portfolio-site",
    isPrivate: false,
    topics: ["nextjs", "tailwind", "portfolio"],
    defaultBranch: "main",
  },
  {
    id: "2",
    name: "api-gateway",
    fullName: "devuser/api-gateway",
    description: "Microservices API gateway with rate limiting and auth",
    language: "Go",
    stars: 118,
    forks: 23,
    updatedAt: "2026-03-22T09:11:00Z",
    htmlUrl: "https://github.com/devuser/api-gateway",
    isPrivate: false,
    topics: ["go", "microservices", "api"],
    defaultBranch: "main",
  },
  {
    id: "3",
    name: "design-system",
    fullName: "devuser/design-system",
    description: "Component library and design tokens for internal products",
    language: "TypeScript",
    stars: 67,
    forks: 12,
    updatedAt: "2026-03-23T18:05:00Z",
    htmlUrl: "https://github.com/devuser/design-system",
    isPrivate: true,
    topics: ["react", "storybook", "design-system"],
    defaultBranch: "develop",
  },
  {
    id: "4",
    name: "data-pipeline",
    fullName: "devuser/data-pipeline",
    description: "ETL pipeline for analytics data processing",
    language: "Python",
    stars: 29,
    forks: 4,
    updatedAt: "2026-03-18T07:44:00Z",
    htmlUrl: "https://github.com/devuser/data-pipeline",
    isPrivate: false,
    topics: ["python", "etl", "data"],
    defaultBranch: "main",
  },
];

export function generateSuggestions(repo: Repo): GitproSuggestion[] {
  const base: GitproSuggestion[] = [
    {
      id: `${repo.id}-1`,
      type: "content",
      title: "Enhance README hero section",
      description:
        "Your README lacks a visual hero badge strip. Add shields.io badges for build status, coverage, and license to immediately signal repo health to visitors.",
      priority: "high",
      file: "README.md",
      codeSnippet: `![Build](https://img.shields.io/github/actions/workflow/status/${repo.fullName}/ci.yml)
![License](https://img.shields.io/github/license/${repo.fullName})
![Stars](https://img.shields.io/github/stars/${repo.fullName}?style=social)`,
      applied: false,
    },
    {
      id: `${repo.id}-2`,
      type: "styling",
      title: "Consistent code style enforcement",
      description:
        "No `.editorconfig` detected. Adding one ensures consistent indentation and line endings across all contributors and editors.",
      priority: "medium",
      file: ".editorconfig",
      codeSnippet: `root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true`,
      applied: false,
    },
    {
      id: `${repo.id}-3`,
      type: "design",
      title: "Add social preview image",
      description:
        "Repos without a social preview image show a generic GitHub card on link shares. A branded 1280×640px OG image dramatically increases click-through from Twitter, LinkedIn, and Discord.",
      priority: "high",
      file: ".github/og-image.png",
      applied: false,
    },
    {
      id: `${repo.id}-4`,
      type: "assimilation",
      title: "Integrate Gitpub 📡 for live deployment checks",
      description:
        "Connect Gitpub to automatically verify every push is live and serving correctly. Pubby will emit file signals when your deployment drifts from the latest commit.",
      priority: "medium",
      applied: false,
    },
    {
      id: `${repo.id}-5`,
      type: "performance",
      title: "Add GitHub Actions CI workflow",
      description:
        "No CI workflow found. A basic test-and-lint pipeline catches regressions before they reach main and signals repo quality to potential collaborators.",
      priority: "critical",
      file: ".github/workflows/ci.yml",
      codeSnippet: `name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm test`,
      applied: false,
    },
    {
      id: `${repo.id}-6`,
      type: "content",
      title: "Add CONTRIBUTING guide",
      description:
        "No CONTRIBUTING.md found. A contribution guide lowers the barrier for new contributors and sets expectations for PRs, code style, and review process.",
      priority: "low",
      file: "CONTRIBUTING.md",
      applied: false,
    },
  ];

  if (repo.language === "TypeScript" || repo.language === "JavaScript") {
    base.push({
      id: `${repo.id}-7`,
      type: "styling",
      title: "Enable strict TypeScript mode",
      description:
        'Enabling `"strict": true` in tsconfig.json catches type errors that slip through loose mode, dramatically reducing runtime bugs.',
      priority: "high",
      file: "tsconfig.json",
      codeSnippet: `{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}`,
      applied: false,
    });
  }

  return base;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  "C++": "#f34b7d",
  C: "#555555",
  Swift: "#F05138",
  Kotlin: "#A97BFF",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
};

export const PRIORITY_CONFIG: Record<
  GitproSuggestion["priority"],
  { label: string; color: string; bg: string }
> = {
  critical: { label: "CRITICAL", color: "#ef4444", bg: "rgba(239,68,68,0.12)" },
  high: { label: "HIGH", color: "#f97316", bg: "rgba(249,115,22,0.12)" },
  medium: { label: "MED", color: "#eab308", bg: "rgba(234,179,8,0.12)" },
  low: { label: "LOW", color: "#22c55e", bg: "rgba(34,197,94,0.12)" },
};

export const TYPE_CONFIG: Record<
  GitproSuggestion["type"],
  { label: string; icon: string }
> = {
  content: { label: "Content", icon: "✏️" },
  styling: { label: "Styling", icon: "🎨" },
  design: { label: "Design", icon: "🖼️" },
  assimilation: { label: "Assimilation", icon: "🔗" },
  performance: { label: "Performance", icon: "⚡" },
};
