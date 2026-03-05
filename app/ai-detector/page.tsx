import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { AiDetectorTool } from "./components/ai-detector-tool";

export const metadata: Metadata = {
  title:
    "AI Content Detector — Free Online AI Text Checker for ChatGPT, Claude & Gemini | tryai.tools",
  description:
    "Free AI content detector — paste your text for instant analysis with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content in seconds.",
  openGraph: {
    title: "AI Content Detector — Free Online AI Text Checker | tryai.tools",
    description:
      "Paste your text for instant AI detection with sentence-level highlighting. Detect ChatGPT, Claude, and Gemini content in seconds.",
    url: "https://tryai.tools/ai-detector",
    siteName: "tryai.tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Detector — Free AI Text Checker | tryai.tools",
    description:
      "Paste your text for instant AI detection with sentence-level highlighting.",
  },
  alternates: {
    canonical: "https://tryai.tools/ai-detector",
  },
};

const FAQ_ITEMS = [
  {
    question: "How accurate are AI detectors?",
    answer:
      "AI detectors typically achieve 85-95% accuracy on pure AI-generated text. Accuracy can vary with heavily edited or mixed human-AI content. Our detector combines statistical heuristics with deep LLM analysis for the most reliable results, and highlights exactly which sentences triggered detection so you can verify the analysis yourself.",
  },
  {
    question: "Can this AI detector detect ChatGPT content?",
    answer:
      "Yes. Our AI content detector analyses text patterns characteristic of all major language models including ChatGPT (GPT-4, GPT-5), Claude, Gemini, DeepSeek, and Llama. The deep analysis examines sentence structure, vocabulary patterns, and writing style to identify AI-generated content regardless of which model produced it.",
  },
  {
    question: "Will Google penalise AI-generated content?",
    answer:
      "Google has stated that AI-generated content is not inherently against their guidelines. However, low-quality, unoriginal, or spammy content — whether written by humans or AI — may be penalised. Using an AI content detector helps ensure your content maintains the quality and originality that search engines reward.",
  },
  {
    question: "How does our AI detector work?",
    answer:
      "Our detector uses two layers of analysis. First, instant client-side heuristics scan for statistical patterns like sentence uniformity, vocabulary repetition, and formatting quirks. Then, a deep AI-powered analysis examines each sentence individually, providing a confidence score and detailed reasoning for every classification.",
  },
  {
    question: "Can AI detectors be wrong?",
    answer:
      "Yes — no AI detector is 100% accurate. False positives (human text flagged as AI) and false negatives (AI text missed) can occur. Formal academic writing and non-native English text are more prone to false positives. Our detector mitigates this by providing sentence-level analysis and detailed reasoning, so you can evaluate the evidence yourself rather than relying on a single score.",
  },
  {
    question: "Is this AI detector free to use?",
    answer:
      "Yes. You get 5 free deep analysis scans per day with no sign-up required. The instant heuristic analysis is always free and unlimited. Sign up for an account to get additional daily scans.",
  },
  {
    question: "What is the minimum text length for detection?",
    answer:
      "We require a minimum of 50 words for accurate analysis. Shorter texts do not provide enough statistical data for reliable AI detection. For best results, analyse passages of 100 words or more.",
  },
  {
    question: "Can Turnitin detect AI writing?",
    answer:
      "Turnitin has its own AI detection system, but it is primarily available to educational institutions with a Turnitin subscription. Our free AI detector provides comparable analysis with the added benefit of sentence-level highlighting and detailed reasoning — available to everyone, no institutional subscription needed.",
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
        text: "Click the Analyse button to run instant heuristic analysis and deep AI-powered scanning.",
      },
      {
        "@type": "HowToStep",
        name: "Review results",
        text: "Review the sentence-by-sentence breakdown, overall verdict, and detailed reasoning for each classification.",
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
              Paste your text for instant analysis with sentence-level
              highlighting.
              <br className="hidden sm:inline" /> Detect ChatGPT, Claude, and
              Gemini content in seconds.
            </p>
          </header>

          {/* Tool */}
          <AiDetectorTool />

          {/* SEO Content */}
          <article className="mt-24 space-y-16">
            {/* What is an AI content detector? */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                What is an AI content detector?
              </h2>
              <div className="mt-4 space-y-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <p>
                  An AI content detector is a tool that analyses text to
                  determine whether it was written by a human or generated by an
                  artificial intelligence model such as ChatGPT, Claude, or
                  Gemini. These tools examine writing patterns, statistical
                  features, and stylistic cues that differ between human and
                  machine-generated text.
                </p>
                <p>
                  AI-generated text tends to exhibit certain telltale
                  characteristics: uniform sentence lengths, limited vocabulary
                  diversity, excessive use of em dashes, avoidance of
                  contractions and negations, and a preference for lists in
                  groups of three. Human writing, by contrast, is messier and
                  more varied — mixing short punchy sentences with long complex
                  ones, using slang and colloquialisms, and displaying
                  inconsistent formatting.
                </p>
              </div>
            </section>

            {/* How it works */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                How our AI detector works
              </h2>
              <div className="mt-4 space-y-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <p>
                  Our detector uses a two-layer approach for maximum accuracy and
                  transparency:
                </p>
                <div className="space-y-6 mt-6">
                  <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-5">
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                      Step 1: Instant pattern analysis
                    </h3>
                    <p className="mt-2">
                      The moment you click Analyse, our client-side engine scans
                      your text for seven statistical markers of AI writing:
                      sentence uniformity, vocabulary diversity, writing
                      burstiness, repeated phrases, negation density, em dash
                      frequency, and list patterns. Results appear in
                      milliseconds.
                    </p>
                  </div>
                  <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-5">
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                      Step 2: Deep AI-powered scan
                    </h3>
                    <p className="mt-2">
                      Simultaneously, our server-side analysis examines every
                      sentence individually using advanced AI. Each sentence
                      receives its own classification — AI, human, or uncertain —
                      with a confidence score and colour-coded highlighting so
                      you can see exactly which parts of the text triggered
                      detection.
                    </p>
                  </div>
                  <div className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-5">
                    <h3 className="font-medium text-neutral-800 dark:text-neutral-200">
                      Step 3: Transparent reasoning
                    </h3>
                    <p className="mt-2">
                      Unlike other detectors that give you a percentage and
                      nothing else, we explain <em>why</em> the text was
                      classified the way it was. You see the specific patterns
                      detected — whether that is uniform paragraph structure,
                      lack of contractions, or excessive hedging language.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Why tryai.tools */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Why tryai.tools AI detector?
              </h2>
              <div className="mt-4 space-y-4 text-neutral-500 dark:text-neutral-400 leading-relaxed">
                <p>
                  Most AI detectors give you a single percentage and leave you
                  guessing. We built something better:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex gap-2">
                    <span className="text-neutral-500 shrink-0">&bull;</span>
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        Sentence-level highlighting
                      </strong>{" "}
                      — see exactly which sentences look AI-generated, not just
                      an overall score
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-500 shrink-0">&bull;</span>
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        Transparent reasoning
                      </strong>{" "}
                      — understand <em>why</em> text was flagged with specific
                      pattern explanations
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-500 shrink-0">&bull;</span>
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        Dual-layer analysis
                      </strong>{" "}
                      — instant statistical heuristics plus deep AI-powered
                      scanning
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-500 shrink-0">&bull;</span>
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        Free, no sign-up
                      </strong>{" "}
                      — 5 deep scans per day with no account needed
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neutral-500 shrink-0">&bull;</span>
                    <span>
                      <strong className="text-neutral-800 dark:text-neutral-200">
                        All major models
                      </strong>{" "}
                      — detects content from ChatGPT, Claude, Gemini, DeepSeek,
                      Llama, and more
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Use cases */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                Who uses AI content detectors?
              </h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/30 p-5">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">Students</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Check your own work before submission to ensure it does not
                    accidentally trigger AI detection flags. Understand what
                    makes writing look AI-generated so you can develop a more
                    distinctive voice.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/30 p-5">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">Teachers</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Screen student submissions for potential AI usage. Our
                    sentence-level analysis helps you identify specific passages
                    to discuss with students, rather than making blanket
                    accusations based on a single score.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/30 p-5">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">Writers</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Verify that your human-written content will not be falsely
                    flagged by AI detectors used by publishers, clients, or
                    search engines. Protect your reputation and prove
                    originality.
                  </p>
                </div>
                <div className="rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/30 p-5">
                  <h3 className="font-medium text-neutral-800 dark:text-neutral-200">Publishers</h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Screen submitted articles, guest posts, and freelance
                    content for AI generation before publishing. Maintain
                    editorial standards and reader trust.
                  </p>
                </div>
              </div>
            </section>

            {/* Comparison */}
            <section>
              <h2 className="text-2xl font-semibold tracking-tight">
                How we compare
              </h2>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-left">
                      <th className="pb-3 pr-4 font-medium text-neutral-700 dark:text-neutral-300">
                        Feature
                      </th>
                      <th className="pb-3 pr-4 font-medium text-neutral-700 dark:text-neutral-300">
                        tryai.tools
                      </th>
                      <th className="pb-3 pr-4 font-medium text-neutral-500 dark:text-neutral-400">
                        ZeroGPT
                      </th>
                      <th className="pb-3 font-medium text-neutral-500 dark:text-neutral-400">
                        GPTZero
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-neutral-500 dark:text-neutral-400">
                    <tr className="border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <td className="py-3 pr-4">
                        Sentence-level highlighting
                      </td>
                      <td className="py-3 pr-4 text-emerald-400">Yes</td>
                      <td className="py-3 pr-4">Partial</td>
                      <td className="py-3">Yes</td>
                    </tr>
                    <tr className="border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <td className="py-3 pr-4">Reasoning explanation</td>
                      <td className="py-3 pr-4 text-emerald-400">Detailed</td>
                      <td className="py-3 pr-4">No</td>
                      <td className="py-3">Basic</td>
                    </tr>
                    <tr className="border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <td className="py-3 pr-4">Pattern detection</td>
                      <td className="py-3 pr-4 text-emerald-400">
                        7+ heuristics + AI
                      </td>
                      <td className="py-3 pr-4">AI only</td>
                      <td className="py-3">AI only</td>
                    </tr>
                    <tr className="border-b border-neutral-200/50 dark:border-neutral-800/50">
                      <td className="py-3 pr-4">Free scans per day</td>
                      <td className="py-3 pr-4 text-emerald-400">5</td>
                      <td className="py-3 pr-4">Unlimited</td>
                      <td className="py-3">3</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4">Sign-up required</td>
                      <td className="py-3 pr-4 text-emerald-400">No</td>
                      <td className="py-3 pr-4">No</td>
                      <td className="py-3">Yes (for full)</td>
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
              <div className="mt-6 space-y-6">
                {FAQ_ITEMS.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-lg border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/30"
                  >
                    <summary className="cursor-pointer list-none px-5 py-4 text-neutral-800 dark:text-neutral-200 font-medium flex items-center justify-between">
                      {item.question}
                      <span className="ml-2 text-neutral-500 group-open:rotate-180 transition-transform duration-200">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
              — AI tools, simplified.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
