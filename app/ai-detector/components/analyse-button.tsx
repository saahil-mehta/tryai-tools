"use client";

import type { AnalysisPhase } from "@/lib/ai-detector/types";

interface AnalyseButtonProps {
  phase: AnalysisPhase;
  canAnalyse: boolean;
  hasResult: boolean;
  onAnalyse: () => void;
  onReset: () => void;
  onCopyResults: () => void;
  onDownload: () => void;
}

export function AnalyseButton({
  phase,
  canAnalyse,
  hasResult,
  onAnalyse,
  onReset,
  onCopyResults,
  onDownload,
}: AnalyseButtonProps) {
  if (phase === "rate-limited") {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-6 py-4 text-center">
          <p className="font-medium text-amber-600 dark:text-amber-300">
            You&apos;ve hit the daily character limit (1M characters)
          </p>
          <p className="mt-1 text-sm text-amber-600/70 dark:text-amber-300/70">
            Come back tomorrow for a fresh allowance
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

  if (phase === "complete" || phase === "error") {
    const btnClass = `
      rounded-lg bg-neutral-900 dark:bg-white
      px-4 py-2 text-sm font-medium text-white dark:text-neutral-950
      hover:bg-neutral-700 dark:hover:bg-neutral-300
      active:scale-[0.97] transition-all duration-150
    `;

    return (
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button onClick={onReset} className={btnClass}>
          Start over
        </button>
        {phase === "complete" && hasResult && (
          <>
            <button onClick={onCopyResults} className={btnClass}>
              Copy report
            </button>
            <button onClick={onDownload} className={btnClass}>
              Download PDF
            </button>
          </>
        )}
      </div>
    );
  }

  // Hide button while analysing/finishing — progress bar takes over
  if (phase === "analysing" || phase === "finishing") {
    return null;
  }

  return (
    <button
      onClick={onAnalyse}
      disabled={!canAnalyse}
      className="
        relative w-full max-w-md rounded-xl bg-neutral-900 dark:bg-white px-8 py-3.5
        text-base font-semibold text-white dark:text-neutral-950
        hover:bg-neutral-700 dark:hover:bg-neutral-300
        active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40
        transition-all duration-150
        focus:outline-none focus:ring-2 focus:ring-neutral-900/50 dark:focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-950
      "
    >
      Analyse
    </button>
  );
}
