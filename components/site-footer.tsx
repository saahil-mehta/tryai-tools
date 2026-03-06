import Link from "next/link";

const navClass =
  "hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors";

const inlineClass =
  "underline decoration-neutral-300 dark:decoration-neutral-700 underline-offset-4 hover:text-neutral-700 dark:hover:text-neutral-300 hover:decoration-neutral-400 dark:hover:decoration-neutral-500 transition-colors";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-8 pb-4 text-sm text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col items-center gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/" className={navClass}>
            Home
          </Link>
          <Link href="/ai-detector" className={navClass}>
            AI Detector
          </Link>
          <Link href="/privacy-policy" className={navClass}>
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className={navClass}>
            Terms of Service
          </Link>
        </nav>
        <p>
          A{" "}
          <a
            href="https://knowsee.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineClass}
          >
            Knowsee
          </a>{" "}
          project, built by{" "}
          <a
            href="https://saahil.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className={inlineClass}
          >
            Saahil Mehta
          </a>
        </p>
      </div>
    </footer>
  );
}
