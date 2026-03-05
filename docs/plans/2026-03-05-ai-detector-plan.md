# AI Content Detector — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a premium AI content detector at `/ai-detector` with client-side heuristics + Gemini deep scan, polished UI with progressive animations.

**Architecture:** Stacked single-column layout. Client-side heuristics run instantly on "Analyse" click, while a parallel API call to Gemini 2.5 Flash provides deep sentence-level analysis. Results appear progressively with premium animations.

**Tech Stack:** Next.js 16 (App Router), Tailwind v4, Gemini 2.5 Flash API, TypeScript

---

### Task 1: Project setup — install dependencies and env

**Files:**
- Modify: `package.json`
- Create: `.env.local`
- Create: `.env.example`

**Steps:**
1. Install `@google/generative-ai` for Gemini SDK
2. Create `.env.local` with `GEMINI_API_KEY=` placeholder
3. Create `.env.example` documenting required env vars
4. Verify project builds: `pnpm build`

**Commit:** `chore(ai-detector): add gemini sdk and env setup`

---

### Task 2: Shared types and constants

**Files:**
- Create: `lib/ai-detector/types.ts`

**Steps:**
1. Define TypeScript types:
   - `HeuristicMetric` (name, score 0-100, label, description)
   - `HeuristicResult` (metrics array, overallScore)
   - `SentenceVerdict` (text, verdict: ai/human/uncertain, confidence)
   - `DeepAnalysisResult` (verdict, confidence, sentences, reasoning, patterns)
   - `AnalysisState` (idle/analysing-heuristics/analysing-deep/complete/error)

**Commit:** `feat(ai-detector): add shared types`

---

### Task 3: Client-side heuristics engine

**Files:**
- Create: `lib/ai-detector/heuristics.ts`

**Steps:**
1. Implement 7 heuristic functions, each returning 0-100 (higher = more likely AI):
   - `sentenceLengthVariance(text)` — low variance = AI signal
   - `vocabularyDiversity(text)` — low type-token ratio = AI signal
   - `burstiness(text)` — low burstiness = AI signal
   - `repeatedPhrases(text)` — high repetition = AI signal
   - `negationDensity(text)` — low negations = AI signal
   - `emDashFrequency(text)` — high em dash usage = AI signal
   - `listPatternDetection(text)` — lists in multiples of 3 = AI signal
2. Implement `analyseHeuristics(text): HeuristicResult` combining all metrics
3. Helper: `splitSentences(text)` for shared sentence splitting logic

**Commit:** `feat(ai-detector): implement client-side heuristic analysis`

---

### Task 4: Gemini prompt and API route

**Files:**
- Create: `lib/ai-detector/prompt.ts`
- Create: `app/api/ai-detector/route.ts`

**Steps:**
1. Write Gemini prompt in `prompt.ts`:
   - System prompt instructing structured JSON output
   - Request: overall verdict, per-sentence classification, reasoning, detected patterns
   - Include examples of expected output format
2. Implement POST handler in `route.ts`:
   - Validate input (min 50 words, max 10,000 chars)
   - IP-based rate limiting (simple in-memory Map with TTL, 20 requests/hour per IP)
   - Call Gemini 2.5 Flash with structured prompt
   - Parse and validate response
   - Return typed JSON response
   - Error handling for API failures

**Commit:** `feat(ai-detector): add gemini deep scan api route`

---

### Task 5: Text input component

**Files:**
- Create: `app/ai-detector/components/text-input.tsx`

**Steps:**
1. Client component with:
   - Large textarea with placeholder "Paste your text here to analyse..."
   - Live word count + character count (animated counter)
   - Minimum 50 words indicator
   - Dims/locks when analysis is in progress
   - Clean dark theme styling (neutral-900 bg, neutral-100 text)
   - Generous padding, rounded corners

**Commit:** `feat(ai-detector): add text input component`

---

### Task 6: Analyse button with progress states

**Files:**
- Create: `app/ai-detector/components/analyse-button.tsx`

**Steps:**
1. Client component with states:
   - **Idle:** "Analyse" button, prominent, disabled if < 50 words
   - **Analysing:** transforms into segmented progress bar with phase labels
   - **Complete:** "Analyse Again" + "Copy Results" buttons
   - **Rate limited:** "Sign up for more scans" stub message
2. Smooth transitions between states (CSS transitions + Tailwind)
3. Progress phases: "Scanning writing patterns..." -> "Running deep analysis..."

**Commit:** `feat(ai-detector): add analyse button with progress states`

---

### Task 7: Heuristic score cards

**Files:**
- Create: `app/ai-detector/components/heuristic-scores.tsx`

**Steps:**
1. Client component displaying 7 metric cards in a grid
2. Each card:
   - Metric name + icon/label
   - Animated score counter (rolls up from 0 to value)
   - Colour-coded bar (green/amber/red based on score)
   - Staggered entrance animation (each card fades in 100ms after previous)
3. Overall "Quick Analysis" score at top with larger gauge
4. Glassmorphism card styling (backdrop-blur, subtle border, translucent bg)

**Commit:** `feat(ai-detector): add animated heuristic score cards`

---

### Task 8: Deep analysis results panel

**Files:**
- Create: `app/ai-detector/components/deep-analysis.tsx`

**Steps:**
1. Client component with three sections:
   a. **Verdict card** — large score display (e.g. "87% AI Generated"), scales in with animation
   b. **Sentence highlights** — the original text re-rendered with each sentence colour-coded (green/amber/red), click a sentence to see its individual confidence
   c. **Reasoning + patterns** — explanation text + pattern tags (pill badges)
2. Skeleton loading state (pulsing placeholders) while waiting for Gemini
3. Progressive reveal: verdict first, then sentences paint in, then reasoning fades in

**Commit:** `feat(ai-detector): add deep analysis results panel`

---

### Task 9: Main orchestrator component

**Files:**
- Create: `app/ai-detector/components/ai-detector-tool.tsx`

**Steps:**
1. Client component that orchestrates all child components
2. State management:
   - `text` (input), `analysisState`, `heuristicResult`, `deepResult`, `scanCount`
3. `handleAnalyse()` flow:
   - Check scan count (localStorage), show stub if >= 5
   - Set state to analysing-heuristics
   - Run heuristics (instant), populate results
   - Set state to analysing-deep
   - Fire API call to `/api/ai-detector`
   - On response, populate deep results
   - Set state to complete
   - Increment scan count in localStorage
4. Error handling: show error state if API fails, heuristic results remain

**Commit:** `feat(ai-detector): add main orchestrator component`

---

### Task 10: Server page with SEO metadata and schema

**Files:**
- Create: `app/ai-detector/page.tsx`

**Steps:**
1. Server component with:
   - `generateMetadata()` — title, description, openGraph, twitter cards
   - Breadcrumb nav (Home > AI Tools > AI Content Detector)
   - H1: "AI Content Detector"
   - Subtitle
   - `<AiDetectorTool />` client component
   - SEO copy sections (what, how, why, use cases, comparison)
   - FAQ section
2. JSON-LD script tags:
   - BreadcrumbList
   - FAQPage (8 Q&As)
   - SoftwareApplication
   - HowTo (3 steps)

**Commit:** `feat(ai-detector): add page with seo metadata and schema markup`

---

### Task 11: SEO copy and FAQ content

**Files:**
- Modify: `app/ai-detector/page.tsx`

**Steps:**
1. Write SEO copy sections (300-800 words total):
   - "What is an AI Content Detector?"
   - "How Our AI Detector Works" (3 steps)
   - "Why tryai.tools" (differentiators)
   - Use-case sections (students, teachers, writers)
   - Comparison table vs ZeroGPT, GPTZero
2. FAQ section (8 questions from People Also Ask research)
3. Related tools section (stubbed links for future tools)

**Commit:** `feat(ai-detector): add seo copy and faq content`

---

### Task 12: Polish, animations, and responsive testing

**Files:**
- Modify: various component files

**Steps:**
1. Add CSS transitions/animations:
   - Score counter roll-up animation
   - Staggered card entrance
   - Scanning line effect over text
   - Verdict scale-in
   - Sentence highlight paint-in
2. Responsive testing: verify stacked layout on mobile widths
3. Performance check: ensure no layout shift (CLS < 0.1)
4. Verify dark theme consistency across all components

**Commit:** `style(ai-detector): polish animations and responsive layout`

---

### Task 13: End-to-end verification

**Steps:**
1. Run `pnpm build` — verify no build errors
2. Run `pnpm dev` — test full flow manually:
   - Paste text, verify word count
   - Click Analyse, verify heuristics appear
   - Verify deep scan returns results (needs valid GEMINI_API_KEY)
   - Verify rate limit stub appears after 5 scans
   - Test on mobile viewport
3. Run `pnpm lint` — fix any issues
4. Check page source for JSON-LD schema markup

**Commit:** `chore(ai-detector): verification and lint fixes`

---

## Verification

1. `pnpm build` passes with no errors
2. `/ai-detector` renders with correct title tag, meta description, H1
3. Pasting text shows live word count
4. Clicking "Analyse" shows heuristic scores with animation
5. Deep scan returns sentence-level results from Gemini
6. Rate limiting works (localStorage counter)
7. All JSON-LD schema present in page source
8. Responsive layout works on 375px-1440px widths
9. No CLS — tool loads without layout jumps
