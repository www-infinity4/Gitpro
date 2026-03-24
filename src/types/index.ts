export interface Repo {
  id: string;
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  updatedAt: string;
  htmlUrl: string;
  isPrivate: boolean;
  topics: string[];
  defaultBranch: string;
}

export interface GitproSuggestion {
  id: string;
  type: "content" | "styling" | "design" | "assimilation" | "performance";
  title: string;
  description: string;
  priority: "critical" | "high" | "medium" | "low";
  file?: string;
  codeSnippet?: string;
  applied: boolean;
}

export interface GPAgent {
  id: "gitpal" | "gitpub" | "gitpro" | "gitpin";
  name: string;
  nickname: string;
  symbol: string;
  tagline: string;
  description: string;
  color: string;
  active: boolean;
}

export type SuggestionType = GitproSuggestion["type"];
export type SuggestionPriority = GitproSuggestion["priority"];
