# AI Content Detector — Design Document

**Date:** 2026-03-05
**URL:** `tryai.tools/ai-detector`
**Status:** Approved

## Overview

A premium AI content detector that combines instant client-side heuristic analysis with LLM-powered deep scanning via Gemini 2.5 Flash. Differentiator: sentence-level highlighting with explanations of _why_ text looks AI-generated, wrapped in a polished Vercel/Apple-grade UI.

## Architecture

### Detection Layers

**Layer 1 — Client-side heuristics (instant)**
Runs in-browser on paste. Seven metrics:
1. Sentence length variance — AI text has uniform sentence lengths
2. Vocabulary diversity — type-token ratio; AI repeats vocabulary
3. Burstiness — humans vary complexity; AI is monotone
4. Repeated phrase detection — flag suspicious n-gram frequency
5. Negation density — AI avoids negative constructions ("not", "don't", "won't")
6. Em dash / formatting quirk frequency — AI (especially Claude) overuses em dashes
7. List pattern detection — AI defaults to lists in multiples of 3

Each metric produces a normalised 0-100 score. Combined into a single "Quick Analysis" indicator.

**Layer 2 — LLM deep scan (Gemini 2.5 Flash)**
Server-side API route. Returns structured JSON:
- Overall verdict: "Likely AI" / "Likely Human" / "Mixed" with 0-100 confidence
- Per-sentence classification: AI / Human / Uncertain with confidence value
- Reasoning summary: 2-3 sentences explaining why
- Detected patterns: specific flags ("no contractions", "uniform paragraph length", etc.)

### Data Flow

```
User pastes text
  -> Client-side heuristics run instantly (no network)
  -> User clicks "Analyse"
  -> Heuristic results populate immediately with animation
  -> Simultaneously: POST /api/ai-detector with text
  -> API route validates input, checks rate limit (IP-based)
  -> Calls Gemini 2.5 Flash with structured prompt
  -> Returns JSON verdict
  -> Client renders deep analysis: sentence highlighting, verdict, reasoning
```

### Rate Limiting

- Client-side: localStorage counter, 5 scans/day
- Scan 6: "Sign up for more scans" stub (auth not built yet)
- Server-side: IP-based rate limit as safety net against abuse

### File Structure

```
app/ai-detector/page.tsx              — server component, SEO metadata, layout
app/ai-detector/components/           — client components
  text-input.tsx                       — textarea with word count
  analyse-button.tsx                   — button with progress states
  results-panel.tsx                    — overall results container
  heuristic-scores.tsx                 — animated metric cards
  deep-analysis.tsx                    — sentence highlighting + verdict
  progress-indicator.tsx               — scanning animation
app/api/ai-detector/route.ts          — API route for deep scan
lib/ai-detector/heuristics.ts         — client-side analysis functions
lib/ai-detector/prompt.ts             — Gemini prompt template
lib/ai-detector/types.ts              — shared TypeScript types
```

## UI / UX

### Layout

Stacked single-column layout on all viewports. Content breathes — generous whitespace, editorial feel.

**Sections (top to bottom):**
1. Breadcrumbs (Home > AI Tools > AI Content Detector)
2. H1: "AI Content Detector"
3. Subtitle with trust signal (e.g. "Trusted by X users" — stubbed initially)
4. Text input area with word/character count
5. "Analyse" button
6. Results panel (heuristic scores, then deep analysis)
7. SEO copy sections
8. FAQ section with schema markup
9. Related tools links

### Animated Progress Sequence

| Phase | Timing | User sees |
|-------|--------|-----------|
| 1 | 0ms | Button transforms into segmented progress bar. Text input dims/locks. |
| 2 | 0-300ms | "Scanning writing patterns..." — heuristic metric cards slide in one-by-one, staggered. Score counters roll up to values. |
| 3 | 300ms+ | "Running deep analysis..." — scanning line sweeps across pasted text top-to-bottom. Skeleton cards pulse for deep results. |
| 4 | Gemini returns | Verdict card scales in (e.g. "87% AI Generated" with colour). Sentence highlights paint onto text progressively. Pattern tags fade in. Reasoning types in. |
| 5 | Complete | Progress bar fills to 100%, fades. "Analyse again" + "Copy results" buttons appear. |

All transitions use easing curves. No hard cuts.

### Colour Coding

- Green: likely human
- Red: likely AI
- Amber: uncertain

### Aesthetic Direction

Dark background (neutral-950), clean white/grey text, verdict colours as accents. Generous whitespace. Subtle glassmorphism on result cards. Vercel dashboard meets Linear.

### Future Enhancement

- File upload (PDF, DOCX, TXT) — space reserved in UI but not built for MVP

## SEO Strategy

### Main Page (`/ai-detector`)

- **Primary keyword:** "AI content detector"
- **Secondary:** "AI text detector", "check if text is AI generated", "detect ChatGPT text"
- **Title tag:** `AI Content Detector — Free Online AI Text Checker for ChatGPT, Claude & Gemini | tryai.tools`
- **Meta description:** "Free AI content detector — paste your text for instant analysis with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content in seconds."
- **H1:** "AI Content Detector"

### Schema Markup (all on main page)

- FAQPage (6-8 Q&As)
- SoftwareApplication (name, rating, offers)
- HowTo (3-step: paste, analyse, review)
- BreadcrumbList
- Organisation
- WebSite (with SearchAction)

### SEO Copy Sections (below tool)

1. What is an AI content detector?
2. How our AI detector works (step-by-step)
3. Why tryai.tools AI detector is better
4. For students / For teachers / For writers (tabbed or sectioned)
5. Comparison: tryai.tools vs ZeroGPT vs GPTZero
6. FAQ (6-8 questions with schema)

### Phase 2 — Programmatic SEO Pages

**Model-specific:**
- `/detect-chatgpt`
- `/detect-claude`
- `/detect-gemini`
- `/detect-deepseek`
- `/detect-llama`

**Audience-specific:**
- `/ai-detector-for-students`
- `/ai-detector-for-teachers`
- `/ai-detector-for-writers`
- `/ai-detector-for-recruiters`
- `/ai-detector-for-publishers`

**Comparison/alternatives:**
- `/zerogpt-alternative`
- `/gptzero-alternative`
- `/best-ai-detectors-2026`

**Blog content:**
- "AI Detection in 2026: How It Works"
- "ChatGPT vs Human Writing: Key Differences"
- "How to Check if Your Student Used AI"

### FAQ Questions (from People Also Ask research)

1. How accurate are AI detectors?
2. Can AI detectors detect ChatGPT?
3. Can AI content be detected by Google?
4. Will Google penalise AI content?
5. How do AI detectors work?
6. Can AI detectors be wrong? (false positives)
7. What is the best free AI detector?
8. Can Turnitin detect AI writing?

## Competitive Analysis

### GPTZero (market leader)
- 10M+ users, 380K+ educators
- Audience landing pages (/students, /writers, /machine-learning)
- Companion tools (plagiarism checker, source finder, AI vocabulary)
- Chrome extension, Canvas/Google Docs integrations
- FAQPage + Organisation + Product schema
- Media logos: Wired, TechCrunch, NYT, BBC

### ZeroGPT
- Companion tools: word counter, grammar checker, summariser, paraphraser
- Flat URL structure
- Available on WhatsApp/Telegram
- FAQ page

### ContentDetector.ai
- Blog content strategy (stats posts, tool roundups)
- Use-case sections (bloggers, academics)
- Competitor comparison on main page
- Product Hunt badge

### Our Differentiators
1. Sentence-level highlighting with explanations (not just a percentage)
2. Dual-layer analysis (instant heuristics + deep LLM scan)
3. Premium, polished UI (most competitors look dated)
4. Transparent reasoning — we show _why_ text was flagged
5. Comprehensive schema markup from day one
6. Model-specific + audience-specific landing pages from phase 2
