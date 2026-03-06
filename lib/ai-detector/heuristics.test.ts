import { describe, it, expect } from "vitest";
import {
  analyseHeuristics,
  sentenceLengthVariance,
  vocabularyDiversity,
  emDashFrequency,
  listPatternDetection,
  splitSentences,
} from "./heuristics";

// --- Helpers ---

describe("splitSentences", () => {
  it("splits on sentence-ending punctuation", () => {
    const result = splitSentences("Hello world. How are you? I'm fine!");
    expect(result).toEqual(["Hello world.", "How are you?", "I'm fine!"]);
  });

  it("returns empty array for empty string", () => {
    expect(splitSentences("")).toEqual([]);
  });
});

// --- Individual heuristics ---

describe("sentenceLengthVariance", () => {
  it("returns 50 for fewer than 3 sentences", () => {
    expect(sentenceLengthVariance("Short. Also short.")).toBe(50);
  });

  it("scores high (AI signal) for uniform sentence lengths", () => {
    const uniform =
      "The cat sat on the mat today. The dog ran in the park now. The bird flew over the tree fast. The fish swam in the pond here.";
    expect(sentenceLengthVariance(uniform)).toBeGreaterThan(60);
  });

  it("scores low (human signal) for varied sentence lengths", () => {
    const varied =
      "Short. This is a much longer sentence with many more words in it that goes on and on. Nope. Another really quite extended sentence with plenty of variation and detail in the structure.";
    expect(sentenceLengthVariance(varied)).toBeLessThan(40);
  });
});

describe("vocabularyDiversity", () => {
  it("returns 50 for fewer than 20 words", () => {
    expect(vocabularyDiversity("just a few words")).toBe(50);
  });
});

describe("emDashFrequency", () => {
  it("returns 50 for short text", () => {
    expect(emDashFrequency("Too short.")).toBe(50);
  });

  it("scores high when text is full of em dashes", () => {
    const dashes =
      "This is a test \u2014 a real one \u2014 with many dashes \u2014 scattered throughout \u2014 the entire text \u2014 to see \u2014 what happens. ".repeat(
        3,
      );
    expect(emDashFrequency(dashes)).toBeGreaterThan(50);
  });

  it("scores low for text without dashes", () => {
    const clean =
      "This is a perfectly normal paragraph without any special punctuation marks. It just flows naturally from one thought to the next. Nothing fancy here at all.";
    expect(emDashFrequency(clean)).toBeLessThan(20);
  });
});

describe("listPatternDetection", () => {
  it("returns 50 for short text", () => {
    expect(listPatternDetection("Short.")).toBe(50);
  });

  it("scores high for text with many list items", () => {
    const lists = `
      Here are the benefits:
      1. First benefit of using this tool
      2. Second benefit of using this tool
      3. Third benefit of using this tool
      4. Fourth benefit of using this tool
      5. Fifth benefit of using this tool
      6. Sixth benefit of using this tool
    `;
    expect(listPatternDetection(lists)).toBeGreaterThan(30);
  });
});

// --- Weight normalisation ---

describe("analyseHeuristics", () => {
  const sampleText =
    "The quick brown fox jumps over the lazy dog. It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith slipped quickly through the glass doors. The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster was tacked to the wall.";

  it("returns a score between 0 and 100 for prose", () => {
    const result = analyseHeuristics(sampleText, "prose");
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);
    expect(result.textType).toBe("prose");
  });

  it("returns a score between 0 and 100 for structured", () => {
    const result = analyseHeuristics(sampleText, "structured");
    expect(result.overallScore).toBeGreaterThanOrEqual(0);
    expect(result.overallScore).toBeLessThanOrEqual(100);
    expect(result.textType).toBe("structured");
  });

  it("normalises structured scores by active weight sum", () => {
    // With structured text type, several weights are 0, but normalisation
    // should still produce a meaningful score (not near-zero)
    const proseResult = analyseHeuristics(sampleText, "prose");
    const structuredResult = analyseHeuristics(sampleText, "structured");

    // The structured score should not be trivially small just because
    // weights were zeroed — normalisation compensates
    expect(structuredResult.overallScore).toBeGreaterThan(5);
    // But it may differ from prose since different metrics contribute
    expect(typeof structuredResult.overallScore).toBe("number");
    expect(typeof proseResult.overallScore).toBe("number");
  });

  it("returns 7 metrics regardless of text type", () => {
    const result = analyseHeuristics(sampleText, "mixed");
    expect(result.metrics).toHaveLength(7);
    expect(result.textType).toBe("mixed");
  });

  it("defaults to prose when no textType provided", () => {
    const result = analyseHeuristics(sampleText);
    expect(result.textType).toBe("prose");
  });
});
