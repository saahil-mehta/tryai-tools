"use client";

import type { AnalysisPhase } from "@/lib/ai-detector/types";

interface AnalyseButtonProps {
  phase: AnalysisPhase;
  canAnalyse: boolean;
  onAnalyse: () => void;
  onReset: () => void;
  onCopyResults: () => void;
}

const PHASE_LABELS: Partial<Record<AnalysisPhase, string>> = {
  "analysing-heuristics": "Scanning writing patterns...",
  "analysing-deep": "Running deep analysis...",
};

export function AnalyseButton({
  phase,
  canAnalyse,
  onAnalyse,
  onReset,
  onCopyResults,
}: AnalyseButtonProps) {
  const isAnalysing =
    phase === "analysing-heuristics" || phase === "analysing-deep";

  if (phase === "rate-limited") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-6 py-4 text-center">
          <p className="font-medium text-amber-300">
            You&apos;ve used all 5 free scans today
          </p>
          <p className="mt-1 text-sm text-amber-300/70">
            Sign up for 5 more daily scans — coming soon
          </p>
        </div>
        <button
          onClick={onReset}
          className="text-sm text-neutral-500 dark:text-neutral-400 underline-offset-4 hover:text-neutral-700 dark:hover:text-neutral-200 hover:underline transition-colors"
        >
          Analyse new text
        </button>
      </div>
    );
  }

  if (phase === "complete") {
    return (
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={onReset}
          className="
            rounded-lg border border-neutral-200 bg-neutral-100
            dark:border-neutral-700 dark:bg-neutral-800
            px-5 py-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-200
            hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200
          "
        >
          Analyse again
        </button>
        <button
          onClick={onCopyResults}
          className="
            rounded-lg border border-neutral-200 bg-neutral-100
            dark:border-neutral-700 dark:bg-neutral-800
            px-5 py-2.5 text-sm font-medium text-neutral-500 dark:text-neutral-400
            hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors duration-200
          "
        >
          Copy results
        </button>
      </div>
    );
  }

  if (isAnalysing) {
    return (
      <div className="flex flex-col items-center gap-3">
        {/* Progress bar */}
        <div className="h-1.5 w-full max-w-md overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <div
            className={`
              h-full rounded-full transition-all duration-1000 ease-out
              ${phase === "analysing-heuristics" ? "w-1/3 bg-blue-500" : ""}
              ${phase === "analysing-deep" ? "w-2/3 bg-blue-400 animate-pulse" : ""}
            `}
          />
        </div>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 animate-pulse">
          {PHASE_LABELS[phase]}
        </p>
      </div>
    );
  }

  return (
    <button
      onClick={onAnalyse}
      disabled={!canAnalyse}
      className="
        relative w-full max-w-md rounded-xl bg-neutral-900 dark:bg-white px-8 py-3.5
        text-base font-semibold text-white dark:text-neutral-950
        hover:bg-neutral-800 dark:hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-40
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-neutral-900/50 dark:focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950
      "
    >
      Analyse
    </button>
  );
}
