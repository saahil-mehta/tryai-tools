"use client";

import { useEffect, useRef, useState } from "react";
import { ANALYSIS_QUIPS } from "@/lib/ai-detector/analysis-quips";

interface AnalysisProgressProps {
  /** When true, the API has responded. Triggers smooth count to 100%. */
  complete: boolean;
  /** Called after the bar reaches 100% and holds briefly. */
  onFinished: () => void;
}

function pickRandom(exclude: number): number {
  let next: number;
  do {
    next = Math.floor(Math.random() * ANALYSIS_QUIPS.length);
  } while (next === exclude && ANALYSIS_QUIPS.length > 1);
  return next;
}

export function AnalysisProgress({
  complete,
  onFinished,
}: AnalysisProgressProps) {
  const [progress, setProgress] = useState(0);
  const [quipIndex, setQuipIndex] = useState(() => pickRandom(-1));
  const frameRef = useRef(0);
  const startRef = useRef(performance.now());
  const completeRef = useRef(false);
  const completeAtRef = useRef(0);
  const frozenValue = useRef(0);
  const finishedRef = useRef(false);

  // Cycle quips every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!completeRef.current) {
        setQuipIndex((prev) => pickRandom(prev));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Track when `complete` flips to true
  useEffect(() => {
    if (complete && !completeRef.current) {
      completeRef.current = true;
      completeAtRef.current = performance.now();
      frozenValue.current = progress;
    }
  }, [complete, progress]);

  useEffect(() => {
    function tick(now: number) {
      if (finishedRef.current) return;

      const elapsed = now - startRef.current;
      let value: number;

      if (!completeRef.current) {
        // Phase 1: crawl toward 85%
        if (elapsed < 500) {
          value = (elapsed / 500) * 30;
        } else {
          const t = (elapsed - 500) / 1000;
          value = 30 + 55 * (1 - Math.exp(-t / 4));
        }
        value = Math.min(value, 85);
      } else {
        // Phase 2: smooth ease from frozen value to 100%
        const sinceComplete = now - completeAtRef.current;
        const duration = 600;
        const t = Math.min(sinceComplete / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        value = frozenValue.current + (100 - frozenValue.current) * eased;

        if (t >= 1) {
          setProgress(100);
          finishedRef.current = true;
          setTimeout(onFinished, 400);
          return;
        }
      }

      setProgress(value);
      frameRef.current = requestAnimationFrame(tick);
    }

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rounded = Math.round(progress);

  return (
    <div className="w-full space-y-3">
      <div
        className="relative h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--progress-track)" }}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: "var(--progress-fill)",
          }}
        />
      </div>
      <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
        <span className="tabular-nums">{rounded}%</span>
        <span className="mx-2">·</span>
        <span className="inline-block transition-opacity duration-300">
          {ANALYSIS_QUIPS[quipIndex]}
        </span>
      </p>
      <style>{`
        :root {
          --progress-track: #d4d4d4;
          --progress-fill: #171717;
        }
        .dark {
          --progress-track: #404040;
          --progress-fill: #fafafa;
        }
      `}</style>
    </div>
  );
}
