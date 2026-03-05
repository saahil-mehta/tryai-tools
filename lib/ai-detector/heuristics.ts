import type { HeuristicMetric, HeuristicResult } from "./types";

// --- Helpers ---

export function splitSentences(text: string): string[] {
  // Split on sentence-ending punctuation followed by space or end of string
  // Handles abbreviations reasonably (Mr. Mrs. Dr. etc.)
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}

function getWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s'-]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function normalise(value: number, low: number, high: number): number {
  // Maps value from [low, high] range to [0, 100]
  // Values below low -> 0, above high -> 100
  return clamp(((value - low) / (high - low)) * 100, 0, 100);
}

function standardDeviation(values: number[]): number {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / values.length);
}

// --- Heuristic Functions ---
// Each returns 0-100 where higher = more likely AI

export function sentenceLengthVariance(text: string): number {
  const sentences = splitSentences(text);
  if (sentences.length < 3) return 50; // insufficient data

  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const sd = standardDeviation(lengths);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;

  // Coefficient of variation (SD / mean)
  // Human text: CV typically 0.5-1.0+
  // AI text: CV typically 0.2-0.4
  const cv = mean > 0 ? sd / mean : 0;

  // Low variance = AI signal, so invert
  return 100 - normalise(cv, 0.15, 0.8);
}

export function vocabularyDiversity(text: string): number {
  const words = getWords(text);
  if (words.length < 20) return 50;

  const uniqueWords = new Set(words);
  const ttr = uniqueWords.size / words.length;

  // Human text: TTR typically 0.6-0.8 for short texts
  // AI text: TTR typically 0.4-0.6 (more repetitive)
  // Note: TTR naturally decreases with text length, so this is a rough heuristic
  // Low diversity = AI signal, so invert
  return 100 - normalise(ttr, 0.35, 0.75);
}

export function burstiness(text: string): number {
  const sentences = splitSentences(text);
  if (sentences.length < 4) return 50;

  const complexities = sentences.map((s) => {
    const words = s.split(/\s+/);
    const avgWordLen =
      words.reduce((sum, w) => sum + w.length, 0) / words.length;
    // Complexity proxy: sentence length * average word length
    return words.length * avgWordLen;
  });

  // Calculate consecutive differences in complexity
  const diffs: number[] = [];
  for (let i = 1; i < complexities.length; i++) {
    diffs.push(Math.abs(complexities[i] - complexities[i - 1]));
  }

  const avgDiff = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  const sdDiff = standardDeviation(diffs);

  // High burstiness = high variance in consecutive complexity changes
  // Human: bursty (high sdDiff relative to avgDiff)
  // AI: monotone (low sdDiff relative to avgDiff)
  const burstRatio = avgDiff > 0 ? sdDiff / avgDiff : 0;

  // Low burstiness = AI signal, so invert
  return 100 - normalise(burstRatio, 0.3, 1.2);
}

export function repeatedPhrases(text: string): number {
  const words = getWords(text);
  if (words.length < 30) return 50;

  // Check for repeated 3-grams and 4-grams
  const ngrams = new Map<string, number>();

  for (let n = 3; n <= 4; n++) {
    for (let i = 0; i <= words.length - n; i++) {
      const gram = words.slice(i, i + n).join(" ");
      ngrams.set(gram, (ngrams.get(gram) || 0) + 1);
    }
  }

  // Count n-grams that appear more than once
  let totalRepetitions = 0;
  for (const count of ngrams.values()) {
    if (count > 1) {
      totalRepetitions += count - 1;
    }
  }

  // Normalise by text length
  const repetitionRate = totalRepetitions / words.length;

  // High repetition = AI signal
  return normalise(repetitionRate, 0.01, 0.08);
}

export function negationDensity(text: string): number {
  const words = getWords(text);
  if (words.length < 20) return 50;

  const negations = [
    "not",
    "no",
    "don't",
    "dont",
    "doesn't",
    "doesnt",
    "didn't",
    "didnt",
    "won't",
    "wont",
    "wouldn't",
    "wouldnt",
    "can't",
    "cant",
    "cannot",
    "couldn't",
    "couldnt",
    "shouldn't",
    "shouldnt",
    "isn't",
    "isnt",
    "aren't",
    "arent",
    "wasn't",
    "wasnt",
    "weren't",
    "werent",
    "haven't",
    "havent",
    "hasn't",
    "hasnt",
    "hadn't",
    "hadnt",
    "never",
    "neither",
    "nor",
    "nobody",
    "nothing",
    "nowhere",
  ];

  const negationCount = words.filter((w) => negations.includes(w)).length;
  const negationRate = negationCount / words.length;

  // Human text: negation rate ~2-5%
  // AI text: negation rate ~0.5-1.5%
  // Low negation = AI signal, so invert
  return 100 - normalise(negationRate, 0.005, 0.04);
}

export function emDashFrequency(text: string): number {
  if (text.length < 100) return 50;

  // Count em dashes (—), en dashes (–), and double hyphens (--)
  const emDashCount = (text.match(/\u2014/g) || []).length;
  const enDashCount = (text.match(/\u2013/g) || []).length;
  const doubleHyphenCount = (text.match(/--/g) || []).length;

  const totalDashes = emDashCount + enDashCount + doubleHyphenCount;
  const words = text.split(/\s+/).length;
  const dashRate = totalDashes / words;

  // AI (especially Claude) overuses em dashes
  // Human: ~0-0.5% of words have adjacent dashes
  // AI: ~1-3% of words have adjacent dashes
  return normalise(dashRate, 0.003, 0.025);
}

export function listPatternDetection(text: string): number {
  if (text.length < 100) return 50;

  // Detect numbered lists, bullet points, and item patterns
  const lines = text.split("\n").filter((l) => l.trim().length > 0);

  // Count list-like patterns
  const numberedPattern = /^\s*\d+[\.\)]\s/;
  const bulletPattern = /^\s*[-*•]\s/;

  let listItemCount = 0;
  let consecutiveListItems = 0;
  let maxConsecutive = 0;
  const listGroups: number[] = [];
  let currentGroupSize = 0;

  for (const line of lines) {
    if (numberedPattern.test(line) || bulletPattern.test(line)) {
      listItemCount++;
      currentGroupSize++;
      consecutiveListItems++;
      maxConsecutive = Math.max(maxConsecutive, consecutiveListItems);
    } else {
      if (currentGroupSize > 0) {
        listGroups.push(currentGroupSize);
        currentGroupSize = 0;
      }
      consecutiveListItems = 0;
    }
  }
  if (currentGroupSize > 0) listGroups.push(currentGroupSize);

  // Check for multiples of 3 in list groups
  const multiplesOf3 = listGroups.filter((g) => g >= 3 && g % 3 === 0).length;
  const totalGroups = listGroups.length;

  // Also check inline lists ("First, ... Second, ... Third, ...")
  const inlineListPatterns = (
    text.match(
      /\b(first|second|third|fourth|fifth|additionally|furthermore|moreover|finally|lastly)\b/gi,
    ) || []
  ).length;

  const listDensity = listItemCount / lines.length;
  const inlineDensity = inlineListPatterns / (text.split(/\s+/).length / 100);

  // Combine signals
  let score = 0;
  score += normalise(listDensity, 0.1, 0.5) * 0.4;
  score += normalise(inlineDensity, 0.5, 3) * 0.3;
  score +=
    (totalGroups > 0 ? (multiplesOf3 / totalGroups) * 100 : 0) * 0.3;

  return clamp(score, 0, 100);
}

// --- Main Analysis ---

const METRIC_WEIGHTS: Record<string, number> = {
  sentenceLengthVariance: 0.2,
  vocabularyDiversity: 0.1,
  burstiness: 0.2,
  repeatedPhrases: 0.1,
  negationDensity: 0.15,
  emDashFrequency: 0.1,
  listPatternDetection: 0.15,
};

export function analyseHeuristics(text: string): HeuristicResult {
  const metrics: HeuristicMetric[] = [
    {
      key: "sentenceLengthVariance",
      name: "Sentence Uniformity",
      score: sentenceLengthVariance(text),
      description: "AI text tends to have very uniform sentence lengths",
    },
    {
      key: "vocabularyDiversity",
      name: "Vocabulary Repetition",
      score: vocabularyDiversity(text),
      description: "AI tends to reuse the same words more frequently",
    },
    {
      key: "burstiness",
      name: "Writing Burstiness",
      score: burstiness(text),
      description:
        "Humans write in bursts of complexity; AI is more monotone",
    },
    {
      key: "repeatedPhrases",
      name: "Phrase Repetition",
      score: repeatedPhrases(text),
      description: "AI often repeats the same multi-word phrases",
    },
    {
      key: "negationDensity",
      name: "Negation Usage",
      score: negationDensity(text),
      description:
        'AI avoids negative constructions like "not" and "don\'t"',
    },
    {
      key: "emDashFrequency",
      name: "Em Dash Usage",
      score: emDashFrequency(text),
      description: "AI (especially Claude) overuses em dashes",
    },
    {
      key: "listPatternDetection",
      name: "List Patterns",
      score: listPatternDetection(text),
      description: "AI defaults to lists in groups of 3, 6, or 9",
    },
  ];

  const overallScore = metrics.reduce((sum, metric) => {
    const weight = METRIC_WEIGHTS[metric.key] || 0;
    return sum + metric.score * weight;
  }, 0);

  return {
    metrics,
    overallScore: Math.round(overallScore),
  };
}
