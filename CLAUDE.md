# Project Details — tryai.tools

A micro-tools empire: high-traffic, AdSense-monetised utility websites.

## Vision

Build and deploy lightweight, SEO-optimised micro applications under the **tryai.tools** domain. Each tool targets verified search demand. Revenue comes from AdSense, affiliate placements and lead generation — not SaaS subscriptions.

Parent brand: **Knowsee** (knowsee.co.uk) · Owner: **Saahil** (saahil.co.uk)

## Stack

- **Framework**: Next.js (App Router, Turbopack)
- **UI**: Tailwind v4 + shadcn/ui pattern — mobile-first, sub-2s load times
- **Hosting**: Vercel (edge functions, ISR for SEO pages)
- **Analytics**: Google Analytics 4 + Google Search Console + Vercel Analytics
- **Ads**: Google AdSense (impression-based + CPC), future header bidding
- **SEO**: next-sitemap, structured data (JSON-LD), Open Graph
- **Package manager**: pnpm

## Architecture

### URL Structure — Flat URLs

All tool pages live at the root: `tryai.tools/[tool-slug]`

Examples: `/mortgage-calculator`, `/ai-detector`, `/bmi-calculator`

No nested category paths. Use breadcrumb navigation (e.g. `Home > AI Tools > AI Detector`) and internal linking for hierarchy. This keeps URLs clean and maximises SEO flexibility.

### Codebase — Modular by Design

Start as a single Next.js app with clean internal boundaries. Code is organised into well-separated modules within the app (e.g. `lib/`, `components/`, `tools/`). As the project grows, these modules can be extracted into standalone packages — but only when there is a real need (shared across multiple apps, independently deployable, etc.).

The goal is modular separation without premature monorepo overhead. Every module should be self-contained enough that extracting it later is straightforward, not a rewrite.

### Per-Tool Template

Every tool page must include:

- H1 with primary keyword
- Tool widget (interactive, client-side, zero-load-state)
- 300-800 words of SEO copy below the tool
- FAQ section with schema markup
- Related tools internal links
- 2-3 ad placements (above fold, mid-content, sidebar/below)
- Breadcrumb navigation with structured data

## Choosing What to Build

Before building any new tool:

1. **Validate demand** — confirm search volume exists via Google Trends or similar
2. **Check competition** — can we realistically rank on page 1?
3. **Proven concepts win** — pick ideas that already exist and have proven demand; don't invent new categories
4. **Estimate build time** — must ship in days, not weeks

Do not build tools that require ongoing external API dependencies or real-time data feeds unless there is a clear, validated reason. Prefer tools that are self-contained and compute client-side.

## Guiding Principles (MUST FOLLOW)

- **Ship fast, validate faster** — launch MVP tools in hours, not days
- **SEO is the product** — every decision filters through "will this rank?"
- **Mobile-first always** — 71% of search traffic is mobile; design for thumbs
- **KISS, DRY, YAGNI** — redundancy is the enemy
- **Template-driven** — new tools should be config, not code
- **Data-driven expansion** — no new tool without demand validation
- **Core Web Vitals obsession** — LCP < 2.5s, CLS < 0.1, INP < 200ms
- **Small increments** — one tool, deploy, measure, iterate
- **No hacky or fragile approaches** — question if a better method exists
- **Boring is beautiful** — tools don't need to be novel; proven demand + better design + better SEO = money
- **Design is a competitive advantage** — see the dedicated Design Language section below; every UI decision must follow it
- **Content from day one** — start writing SEO content (comparison pages, blog posts, FAQ pages) before the tool is even finished; the longer content is live, the sooner it ranks
- **Build trust signals early** — pursue backlinks, reviews (Trustpilot, Product Hunt), and structured data with ratings from the start; social proof accelerates ranking

## Design Language (IMPORTANT — MUST FOLLOW)

Most utility tools look terrible. A polished, premium UI builds trust, increases session time, and earns more ad impressions. Design is not decoration — it is the product.

### Core philosophy

> "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." — Antoine de Saint-Exupery

The front end is not a contest of how much you can squeeze onto it. It is a contest of how much you can remove while still letting the user achieve their goal. Users are hunters seeking a task to complete, not tourists wandering an interface. Every vague element in their path is friction that leads to abandonment.

### The aesthetic: Vercel-grade minimalism

Our reference point is Vercel, Linear, and Stripe. The design language is:

- **Monochrome palette** — neutral-900/white in light mode, neutral-100/neutral-950 in dark mode. Colour appears only when it carries functional meaning (status indicators, success/error states, score thresholds in results). Never decorative.
- **Typography does the work** — hierarchy comes from font weight, size, and spacing. Bold headings, muted secondary text, generous line height. No icons needed to communicate structure.
- **Generous whitespace** — sections breathe. Cramped layouts signal low quality. When in doubt, add more space, not more content.
- **Subtle borders** — thin (1px), low-contrast borders (neutral-200 light / neutral-800 dark). Rounded corners (rounded-xl for cards, rounded-lg for smaller elements). No heavy outlines or drop shadows.
- **Gap-px grid pattern** — for structured content blocks (steps, use-case cards), use the Vercel signature: `gap-px` with a coloured container background showing through as 1px dividers between cells. Each cell gets the page background colour.
- **Contained tables** — wrap in a rounded border, add a subtle header background (bg-neutral-50 / bg-neutral-900), consistent px-5 cell padding.

### What to do

- Let the tool widget be the hero — it should dominate above the fold
- Use `dt`/`dd` definition lists or clean 2-column grids for feature lists
- Use `divide-y` inside a single container for FAQ/accordion lists
- Trim copy ruthlessly — say it in one sentence, not three
- Use text weight (font-medium, font-semibold) and text colour (neutral-900 vs neutral-500) to create hierarchy
- SEO content below the tool should be scannable: short paragraphs, clear headings, tight descriptions

### What NEVER to do (anti-patterns)

These are the hallmarks of AI-generated design slop. They are banned:

- **Icon-bombing** — coloured icon boxes (bg-blue-500/10 with an SVG) on every card, step, or feature. Icons should be rare and functional, not decorative filler.
- **Rainbow colour-coding** — giving every section its own accent colour (blue for step 1, violet for step 2, amber for step 3). This is the single biggest AI slop tell.
- **Inline SVG decoration** — scattering hand-coded SVG icons throughout markup to look "visual". If you need icons, use a proper icon library sparingly.
- **Coloured comparison boxes** — red-tinted "AI writing" vs green-tinted "Human writing" side-by-side cards. Communicate through words and layout, not colour gimmicks.
- **Feature grids with icon circles** — 6-up grids where every cell has a coloured circle with an icon and two lines of text. This is the default output of every AI coding tool. Do not do it.
- **Excessive border-radius mixing** — mixing rounded-full pills, rounded-xl cards, and rounded-lg buttons on the same page without consistency.
- **Gratuitous colour in tables** — green checkmarks and red crosses in comparison tables. Use plain text ("Yes", "No", "Partial") with text colour hierarchy (neutral-900 for our column, neutral-500 for competitors).

### The test

Before shipping any UI, ask: "Would this look at home on vercel.com?" If the answer is no, strip it back until it does. When in doubt, remove. The best interface is the one that disappears — the user gets their result without ever thinking about the design.

## SEO Playbook

- One primary keyword per tool page, 2-3 secondary keywords
- Title tag format: `{Tool Name} — Free Online {Category} | tryai.tools`
- Meta description: action-oriented, include primary keyword, under 155 chars
- Internal linking: every tool links to 3-5 related tools
- For every tool, also create supporting content: "{Tool} alternatives", "Best {category} tools 2026", FAQ posts targeting People Also Ask queries
- Programmatic SEO: generate location-variant pages where relevant (e.g. "stamp duty calculator London")
- Sitemap is auto-generated by next-sitemap on build; submit to Google Search Console once during initial setup

### Optional SEO Enhancements

These are best practices to apply when the project reaches sufficient scale or when building regional tool variants:

- **Hreflang tags** — for UK/US/India variants of the same tool (e.g. a tax calculator with regional versions); tells Google which version to serve to which audience
- **Localisation** — currency symbols, spelling (colour vs color), date formats, tax regimes per market

## Ad Placement Rules

- Maximum 3 ad units per page (balance UX vs revenue)
- Never interrupt the tool interaction flow
- Above-fold ad must not push tool below the fold on mobile
- Lazy-load ads below the fold
- Track RPM per tool, kill underperformers after 30 days

## Development Workflow

- Makefile targets for all common operations — not raw commands
- **Always run `make check` before committing.** It runs lint, format, typecheck, and tests in sequence. If any step fails, fix it before you commit.

## Content Pipeline

For each tool page:

1. Keyword research (primary + secondary + FAQ queries)
2. Build interactive tool widget
3. Write SEO copy (what it does, how to use, why it matters)
4. Add FAQ schema (4-6 questions from People Also Ask)
5. Internal link to related tools
6. Deploy
7. Monitor rankings at day 7, 14, 30

## Commit Policy

Use conventional commits:
`<type>(<scope>): <subject>`

Types: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert

- Subject in lowercase, imperative mood
- One logical change per commit
- Separate commits for: new tools, SEO changes, ad config, infra
- Never bundle unrelated changes
- No attribution or co-authoring

## Output Policy

- Site content must not contain em dashes, only simple human language. No formulaic AI-like language.
- UK English spelling (primary market)
- No emojis in code or commits
- No unnecessary documentation
- Always provide honest critical assessment under CRITICAL_ASSESSMENT

### Copy voice (IMPORTANT)

All site-facing copy must read like a confident human wrote it, not a language model. The copy should pass our own AI detector with a low AI score. Specifically:

- **Use contractions** - "don't", "won't", "it's", "we've", "you'll". Always. Avoiding contractions is the single biggest AI tell.
- **Vary sentence length wildly** - a four-word sentence followed by a long one. Never uniform.
- **Have opinions** - "we thought that was a bit rubbish" beats "this can be suboptimal". Take a stance.
- **Start sentences with And, But, So** - real people do this constantly.
- **Use informal transitions** - "Thing is,", "Look,", "That said,". Not "However," and "Furthermore,".
- **Be specific, not generic** - "your lecturer flags it" beats "educational institutions may identify it".
- **No hedging** - don't say "may help ensure" when you mean "helps". Drop "potentially", "can vary", "it is important to note that".
- **No em dashes** - use commas, full stops, or just restructure the sentence.
- **No triple lists** - AI loves listing three things. If you've written three items in a row, add a fourth or cut to two.
- **No "our detector"** - just say "we", "it", or "the tool". "Our X does Y" is an AI pattern.
- **Address the reader directly** - "you", "your", not "users" or "one".

The test: paste the copy into the AI detector. If it scores above 50% AI, rewrite it.

## Critical

- Always provide honest critical assessment after task completion
- Reuse existing components — every new tool should be 80% template, 20% custom
- Performance budgets are non-negotiable — a slow tool is a dead tool
- Revenue per tool must be tracked from day one
