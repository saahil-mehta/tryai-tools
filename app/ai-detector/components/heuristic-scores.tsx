"use client";

import { useEffect, useState } from "react";
import type { HeuristicResult } from "@/lib/ai-detector/types";

interface HeuristicScoresProps {
  result: HeuristicResult | null;
  visible: boolean;
}

function AnimatedCounter({ target, delay }: { target: number; delay: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === 0) return;

    const timeout = setTimeout(() => {
      const duration = 600;
      const startTime = performance.now();

      function animate(currentTime: number) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timeout);
  }, [target, delay]);

  return <span className="tabular-nums">{value}</span>;
}

function scoreColour(score: number): string {
  if (score >= 70) return "text-red-400";
  if (score >= 40) return "text-amber-400";
  return "text-emerald-400";
}

function barColour(score: number): string {
  if (score >= 70) return "bg-red-400";
  if (score >= 40) return "bg-amber-400";
  return "bg-emerald-400";
}

function overallLabel(score: number): string {
  if (score >= 70) return "Likely AI";
  if (score >= 40) return "Mixed signals";
  return "Likely human";
}

export function HeuristicScores({ result, visible }: HeuristicScoresProps) {
  if (!result || !visible) return null;

  return (
    <div className="space-y-6">
      {/* Overall quick score */}
      <div
        className="
          rounded-xl border border-neutral-200 bg-neutral-50/50
          dark:border-neutral-800 dark:bg-neutral-900/50
          p-6 text-center backdrop-blur-sm
          animate-in fade-in slide-in-from-bottom-4 duration-500
        "
        style={{ animationFillMode: "both" }}
      >
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Quick Analysis
        </p>
        <p className={`mt-2 text-5xl font-bold ${scoreColour(result.overallScore)}`}>
          <AnimatedCounter target={result.overallScore} delay={100} />
          <span className="text-2xl">%</span>
        </p>
        <p className={`mt-1 text-sm ${scoreColour(result.overallScore)}`}>
          {overallLabel(result.overallScore)}
        </p>
      </div>

      {/* Individual metrics */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {result.metrics.map((metric, i) => (
          <div
            key={metric.key}
            className="
              rounded-lg border border-neutral-200 bg-neutral-50/30
              dark:border-neutral-800 dark:bg-neutral-900/30
              p-4 backdrop-blur-sm
              animate-in fade-in slide-in-from-bottom-2
            "
            style={{
              animationDelay: `${150 + i * 100}ms`,
              animationDuration: "400ms",
              animationFillMode: "both",
            }}
          >
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {metric.name}
              </span>
              <span className={`text-lg font-semibold ${scoreColour(metric.score)}`}>
                <AnimatedCounter target={metric.score} delay={200 + i * 100} />
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-400 dark:text-neutral-500">
              {metric.description}
            </p>
            {/* Score bar */}
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
              <div
                className={`h-full rounded-full ${barColour(metric.score)} transition-all duration-700 ease-out`}
                style={{
                  width: `${metric.score}%`,
                  transitionDelay: `${300 + i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
