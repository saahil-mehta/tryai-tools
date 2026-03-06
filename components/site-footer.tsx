import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-neutral-200 dark:border-neutral-800 pt-8 pb-4 text-sm text-neutral-500 dark:text-neutral-400">
      <div className="flex flex-col items-center gap-4">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link
            href="/"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/ai-detector"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            AI Detector
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Terms of Service
          </Link>
        </nav>
        <p>
          A{" "}
          <a
            href="https://knowsee.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Knowsee
          </a>{" "}
          project, built by{" "}
          <a
            href="https://saahil.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
          >
            Saahil
          </a>
        </p>
      </div>
    </footer>
  );
}
