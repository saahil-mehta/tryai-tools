import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AiDetectorTool } from "./components/ai-detector-tool";

export const metadata: Metadata = {
  title:
    "AI Content Detector - Free Online AI Text Checker for ChatGPT, Claude & Gemini | tryai.tools",
  description:
    "Free AI content detector. Paste your text for instant analysis with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content in seconds.",
  openGraph: {
    title: "AI Content Detector - Free Online AI Text Checker | tryai.tools",
    description:
      "Paste your text for instant AI detection with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content in seconds.",
    url: "https://tryai.tools/ai-detector",
    siteName: "tryai.tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Detector - Free AI Text Checker | tryai.tools",
    description:
      "Paste your text for instant AI detection with sentence-level highlighting.",
  },
  alternates: {
    canonical: "https://tryai.tools/ai-detector",
  },
};

const FAQ_ITEMS = [
  {
    question: "How accurate is this AI detector?",
    answer:
      "85-95% on unedited AI output. Blended text (human-edited ChatGPT drafts, for instance) is harder. That's why we show sentence-level results instead of a single score.",
  },
  {
    question: "Which AI models can it detect?",
    answer:
      "ChatGPT (GPT-4, GPT-4o, GPT-5), Claude (Sonnet, Opus, Haiku), Google Gemini (Pro, Ultra), DeepSeek-V3, Llama 3, Llama 4, Mistral, Mixtral, Copilot, Jasper, and Perplexity. The detection is structural, so new models based on similar architectures will generally be caught too.",
  },
  {
    question: "Will Google penalise AI-generated content?",
    answer:
      "Google's position is that AI content isn't against their guidelines. Thin, unoriginal content is. A detector flags the mechanical patterns that make text look mass-produced, which is what search engines actually care about.",
  },
  {
    question: "How does the detection work?",
    answer:
      "Seven statistical checks run instantly in your browser, then those scores get sent alongside your text to a server-side model. It reads each sentence, factors in the heuristic data, and produces a single unified report with sentence-level classifications and detailed reasoning.",
  },
  {
    question: "Can AI detectors be wrong?",
    answer:
      "Yes. Academic prose and non-native English trip false positives more often than they should. This is an industry-wide problem, and it's the main reason we show the evidence instead of hiding it behind a percentage.",
  },
  {
    question: "Is this free?",
    answer:
      "Five scans per day, no account needed. Each scan gives you the full report with sentence-level analysis, reasoning, and statistical indicators.",
  },
  {
    question: "Can I download the report?",
    answer:
      "Yes. After any scan you can download a PDF or copy the results as formatted markdown. The PDF is always in light mode for readability, regardless of your theme setting.",
  },
  {
    question: "What's the minimum text length?",
    answer:
      "50 words. Below that there isn't enough material for a meaningful statistical analysis. Aim for 100+ words where possible.",
  },
  {
    question: "How does this compare to Turnitin?",
    answer:
      "Turnitin's AI detection requires an institutional subscription. We offer comparable sentence-level analysis for free, with published reasoning for each classification.",
  },
];

function JsonLd() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "tryai.tools AI Content Detector",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
    },
    description:
      "Free AI content detector with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content instantly.",
    url: "https://tryai.tools/ai-detector",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to detect AI-generated content",
    description:
      "Use our free AI content detector to check if text was written by AI.",
    step: [
      {
        "@type": "HowToStep",
        name: "Paste your text",
        text: "Copy and paste the text you want to analyse into the text box. Minimum 50 words required.",
      },
      {
        "@type": "HowToStep",
        name: "Click Analyse",
        text: "Click Analyse to run statistical checks and AI-powered sentence classification in one pass.",
      },
      {
        "@type": "HowToStep",
        name: "Review and download",
        text: "Read the unified report with verdict, reasoning, sentence highlighting, and statistical indicators. Download as PDF or copy as markdown.",
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://tryai.tools",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "AI Tools",
        item: "https://tryai.tools",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "AI Content Detector",
        item: "https://tryai.tools/ai-detector",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}

export default function AiDetectorPage() {
  return (
    <>
      <JsonLd />
      <div className="min-h-svh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
          {/* Top bar */}
          <div className="mb-8 flex items-center justify-between">
            <nav
              aria-label="Breadcrumb"
              className="text-sm text-neutral-400 dark:text-neutral-500"
            >
              <ol className="flex items-center gap-2">
                <li>
                  <Link
                    href="/"
                    className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span className="text-neutral-500 dark:text-neutral-400">AI Tools</span>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <span className="text-neutral-700 dark:text-neutral-300">AI Content Detector</span>
                </li>
              </ol>
            </nav>
            <ThemeToggle />
          </div>

          {/* Header */}
          <header className="mb-10 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              AI Content Detector
            </h1>
            <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
              Paste your text and get a sentence-by-sentence verdict
              <br className="hidden sm:inline" /> with the reasoning behind
              every classification.
            </p>
          </header>

          {/* Tool */}
          <AiDetectorTool />

          {/* SEO Content */}
          <article className="mt-24 space-y-20">
            {/* What is an AI content detector? */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                What is an AI content detector?
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                It reads your writing and determines whether a person or a
                language model produced it. AI prose carries a statistical
                fingerprint: metronomic sentence lengths, a narrow vocabulary
                band, an avoidance of contractions. Human writing is more
                irregular by nature, and detectors exploit that contrast.
              </p>
            </section>

            {/* How it works */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                How it works
              </h2>
              <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800">
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Step 1</p>
                  <h3 className="mt-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                    Paste and analyse
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Drop your text in and click Analyse. Seven statistical
                    checks run instantly in your browser, then feed into a
                    server-side model for a combined verdict.
                  </p>
                </div>
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Step 2</p>
                  <h3 className="mt-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                    Read the report
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    One unified report: overall verdict, detailed reasoning,
                    sentence-level colour coding, and every statistical
                    indicator that contributed to the result.
                  </p>
                </div>
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <p className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Step 3</p>
                  <h3 className="mt-1.5 font-medium text-neutral-900 dark:text-neutral-100">
                    Download or share
                  </h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Copy the report as markdown or download a clean PDF.
                    Handy when you need to send evidence to someone else.
                  </p>
                </div>
              </div>
            </section>

            {/* Supported models — SEO keyword block */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Supported models
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                Detection is structural, not model-specific. It works on
                output from any major language model.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "ChatGPT", "GPT-4", "GPT-4o", "GPT-5",
                  "Claude", "Claude 3.5 Sonnet", "Claude Opus",
                  "Gemini", "Gemini Pro", "Gemini Ultra",
                  "DeepSeek", "DeepSeek-V3",
                  "Llama 3", "Llama 4", "Mistral", "Mixtral",
                  "Copilot", "Jasper", "Perplexity",
                ].map((model) => (
                  <span
                    key={model}
                    className="rounded-md border border-neutral-200 bg-neutral-50 px-2.5 py-1 text-xs text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </section>

            {/* Why this detector */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Why this detector?
              </h2>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Sentence-level highlighting
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Each sentence is classified individually in the original
                    text.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Published reasoning
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Every verdict comes with the evidence behind it.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Downloadable report
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Copy as markdown or download a PDF. Send it to a
                    colleague, attach it to a submission.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                    Free, no account
                  </dt>
                  <dd className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    Five scans per day, full report every time.
                  </dd>
                </div>
              </dl>
            </section>

            {/* Use cases */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Who uses AI content detectors?
              </h2>
              <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-neutral-200 bg-neutral-200 dark:border-neutral-800 dark:bg-neutral-800 sm:grid-cols-2">
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Students</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Check your work before submission. Better to know now
                    if something reads as AI-generated.
                  </p>
                </div>
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Educators</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Sentence-level evidence you can point to. Useful in a
                    conversation where vague accusations won't do.
                  </p>
                </div>
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Writers</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Identify which passages trigger false positives so you
                    can revise before an editor raises the question.
                  </p>
                </div>
                <div className="bg-white p-5 dark:bg-neutral-950">
                  <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">Publishers</h3>
                  <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
                    Screen freelance and guest submissions. A quicker first
                    pass than a manual read.
                  </p>
                </div>
              </div>
            </section>

            {/* Comparison */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                How we compare
              </h2>
              <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-left bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-5 py-3 font-medium text-neutral-700 dark:text-neutral-300">
                        Feature
                      </th>
                      <th className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                        tryai.tools
                      </th>
                      <th className="px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                        ZeroGPT
                      </th>
                      <th className="px-5 py-3 font-medium text-neutral-500 dark:text-neutral-400">
                        GPTZero
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-500 dark:text-neutral-400">
                    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <td className="px-5 py-3">Sentence highlighting</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">Yes</td>
                      <td className="px-5 py-3">Partial</td>
                      <td className="px-5 py-3">Yes</td>
                    </tr>
                    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <td className="px-5 py-3">Reasoning</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">Detailed</td>
                      <td className="px-5 py-3">No</td>
                      <td className="px-5 py-3">Basic</td>
                    </tr>
                    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <td className="px-5 py-3">Detection method</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">7 heuristics + AI</td>
                      <td className="px-5 py-3">AI only</td>
                      <td className="px-5 py-3">AI only</td>
                    </tr>
                    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <td className="px-5 py-3">Free daily scans</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">5</td>
                      <td className="px-5 py-3">Unlimited</td>
                      <td className="px-5 py-3">3</td>
                    </tr>
                    <tr className="border-b border-neutral-200/60 dark:border-neutral-800/60">
                      <td className="px-5 py-3">Downloadable PDF</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">Yes</td>
                      <td className="px-5 py-3">No</td>
                      <td className="px-5 py-3">No</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3">Sign-up needed</td>
                      <td className="px-5 py-3 text-neutral-900 dark:text-neutral-100">No</td>
                      <td className="px-5 py-3">No</td>
                      <td className="px-5 py-3">Yes (full)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
                {FAQ_ITEMS.map((item, i) => (
                  <details key={i} className="group">
                    <summary className="cursor-pointer list-none px-5 py-4 text-sm text-neutral-800 dark:text-neutral-200 font-medium flex items-center justify-between">
                      {item.question}
                      <span className="ml-4 shrink-0 text-neutral-400 dark:text-neutral-500 group-open:rotate-180 transition-transform duration-200">
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="px-5 pb-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          </article>

          {/* Footer */}
          <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-center text-sm text-neutral-500">
            <p>
              <Link
                href="/"
                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                tryai.tools
              </Link>{" "}
              - AI tools, simplified.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
