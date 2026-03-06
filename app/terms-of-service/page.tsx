import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Terms of Service | tryai.tools",
  description:
    "Terms of service for tryai.tools. Free AI tools with fair usage limits. No warranty, no stored data, no surprises.",
  alternates: {
    canonical: "https://tryai.tools/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-svh bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-12">
          <ol className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <li>
              <Link
                href="/"
                className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900 dark:text-neutral-100">
              Terms of Service
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Last updated: 5 March 2026
        </p>

        <article className="mt-12 space-y-10 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              What this is
            </h2>
            <p className="mt-3">
              tryai.tools provides free, browser-based utility tools. By using
              the site, you agree to these terms. If you don&apos;t agree, close
              the tab. No hard feelings.
            </p>
            <p className="mt-3">
              The site is operated by Knowsee (knowsee.co.uk), based in the
              United Kingdom.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Using our tools
            </h2>
            <p className="mt-3">
              You&apos;re free to use our tools for any lawful purpose. That
              said:
            </p>
            <div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800 text-sm">
              <div className="px-5 py-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  Don&apos;t abuse rate limits
                </p>
                <p className="mt-1">
                  We set daily usage limits so the tools stay free for everyone.
                  Automated scraping, bots, or bulk requests that bypass these
                  limits aren&apos;t allowed.
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  Don&apos;t submit illegal content
                </p>
                <p className="mt-1">
                  We don&apos;t store what you paste, but don&apos;t use our
                  tools to process content that violates any law.
                </p>
              </div>
              <div className="px-5 py-4">
                <p className="font-medium text-neutral-900 dark:text-neutral-100">
                  Don&apos;t reverse-engineer or resell
                </p>
                <p className="mt-1">
                  You&apos;re welcome to use the results. You&apos;re not
                  welcome to wrap our API in your own product or sell access to
                  it.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Results aren&apos;t guarantees
            </h2>
            <p className="mt-3">
              Our AI detection tools provide statistical estimates, not
              definitive proof. No AI detector is 100% accurate. Don&apos;t use
              our results as the sole basis for academic, legal, or employment
              decisions. We provide analysis to inform your judgement, not
              replace it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Your content
            </h2>
            <p className="mt-3">
              You own whatever you paste into our tools. We don&apos;t claim any
              rights over it. Text is sent to third-party APIs (currently Google
              Gemini) for processing and isn&apos;t stored on our servers. Once
              the analysis is done, it&apos;s gone.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Availability and changes
            </h2>
            <p className="mt-3">
              We can change, pause, or shut down any tool at any time. We
              don&apos;t guarantee uptime and we won&apos;t compensate for
              downtime. The tools are free, so the service level agreement is:
              there isn&apos;t one.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Liability
            </h2>
            <p className="mt-3">
              Everything on tryai.tools is provided &quot;as is&quot; without
              warranty of any kind. To the maximum extent allowed by law, we
              aren&apos;t liable for any damages arising from your use of our
              tools. This includes, but isn&apos;t limited to, incorrect
              detection results, service interruptions, or data loss.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Advertising
            </h2>
            <p className="mt-3">
              We display ads through Google AdSense. Ad content is controlled by
              Google, not us. We don&apos;t endorse any products or services
              shown in ads. See our{" "}
              <Link
                href="/privacy-policy"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
              >
                privacy policy
              </Link>{" "}
              for details on how ad-related cookies work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Governing law
            </h2>
            <p className="mt-3">
              These terms are governed by the laws of England and Wales. Any
              disputes will be handled by the courts of England and Wales.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Contact
            </h2>
            <p className="mt-3">
              Questions? Email{" "}
              <a
                href="mailto:hello@tryai.tools"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
              >
                hello@tryai.tools
              </a>
              .
            </p>
          </section>
        </article>

        <SiteFooter />
      </div>
    </div>
  );
}
