"use client";

import { useCallback, useState } from "react";
import { analyseHeuristics } from "@/lib/ai-detector/heuristics";
import type {
  AnalysisPhase,
  DeepAnalysisResult,
  HeuristicResult,
} from "@/lib/ai-detector/types";
import { TextInput } from "./text-input";
import { AnalyseButton } from "./analyse-button";
import { HeuristicScores } from "./heuristic-scores";
import { DeepAnalysis } from "./deep-analysis";

const DAILY_LIMIT = 5;
const STORAGE_KEY = "ai-detector-scans";

function getScanCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;
    const parsed = JSON.parse(data);
    const today = new Date().toISOString().slice(0, 10);
    if (parsed.date !== today) return 0;
    return parsed.count || 0;
  } catch {
    return 0;
  }
}

function incrementScanCount(): void {
  const today = new Date().toISOString().slice(0, 10);
  const current = getScanCount();
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ date: today, count: current + 1 }),
  );
}

export function AiDetectorTool() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<AnalysisPhase>("idle");
  const [heuristicResult, setHeuristicResult] =
    useState<HeuristicResult | null>(null);
  const [deepResult, setDeepResult] = useState<DeepAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canAnalyse = wordCount >= 50 && phase === "idle";

  const handleAnalyse = useCallback(async () => {
    if (!canAnalyse) return;

    // Check rate limit
    if (getScanCount() >= DAILY_LIMIT) {
      setPhase("rate-limited");
      return;
    }

    setError(null);
    setDeepResult(null);

    // Phase 1: Heuristics (instant)
    setPhase("analysing-heuristics");
    const heuristics = analyseHeuristics(text);

    // Small delay for animation effect
    await new Promise((r) => setTimeout(r, 400));
    setHeuristicResult(heuristics);

    // Phase 2: Deep scan
    setPhase("analysing-deep");

    try {
      const response = await fetch("/api/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const result: DeepAnalysisResult = await response.json();
      setDeepResult(result);
      setPhase("complete");
      incrementScanCount();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      // Still show complete state so heuristics remain visible
      setPhase("complete");
    }
  }, [canAnalyse, text]);

  const handleReset = useCallback(() => {
    setText("");
    setPhase("idle");
    setHeuristicResult(null);
    setDeepResult(null);
    setError(null);
  }, []);

  const handleCopyResults = useCallback(() => {
    const parts: string[] = [];

    if (heuristicResult) {
      parts.push(`Quick Analysis: ${heuristicResult.overallScore}% AI likelihood`);
      parts.push("");
      heuristicResult.metrics.forEach((m) => {
        parts.push(`${m.name}: ${m.score}/100`);
      });
    }

    if (deepResult) {
      parts.push("");
      parts.push(`Deep Analysis: ${deepResult.verdict} (${deepResult.confidence}% confidence)`);
      parts.push("");
      parts.push(`Reasoning: ${deepResult.reasoning}`);
      if (deepResult.patterns.length > 0) {
        parts.push("");
        parts.push(`Patterns: ${deepResult.patterns.join(", ")}`);
      }
    }

    parts.push("");
    parts.push("Analysed with tryai.tools/ai-detector");

    navigator.clipboard.writeText(parts.join("\n"));
  }, [heuristicResult, deepResult]);

  const isAnalysing =
    phase === "analysing-heuristics" || phase === "analysing-deep";
  const showHeuristics =
    phase !== "idle" && phase !== "rate-limited" && heuristicResult !== null;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      {/* Text input */}
      <TextInput value={text} onChange={setText} disabled={isAnalysing} />

      {/* Analyse button */}
      <div className="flex justify-center">
        <AnalyseButton
          phase={phase}
          canAnalyse={canAnalyse}
          onAnalyse={handleAnalyse}
          onReset={handleReset}
          onCopyResults={handleCopyResults}
        />
      </div>

      {/* Error message */}
      {error && phase === "complete" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-300">
          {error}
          <span className="block mt-1 text-red-300/60">
            Heuristic analysis results are still shown below.
          </span>
        </div>
      )}

      {/* Heuristic results */}
      <HeuristicScores result={heuristicResult} visible={showHeuristics} />

      {/* Deep analysis results */}
      <DeepAnalysis
        result={deepResult}
        loading={phase === "analysing-deep"}
      />
    </div>
  );
}
