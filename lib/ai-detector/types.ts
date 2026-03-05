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

export interface DeepAnalysisResult {
  verdict: "Likely AI" | "Likely Human" | "Mixed";
  confidence: number; // 0-100
  sentences: SentenceVerdict[];
  reasoning: string;
  patterns: string[];
}

export type AnalysisPhase =
  | "idle"
  | "analysing-heuristics"
  | "analysing-deep"
  | "complete"
  | "error"
  | "rate-limited";

export interface AnalysisState {
  phase: AnalysisPhase;
  heuristicResult: HeuristicResult | null;
  deepResult: DeepAnalysisResult | null;
  error: string | null;
}
