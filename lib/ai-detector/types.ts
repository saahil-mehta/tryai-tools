export type TextType = "prose" | "structured" | "mixed";

export interface HeuristicMetric {
  key: string;
  name: string;
  score: number; // 0-100, higher = more likely AI
  description: string;
}

export interface HeuristicResult {
  metrics: HeuristicMetric[];
  overallScore: number; // 0-100 weighted average
  textType: TextType;
}

export interface Quota {
  used: number;
  limit: number;
}

export type SentenceVerdictLabel = "ai" | "human" | "uncertain";

export interface SentenceVerdict {
  text: string;
  verdict: SentenceVerdictLabel;
  confidence: number; // 0-100
}

export interface DetectedPattern {
  pattern: string;
  explanation: string;
}

export interface AnalysisResult {
  verdict: "Likely AI" | "Likely Human" | "Mixed";
  confidence: number; // 0-100
  sentences: SentenceVerdict[];
  reasoning: string;
  patterns: DetectedPattern[];
  heuristics: HeuristicResult;
  textType: TextType;
}

export type AnalysisPhase =
  | "idle"
  | "analysing"
  | "finishing"
  | "complete"
  | "error"
  | "rate-limited";
