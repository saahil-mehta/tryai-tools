import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title:
    "Free Online Tools for Everyday Tasks | Calculators, AI Detection & More | tryai.tools",
  description:
    "Free browser-based tools for everyday tasks. AI detection, calculators, and more. No sign-up, no data stored.",
  openGraph: {
    title: "Free Online Tools | tryai.tools",
    description:
      "Free browser-based tools for everyday tasks. AI detection, calculators, and more. No sign-up, no data stored.",
    url: "https://tryai.tools",
    siteName: "tryai.tools",
    type: "website",
    images: [
      {
        url: "https://tryai.tools/og.png",
        width: 1200,
        height: 630,
        alt: "tryai.tools - simple tools to make your life easy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Tools | tryai.tools",
    description:
      "Free browser-based tools for everyday tasks. AI detection, calculators, and more.",
    images: ["https://tryai.tools/og.png"],
  },
  alternates: {
    canonical: "https://tryai.tools",
  },
};

const tools = [
  {
    name: "AI Content Detector",
    slug: "ai-detector",
    description:
      "Paste any text and get an instant verdict. Seven statistical checks run in your browser, then a server-side model classifies each sentence. Works with ChatGPT, Claude, Gemini, and more.",
    tag: "Detection",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "tryai.tools",
            url: "https://tryai.tools",
            description:
              "Free browser-based tools for everyday tasks. AI detection, calculators, and more.",
            publisher: {
              "@type": "Organization",
              name: "Knowsee",
              url: "https://knowsee.co.uk",
            },
          }),
        }}
      />

      <div className="min-h-svh bg-white dark:bg-neutral-950">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
          <SiteHeader />
          <h1 className="sr-only">tryai.tools</h1>
          <p className="mt-4 text-lg text-neutral-500 dark:text-neutral-400">
            Simple tools to make your life easy.
          </p>

          <section className="mt-16">
            <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Tools
            </h2>
            <div className="mt-4 space-y-3">
              {tools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${tool.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-neutral-200 dark:border-neutral-700 px-5 py-5 transition-all active:scale-[0.99] hover:bg-neutral-50 dark:hover:bg-neutral-900 feature-expand-glow"
                >
                  <div className="min-w-0">
                    <h3 className="font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                      {tool.description}
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 rounded-md border border-neutral-200 dark:border-neutral-800 px-2 py-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                    {tool.tag}
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              More coming soon
            </h2>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              We&apos;re building more tools based on what people actually
              search for. Each one is free, runs client-side where possible, and
              doesn&apos;t need an account.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="text-xs font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Contact
            </h2>
            <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
              Got an idea for a tool, or want to get in touch? Reach the founder
              at{" "}
              <a
                href="https://saahil.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
              >
                saahil.co.uk
              </a>
            </p>
          </section>

          <SiteFooter />
        </div>
      </div>
    </>
  );
}
