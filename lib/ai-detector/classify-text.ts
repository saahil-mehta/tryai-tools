import type { TextType } from "./types";

const STRUCTURAL_PATTERNS = [
  /^\s*[-*]\s/, // bullet points
  /^\s*\d+[.)]\s/, // numbered lists
  /^\s*[a-z][.)]\s/i, // lettered lists
  /\t.*\t/, // tab-separated columns
  /\s{3,}\S+\s{3,}/, // column-aligned data
  /^\s*\|.*\|/, // table rows
  /^\s*[-=]{3,}\s*$/, // horizontal rules / separators
  /^\s*\w+:\s/, // key: value pairs
  /\d+\s*[x×]\s*\d+/i, // dimensions / reps (e.g. "3 x 10")
];

const PROSE_ENDINGS = /[.!?]["')\u201d]?\s*$/;

export function classifyTextType(text: string): TextType {
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  if (lines.length === 0) return "prose";

  let structuralCount = 0;
  let proseCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    const isStructural = STRUCTURAL_PATTERNS.some((p) => p.test(trimmed));
    const isProse = PROSE_ENDINGS.test(trimmed);

    if (isStructural) structuralCount++;
    if (isProse) proseCount++;
  }

  const structuralRatio = structuralCount / lines.length;
  const proseRatio = proseCount / lines.length;

  // Structured: >60% structural AND <30% prose
  if (structuralRatio > 0.6 && proseRatio < 0.3) return "structured";

  // Mixed: 30-60% structural or 30-70% prose with some structure
  if (
    structuralRatio >= 0.3 ||
    (proseRatio >= 0.3 && proseRatio <= 0.7 && structuralCount > 0)
  ) {
    return "mixed";
  }

  return "prose";
}
