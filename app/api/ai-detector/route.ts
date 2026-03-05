import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import {
  SYSTEM_PROMPT,
  buildAnalysisPrompt,
} from "@/lib/ai-detector/prompt";
import type { DeepAnalysisResult } from "@/lib/ai-detector/types";

// Simple in-memory rate limiter (resets on server restart)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT;
}

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
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
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again later." },
      { status: 429 },
    );
  }

  let body: { text?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { text } = body;

  if (!text || typeof text !== "string") {
    return NextResponse.json(
      { error: "Text is required" },
      { status: 400 },
    );
  }

  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 50) {
    return NextResponse.json(
      { error: "Text must be at least 50 words for accurate analysis" },
      { status: 400 },
    );
  }

  if (text.length > 15000) {
    return NextResponse.json(
      { error: "Text must be under 15,000 characters" },
      { status: 400 },
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
                "2-3 sentence explanation of why the text was classified this way",
            },
            patterns: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "List of specific patterns detected",
            },
          },
          required: [
            "verdict",
            "confidence",
            "sentences",
            "reasoning",
            "patterns",
          ],
        },
      },
    });

    const result = await model.generateContent(buildAnalysisPrompt(text));
    const responseText = result.response.text();
    const parsed: DeepAnalysisResult = JSON.parse(responseText);

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 },
    );
  }
}
