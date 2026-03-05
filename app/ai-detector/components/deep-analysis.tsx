"use client";

import { useEffect, useState } from "react";
import type { DeepAnalysisResult, SentenceVerdictLabel } from "@/lib/ai-detector/types";

interface DeepAnalysisProps {
  result: DeepAnalysisResult | null;
  loading: boolean;
}

function verdictStyles(verdict: SentenceVerdictLabel) {
  switch (verdict) {
    case "ai":
      return {
        bg: "bg-red-500/15",
        border: "border-red-500/30",
        text: "text-red-300",
        dot: "bg-red-400",
      };
    case "human":
      return {
        bg: "bg-emerald-500/15",
        border: "border-emerald-500/30",
        text: "text-emerald-300",
        dot: "bg-emerald-400",
      };
    case "uncertain":
      return {
        bg: "bg-amber-500/15",
        border: "border-amber-500/30",
        text: "text-amber-300",
        dot: "bg-amber-400",
      };
  }
}

function overallVerdictColour(verdict: string): string {
  if (verdict === "Likely AI") return "text-red-400";
  if (verdict === "Likely Human") return "text-emerald-400";
  return "text-amber-400";
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex flex-col items-center gap-2">
        <div className="h-4 w-32 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-12 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="space-y-2">
        <div className="h-8 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-8 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-8 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-8 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-8 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    </div>
  );
}

export function DeepAnalysis({ result, loading }: DeepAnalysisProps) {
  const [visibleSentences, setVisibleSentences] = useState(0);
  const [showReasoning, setShowReasoning] = useState(false);

  useEffect(() => {
    if (!result) {
      setVisibleSentences(0);
      setShowReasoning(false);
      return;
    }

    // Progressive sentence reveal
    const total = result.sentences.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleSentences(current);
      if (current >= total) {
        clearInterval(interval);
        // Show reasoning after all sentences revealed
        setTimeout(() => setShowReasoning(true), 300);
      }
    }, 60);

    return () => clearInterval(interval);
  }, [result]);

  if (loading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50 p-6 backdrop-blur-sm">
        <Skeleton />
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="space-y-5">
      {/* Verdict card */}
      <div
        className="
          rounded-xl border border-neutral-200 bg-neutral-50/50
          dark:border-neutral-800 dark:bg-neutral-900/50
          p-6 text-center backdrop-blur-sm
          animate-in fade-in zoom-in-95 duration-500
        "
        style={{ animationFillMode: "both" }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Deep Analysis
        </p>
        <p className={`mt-2 text-5xl font-bold ${overallVerdictColour(result.verdict)}`}>
          {result.confidence}%
        </p>
        <p className={`mt-1 text-lg font-medium ${overallVerdictColour(result.verdict)}`}>
          {result.verdict}
        </p>
      </div>

      {/* Sentence-by-sentence breakdown */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50 p-5 backdrop-blur-sm">
        <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Sentence Analysis
        </h3>
        <div className="space-y-1.5">
          {result.sentences.map((sentence, i) => {
            const styles = verdictStyles(sentence.verdict);
            const isVisible = i < visibleSentences;

            return (
              <span
                key={i}
                className={`
                  inline rounded px-1 py-0.5 text-sm leading-relaxed
                  transition-all duration-300
                  ${isVisible ? `${styles.bg} text-neutral-800 dark:text-neutral-200` : "text-transparent bg-neutral-200 dark:bg-neutral-800"}
                `}
                title={
                  isVisible
                    ? `${sentence.verdict} (${sentence.confidence}% confidence)`
                    : undefined
                }
              >
                {sentence.text}{" "}
              </span>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 border-t border-neutral-200 dark:border-neutral-800 pt-3">
          {(["human", "uncertain", "ai"] as const).map((v) => {
            const s = verdictStyles(v);
            return (
              <div key={v} className="flex items-center gap-1.5">
                <div className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
                <span className="text-xs capitalize text-neutral-400">{v}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reasoning + patterns */}
      <div
        className={`
          space-y-4 transition-all duration-500
          ${showReasoning ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
        `}
      >
        {/* Reasoning */}
        <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50 p-5 backdrop-blur-sm">
          <h3 className="mb-2 text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Reasoning
          </h3>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
            {result.reasoning}
          </p>
        </div>

        {/* Detected patterns */}
        {result.patterns.length > 0 && (
          <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50 p-5 backdrop-blur-sm">
            <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Detected Patterns
            </h3>
            <div className="flex flex-wrap gap-2">
              {result.patterns.map((pattern, i) => (
                <span
                  key={i}
                  className="
                    rounded-full border border-neutral-200 bg-neutral-100
                    dark:border-neutral-700 dark:bg-neutral-800
                    px-3 py-1 text-xs text-neutral-600 dark:text-neutral-300
                  "
                >
                  {pattern}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
