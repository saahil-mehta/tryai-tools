import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

interface Crumb {
  label: string;
  href?: string;
}

interface SiteHeaderProps {
  breadcrumbs?: Crumb[];
}

export function SiteHeader({ breadcrumbs }: SiteHeaderProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-neutral-400 dark:text-neutral-500 min-w-0">
        <Link href="/" className="shrink-0" aria-label="Home">
          <Image
            src="/tryai-logo-light.png"
            alt="tryai.tools"
            width={659}
            height={352}
            className="h-7 w-auto dark:hidden"
            priority
          />
          <Image
            src="/tryai-logo-dark.png"
            alt="tryai.tools"
            width={659}
            height={352}
            className="hidden h-7 w-auto dark:block"
            priority
          />
        </Link>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex items-center gap-2">
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2 min-w-0">
                  <span aria-hidden="true">/</span>
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-neutral-700 dark:text-neutral-300 truncate">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
      <ThemeToggle />
    </div>
  );
}
