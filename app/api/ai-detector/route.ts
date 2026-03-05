import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  buildAnalysisPrompt,
} from "@/lib/ai-detector/prompt";
import type { HeuristicResult, TextType } from "@/lib/ai-detector/types";

const DAILY_CHAR_LIMIT = 1_000_000; // 1M chars/day per IP
const MAX_TEXT_LENGTH = 50_000;      // 50K chars per analysis

// Redis client — null when env vars are missing (local dev)
function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null;
  }
  return Redis.fromEnv();
}

async function getCharBudget(
  redis: Redis | null,
  ip: string,
): Promise<{ used: number; limit: number } | null> {
  if (!redis) return null;
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai-detector:${ip}:${today}`;
  const used = (await redis.get<number>(key)) ?? 0;
  return { used, limit: DAILY_CHAR_LIMIT };
}

async function recordCharUsage(
  redis: Redis | null,
  ip: string,
  chars: number,
): Promise<{ used: number; limit: number } | null> {
  if (!redis) return null;
  const today = new Date().toISOString().slice(0, 10);
  const key = `ai-detector:${ip}:${today}`;
  const current = (await redis.get<number>(key)) ?? 0;
  const newTotal = current + chars;
  await redis.set(key, newTotal, { ex: 86400 });
  return { used: newTotal, limit: DAILY_CHAR_LIMIT };
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isValidHeuristics(h: unknown): h is HeuristicResult {
  if (!h || typeof h !== "object") return false;
  const obj = h as Record<string, unknown>;
  return (
    typeof obj.overallScore === "number" &&
    Array.isArray(obj.metrics) &&
    obj.metrics.length > 0
  );
}

const VALID_TEXT_TYPES = new Set(["prose", "structured", "mixed"]);

function isValidTextType(t: unknown): t is TextType {
  return typeof t === "string" && VALID_TEXT_TYPES.has(t);
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API not configured" },
      { status: 503 },
    );
  }

  const ip = getClientIp(request);
  const redis = getRedis();

  // Check character budget
  const budget = await getCharBudget(redis, ip);

  let body: { text?: string; heuristics?: unknown; textType?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text, heuristics, textType: rawTextType } = body;

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Text is required" },
      { status: 400 },
    );
  }

  if (!isValidHeuristics(heuristics)) {
    return NextResponse.json(
      { error: "Heuristic scores are required" },
      { status: 400 },
    );
  }

  const textType: TextType = isValidTextType(rawTextType) ? rawTextType : "prose";

  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 50) {
    return NextResponse.json(
      { error: "Text must be at least 50 words for accurate analysis" },
      { status: 400 },
    );
  }

  if (text.length > MAX_TEXT_LENGTH) {
    return NextResponse.json(
      { error: `Text must be under ${MAX_TEXT_LENGTH.toLocaleString()} characters` },
      { status: 400 },
    );
  }

  // Enforce character budget
  if (budget && budget.used + text.length > DAILY_CHAR_LIMIT) {
    return NextResponse.json(
      { error: "Daily character limit reached", quota: budget },
      { status: 429 },
    );
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            verdict: {
              type: SchemaType.STRING,
              format: "enum",
              enum: ["Likely AI", "Likely Human", "Mixed"],
            },
            confidence: {
              type: SchemaType.NUMBER,
              description: "Overall confidence score 0-100",
            },
            sentences: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  text: { type: SchemaType.STRING },
                  verdict: {
                    type: SchemaType.STRING,
                    format: "enum",
                    enum: ["ai", "human", "uncertain"],
                  },
                  confidence: { type: SchemaType.NUMBER },
                },
                required: ["text", "verdict", "confidence"],
              },
            },
            reasoning: {
              type: SchemaType.STRING,
              description:
                "Detailed analytical paragraph referencing specific textual evidence and heuristic scores",
            },
            patterns: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "List of specific patterns detected",
            },
            textType: {
              type: SchemaType.STRING,
              format: "enum",
              enum: ["prose", "structured", "mixed"],
              description: "Classification of the text type",
            },
          },
          required: [
            "verdict",
            "confidence",
            "sentences",
            "reasoning",
            "patterns",
            "textType",
          ],
        },
      },
    });

    const result = await model.generateContent(
      buildAnalysisPrompt(text, heuristics, textType),
    );
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);

    // Record usage after successful analysis
    const quota = await recordCharUsage(redis, ip, text.length);

    return NextResponse.json({ ...parsed, quota });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
