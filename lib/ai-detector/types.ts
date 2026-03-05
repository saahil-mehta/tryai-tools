export interface HeuristicMetric {
  key: string;
  name: string;
  score: number; // 0-100, higher = more likely AI
  description: string;
}

export interface HeuristicResult {
  metrics: HeuristicMetric[];
  overallScore: number; // 0-100 weighted average
}

export type SentenceVerdictLabel = "ai" | "human" | "uncertain";

export interface SentenceVerdict {
  text: string;
  verdict: SentenceVerdictLabel;
  confidence: number; // 0-100
}

export interface AnalysisResult {
  verdict: "Likely AI" | "Likely Human" | "Mixed";
  confidence: number; // 0-100
  sentences: SentenceVerdict[];
  reasoning: string;
  patterns: string[];
  heuristics: HeuristicResult;
}

export type AnalysisPhase =
  | "idle"
  | "analysing"
  | "complete"
  | "error"
  | "rate-limited";
