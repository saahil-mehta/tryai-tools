import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Privacy Policy | tryai.tools",
  description:
    "How tryai.tools handles your data. Short version: we don't store your text, we don't track you across the web, and we don't sell anything to anyone.",
  alternates: {
    canonical: "https://tryai.tools/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-svh bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
        <SiteHeader breadcrumbs={[{ label: "Privacy Policy" }]} />

        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          Last updated: 5 March 2026
        </p>

        <article className="mt-12 space-y-10 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Who we are
            </h2>
            <p className="mt-3">
              tryai.tools is operated by Knowsee (knowsee.co.uk). We build free,
              browser-based utility tools. You can reach us at{" "}
              <a
                href="mailto:hello@knowsee.co.uk"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
              >
                hello@knowsee.co.uk
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              What we collect
            </h2>
            <p className="mt-3">
              Very little. We don&apos;t have accounts, logins, or sign-up
              forms. Here&apos;s exactly what gets processed:
            </p>
            <div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
              <div className="px-5 py-4">
                <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Text you submit for analysis
                </dt>
                <dd className="mt-1 text-sm">
                  Sent to Google&apos;s Gemini API for processing, then
                  discarded. We don&apos;t store it, log it, or keep any copy.
                  Google processes it under their{" "}
                  <a
                    href="https://ai.google.dev/gemini-api/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
                  >
                    API terms
                  </a>
                  .
                </dd>
              </div>
              <div className="px-5 py-4">
                <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Usage counters
                </dt>
                <dd className="mt-1 text-sm">
                  We track a daily character count (via Upstash Redis) to
                  enforce rate limits. This is a number, not your text. It
                  resets every 24 hours and isn&apos;t tied to any personal
                  information.
                </dd>
              </div>
              <div className="px-5 py-4">
                <dt className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
                  Local storage
                </dt>
                <dd className="mt-1 text-sm">
                  Your scan count and theme preference live in your
                  browser&apos;s localStorage. This data never leaves your
                  device.
                </dd>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              What we don&apos;t collect
            </h2>
            <p className="mt-3">
              No names, no email addresses, no payment details, no IP logging,
              no fingerprinting, no tracking pixels. We don&apos;t build
              profiles and we don&apos;t sell data. There&apos;s nothing to
              sell.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Cookies and analytics
            </h2>
            <p className="mt-3">
              We use Google Analytics 4 to understand which tools get used and
              where traffic comes from. GA4 sets cookies to distinguish
              visitors. You can opt out with any standard cookie-blocking
              browser extension.
            </p>
            <p className="mt-3">
              We also run Google AdSense, which uses cookies to serve relevant
              ads. Google&apos;s advertising cookies are governed by their{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
              >
                privacy policy
              </a>
              . You can manage your ad preferences at{" "}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
              >
                Google Ad Settings
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Third-party services
            </h2>
            <p className="mt-3">We rely on a small number of providers:</p>
            <div className="mt-4 divide-y divide-neutral-200 rounded-xl border border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800 text-sm">
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  Vercel
                </div>
                <div className="px-5 py-3">Hosting and edge deployment</div>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  Google Gemini
                </div>
                <div className="px-5 py-3">AI text analysis</div>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  Upstash Redis
                </div>
                <div className="px-5 py-3">Rate limiting counters</div>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  Google Analytics
                </div>
                <div className="px-5 py-3">Anonymous usage stats</div>
              </div>
              <div className="grid grid-cols-[140px_1fr] sm:grid-cols-[180px_1fr]">
                <div className="px-5 py-3 font-medium text-neutral-900 dark:text-neutral-100">
                  Google AdSense
                </div>
                <div className="px-5 py-3">Advertising</div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Your rights (UK GDPR)
            </h2>
            <p className="mt-3">
              If you&apos;re in the UK or EU, you&apos;ve got the right to
              access, correct, or delete any personal data we hold. But since we
              don&apos;t collect personal data beyond what Google Analytics
              gathers, there&apos;s not much to request. Still, you&apos;re
              welcome to email us and we&apos;ll respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Children
            </h2>
            <p className="mt-3">
              Our tools aren&apos;t directed at anyone under 13. We don&apos;t
              knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Changes to this policy
            </h2>
            <p className="mt-3">
              If we change something meaningful, we&apos;ll update the date at
              the top. We won&apos;t email you because we don&apos;t have your
              email.
            </p>
          </section>
        </article>

        <SiteFooter />
      </div>
    </div>
  );
}
