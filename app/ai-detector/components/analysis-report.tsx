"use client";

import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type {
  AnalysisResult,
  HeuristicMetric,
  SentenceVerdictLabel,
} from "@/lib/ai-detector/types";

// --- Helpers ---

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

function verdictColour(verdict: string): string {
  if (verdict === "Likely AI") return "text-red-400";
  if (verdict === "Likely Human") return "text-emerald-400";
  return "text-amber-400";
}

function sentenceStyles(verdict: SentenceVerdictLabel) {
  switch (verdict) {
    case "ai":
      return { bg: "bg-red-500/15", dot: "bg-red-400" };
    case "human":
      return { bg: "bg-emerald-500/15", dot: "bg-emerald-400" };
    case "uncertain":
      return { bg: "bg-amber-500/15", dot: "bg-amber-400" };
  }
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

// --- Skeleton ---

function ReportSkeleton() {
  return (
    <div className="animate-pulse space-y-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
      {/* Verdict skeleton */}
      <div className="bg-white p-8 text-center dark:bg-neutral-950">
        <div className="mx-auto h-4 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mx-auto mt-4 h-14 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mx-auto mt-2 h-5 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
      {/* Reasoning skeleton */}
      <div className="bg-white p-6 dark:bg-neutral-950">
        <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-3 space-y-2">
          <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-5/6 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
      {/* Sentences skeleton */}
      <div className="bg-white p-6 dark:bg-neutral-950">
        <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-800" />
        <div className="mt-3 space-y-1.5">
          <div className="h-6 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-4/5 rounded bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-6 w-full rounded bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}

// --- Section Components ---

function VerdictHero({ result }: { result: AnalysisResult }) {
  return (
    <div className="bg-white p-8 text-center dark:bg-neutral-950">
      <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Confidence
      </p>
      <p className={`mt-2 text-6xl font-bold ${verdictColour(result.verdict)}`}>
        <AnimatedCounter target={result.confidence} delay={100} />
        <span className="text-3xl">%</span>
      </p>
      <p
        className={`mt-1 text-lg font-medium ${verdictColour(result.verdict)}`}
      >
        {result.verdict}
      </p>
    </div>
  );
}

function Reasoning({ text }: { text: string }) {
  return (
    <div className="bg-white p-6 dark:bg-neutral-950">
      <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Reasoning
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
        {text}
      </p>
    </div>
  );
}

function SentenceAnalysis({
  sentences,
}: {
  sentences: AnalysisResult["sentences"];
}) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const total = sentences.length;
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setVisibleCount(current);
      if (current >= total) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, [sentences]);

  return (
    <div className="bg-white p-6 dark:bg-neutral-950">
      <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Sentence analysis
      </h3>
      <div className="mt-3">
        {sentences.map((sentence, i) => {
          const styles = sentenceStyles(sentence.verdict);
          const isVisible = i < visibleCount;

          return (
            <span
              key={i}
              className={`
                inline rounded px-1 py-0.5 text-sm leading-relaxed
                transition-all duration-300
                ${isVisible ? `${styles.bg} text-neutral-800 dark:text-neutral-200` : "bg-neutral-200 text-transparent dark:bg-neutral-800"}
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
      <div className="mt-4 flex flex-wrap gap-4 border-t border-neutral-200 pt-3 dark:border-neutral-800">
        {(["human", "uncertain", "ai"] as const).map((v) => {
          const s = sentenceStyles(v);
          return (
            <div key={v} className="flex items-center gap-1.5">
              <div className={`h-2.5 w-2.5 rounded-full ${s.dot}`} />
              <span className="text-xs capitalize text-neutral-400">
                {v}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function signalLabel(score: number): string {
  if (score >= 70) return "Strong AI signal";
  if (score >= 40) return "Moderate";
  if (score >= 15) return "Weak signal";
  return "No signal";
}

function MetricRow({ metric, index }: { metric: HeuristicMetric; index: number }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex cursor-default items-center gap-4 px-5 py-3">
          <span className="min-w-0 flex-1 text-sm text-neutral-600 dark:text-neutral-400">
            <span className="truncate">{metric.name}</span>
            <span className={`ml-2 text-xs ${scoreColour(metric.score)} opacity-70`}>
              {signalLabel(metric.score)}
            </span>
          </span>
          <span
            className={`w-10 text-right text-sm font-semibold tabular-nums ${scoreColour(metric.score)}`}
          >
            <AnimatedCounter target={Math.round(metric.score)} delay={200 + index * 80} />
          </span>
          <div className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className={`h-full rounded-full ${barColour(metric.score)} transition-all duration-700 ease-out`}
              style={{
                width: `${metric.score}%`,
                transitionDelay: `${300 + index * 80}ms`,
              }}
            />
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">
        {metric.description}
      </TooltipContent>
    </Tooltip>
  );
}

function StatisticalIndicators({
  metrics,
}: {
  metrics: HeuristicMetric[];
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="bg-white dark:bg-neutral-950">
        <details className="group" open>
        <summary className="cursor-pointer list-none px-6 py-4 text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 flex items-center justify-between">
          Statistical indicators
          <span className="text-neutral-400 dark:text-neutral-500 group-open:rotate-180 transition-transform duration-200">
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </summary>
        <p className="px-6 pb-2 text-xs text-neutral-400 dark:text-neutral-500">
          Each score is 0-100. Higher means more likely AI-generated. Hover a row to see what it measures.
        </p>
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800/50">
          {metrics.map((metric, i) => (
            <MetricRow key={metric.key} metric={metric} index={i} />
          ))}
        </div>
        </details>
      </div>
    </TooltipProvider>
  );
}

function DetectedPatterns({ patterns }: { patterns: string[] }) {
  if (patterns.length === 0) return null;

  return (
    <div className="bg-white p-6 dark:bg-neutral-950">
      <h3 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
        Detected patterns
      </h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {patterns.map((pattern, i) => (
          <span
            key={i}
            className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
          >
            {pattern}
          </span>
        ))}
      </div>
    </div>
  );
}

// --- Main Report ---

interface AnalysisReportProps {
  result: AnalysisResult | null;
  loading: boolean;
}

export function AnalysisReport({ result, loading }: AnalysisReportProps) {
  if (loading) return <ReportSkeleton />;
  if (!result) return null;

  return (
    <div
      className="
        overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200
        dark:border-neutral-800 dark:bg-neutral-800
        animate-in fade-in slide-in-from-bottom-4 duration-500
      "
      style={{ animationFillMode: "both" }}
    >
      <div className="grid gap-px">
        <VerdictHero result={result} />
        <Reasoning text={result.reasoning} />
        <SentenceAnalysis sentences={result.sentences} />
        <StatisticalIndicators metrics={result.heuristics.metrics} />
        <DetectedPatterns patterns={result.patterns} />
      </div>
    </div>
  );
}

// --- PDF-only Report (light-mode, off-screen) ---

interface PdfReportProps {
  result: AnalysisResult;
  reportRef: React.RefObject<HTMLDivElement | null>;
}

function verdictColourStatic(verdict: string): string {
  if (verdict === "Likely AI") return "#f87171";
  if (verdict === "Likely Human") return "#34d399";
  return "#fbbf24";
}

function sentenceBgStatic(verdict: SentenceVerdictLabel): string {
  switch (verdict) {
    case "ai":
      return "rgba(239, 68, 68, 0.15)";
    case "human":
      return "rgba(16, 185, 129, 0.15)";
    case "uncertain":
      return "rgba(245, 158, 11, 0.15)";
  }
}

function barColourStatic(score: number): string {
  if (score >= 70) return "#f87171";
  if (score >= 40) return "#fbbf24";
  return "#34d399";
}

export function PdfReport({ result, reportRef }: PdfReportProps) {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      ref={reportRef}
      style={{
        position: "absolute",
        left: "-9999px",
        top: 0,
        width: "680px",
        backgroundColor: "#ffffff",
        color: "#171717",
        fontFamily:
          "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "40px",
        lineHeight: 1.6,
      }}
    >
      {/* Logo - top left */}
      <div style={{ marginBottom: "24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="tryai.tools"
          style={{ height: "28px", width: "auto" }}
        />
      </div>

      {/* Verdict */}
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#a3a3a3",
          }}
        >
          Confidence
        </p>
        <p
          style={{
            fontSize: "56px",
            fontWeight: 700,
            color: verdictColourStatic(result.verdict),
            margin: "8px 0 0",
            lineHeight: 1.1,
          }}
        >
          {result.confidence}%
        </p>
        <p
          style={{
            fontSize: "18px",
            fontWeight: 500,
            color: verdictColourStatic(result.verdict),
            marginTop: "4px",
          }}
        >
          {result.verdict}
        </p>
      </div>

      {/* Divider */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "24px 0" }} />

      {/* Reasoning */}
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#a3a3a3",
            marginBottom: "8px",
          }}
        >
          Reasoning
        </p>
        <p style={{ fontSize: "14px", color: "#525252" }}>{result.reasoning}</p>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "24px 0" }} />

      {/* Sentence analysis */}
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#a3a3a3",
            marginBottom: "8px",
          }}
        >
          Sentence analysis
        </p>
        <div>
          {result.sentences.map((s, i) => (
            <span
              key={i}
              style={{
                display: "inline",
                backgroundColor: sentenceBgStatic(s.verdict),
                borderRadius: "3px",
                padding: "1px 3px",
                fontSize: "13px",
                color: "#262626",
              }}
            >
              {s.text}{" "}
            </span>
          ))}
        </div>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            marginTop: "12px",
            paddingTop: "8px",
            borderTop: "1px solid #e5e5e5",
          }}
        >
          {(["human", "uncertain", "ai"] as const).map((v) => (
            <div key={v} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor:
                    v === "human"
                      ? "#34d399"
                      : v === "ai"
                        ? "#f87171"
                        : "#fbbf24",
                }}
              />
              <span
                style={{
                  fontSize: "11px",
                  color: "#a3a3a3",
                  textTransform: "capitalize",
                }}
              >
                {v}
              </span>
            </div>
          ))}
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "24px 0" }} />

      {/* Statistical indicators */}
      <div style={{ marginBottom: "24px" }}>
        <p
          style={{
            fontSize: "11px",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "#a3a3a3",
            marginBottom: "12px",
          }}
        >
          Statistical indicators
        </p>
        {result.heuristics.metrics.map((m) => (
          <div
            key={m.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "6px 0",
            }}
          >
            <span style={{ flex: 1 }}>
              <span style={{ fontSize: "13px", color: "#525252" }}>
                {m.name}
              </span>
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "11px",
                  color: barColourStatic(m.score),
                  opacity: 0.8,
                }}
              >
                {signalLabel(m.score)}
              </span>
            </span>
            <span
              style={{
                width: "32px",
                textAlign: "right",
                fontSize: "13px",
                fontWeight: 600,
                color: barColourStatic(m.score),
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {Math.round(m.score)}
            </span>
            <div
              style={{
                width: "96px",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#e5e5e5",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${m.score}%`,
                  height: "100%",
                  borderRadius: "3px",
                  backgroundColor: barColourStatic(m.score),
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Detected patterns */}
      {result.patterns.length > 0 && (
        <>
          <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "24px 0" }} />
          <div style={{ marginBottom: "24px" }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#a3a3a3",
                marginBottom: "8px",
              }}
            >
              Detected patterns
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {result.patterns.map((p, i) => (
                <span
                  key={i}
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "999px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    color: "#525252",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Branding footer */}
      <hr style={{ border: "none", borderTop: "1px solid #e5e5e5", margin: "24px 0" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: "13px", color: "#737373" }}>
          tryai.tools/ai-detector
        </span>
        <span style={{ fontSize: "12px", color: "#a3a3a3" }}>{today}</span>
      </div>
    </div>
  );
}
