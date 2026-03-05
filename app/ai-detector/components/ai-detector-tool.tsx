"use client";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { analyseHeuristics } from "@/lib/ai-detector/heuristics";
import { classifyTextType } from "@/lib/ai-detector/classify-text";
import type {
  AnalysisPhase,
  AnalysisResult,
  Quota,
} from "@/lib/ai-detector/types";
import { TextInput } from "./text-input";
import { AnalyseButton } from "./analyse-button";
import { AnalysisProgress } from "./analysis-progress";
import { AnalysisReport, PdfReport } from "./analysis-report";

function formatChars(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`;
  return n.toString();
}

export function AiDetectorTool() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<AnalysisPhase>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [quota, setQuota] = useState<Quota | null>(null);
  const cachedAnalysis = useRef<{
    text: string;
    result: AnalysisResult;
  } | null>(null);
  const reportRef = useRef<HTMLDivElement | null>(null);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const canAnalyse = wordCount >= 50 && phase === "idle";

  const handleAnalyse = useCallback(async () => {
    if (!canAnalyse) return;

    // Check cache
    if (cachedAnalysis.current && cachedAnalysis.current.text === text) {
      setResult(cachedAnalysis.current.result);
      setPhase("complete");
      return;
    }

    setError(null);
    setResult(null);
    setPhase("analysing");

    // Classify text type and compute heuristics (instant, client-side)
    const textType = classifyTextType(text);
    const heuristics = analyseHeuristics(text, textType);

    try {
      const response = await fetch("/api/ai-detector", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, heuristics, textType }),
      });

      if (response.status === 429) {
        const data = await response.json();
        if (data.quota) setQuota(data.quota);
        setPhase("rate-limited");
        return;
      }

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Analysis failed");
      }

      const apiResult = await response.json();
      const { quota: returnedQuota, ...rest } = apiResult;
      const fullResult: AnalysisResult = {
        ...rest,
        heuristics,
        textType: rest.textType || textType,
      };

      if (returnedQuota) setQuota(returnedQuota);
      setResult(fullResult);
      cachedAnalysis.current = { text, result: fullResult };

      // Progress bar handles the smooth count to 100% then calls handleProgressFinished
      setPhase("finishing");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed");
      setPhase("error");
    }
  }, [canAnalyse, text]);

  const handleProgressFinished = useCallback(() => {
    setPhase("complete");
  }, []);

  const handleReset = useCallback(() => {
    setPhase("idle");
    setResult(null);
    setError(null);
  }, []);

  const handleCopyResults = useCallback(() => {
    if (!result) return;

    const lines: string[] = [
      `# AI Content Analysis Report`,
      "",
      `**Verdict:** ${result.verdict} (${result.confidence}% confidence)`,
      "",
      `## Reasoning`,
      "",
      result.reasoning,
      "",
    ];

    if (result.patterns.length > 0) {
      lines.push(`## Detected Patterns`, "");
      result.patterns.forEach((p) =>
        lines.push(`- **${p.pattern}**: ${p.explanation}`),
      );
      lines.push("");
    }

    lines.push(`## Statistical Indicators`, "");
    result.heuristics.metrics.forEach((m) => {
      lines.push(`- ${m.name}: ${Math.round(m.score)}/100`);
    });
    lines.push(
      `- Overall heuristic score: ${result.heuristics.overallScore}/100`,
    );

    lines.push("", "---", "Analysed with tryai.tools/ai-detector");

    navigator.clipboard.writeText(lines.join("\n"));
    toast.success("Report copied to clipboard");
  }, [result]);

  const handleDownload = useCallback(async () => {
    if (!result || !reportRef.current) return;

    const [{ default: html2canvas }, { PDFDocument }] = await Promise.all([
      import("html2canvas-pro"),
      import("pdf-lib"),
    ]);

    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");
    const imgBytes = Uint8Array.from(atob(imgData.split(",")[1]), (c) =>
      c.charCodeAt(0),
    );

    const pdfDoc = await PDFDocument.create();
    const pngImage = await pdfDoc.embedPng(imgBytes);
    const { width, height } = pngImage.scaleToFit(
      canvas.width / 2,
      canvas.height / 2,
    );
    const page = pdfDoc.addPage([width + 80, height + 80]);
    page.drawImage(pngImage, { x: 40, y: 40, width, height });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([new Uint8Array(pdfBytes)], {
      type: "application/pdf",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-detection-report.pdf";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("PDF downloaded");
  }, [result]);

  const isAnalysing = phase === "analysing" || phase === "finishing";

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <TextInput value={text} onChange={setText} disabled={isAnalysing} />

      <div className="flex justify-center">
        <AnalyseButton
          phase={phase}
          canAnalyse={canAnalyse}
          hasResult={result !== null}
          onAnalyse={handleAnalyse}
          onReset={handleReset}
          onCopyResults={handleCopyResults}
          onDownload={handleDownload}
        />
      </div>

      {(phase === "analysing" || phase === "finishing") && (
        <AnalysisProgress
          complete={phase === "finishing"}
          onFinished={handleProgressFinished}
        />
      )}

      {quota && (
        <div className="mx-auto w-full max-w-md space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                quota.used / quota.limit > 0.9
                  ? "bg-red-400"
                  : quota.used / quota.limit > 0.75
                    ? "bg-amber-400"
                    : "bg-neutral-400"
              }`}
              style={{
                width: `${Math.min((quota.used / quota.limit) * 100, 100)}%`,
              }}
            />
          </div>
          <p className="text-center text-xs text-neutral-400">
            {formatChars(quota.used)} / {formatChars(quota.limit)} characters
            used today
          </p>
        </div>
      )}

      {error && phase === "error" && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-center text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      )}

      <AnalysisReport result={result} loading={isAnalysing} />

      {/* Off-screen light-mode report for PDF capture */}
      {result && <PdfReport result={result} reportRef={reportRef} />}
    </div>
  );
}
