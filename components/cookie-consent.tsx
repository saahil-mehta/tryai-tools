"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Script from "next/script";

const GA_ID = "G-Q6LZBPTHLF";
const ADSENSE_CLIENT = "ca-pub-8849126721468775";
const CONSENT_KEY = "cookie-consent";

type Consent = "granted" | "denied" | null;

function getStoredConsent(): Consent {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;
  return null;
}

function updateConsentMode(state: "granted" | "denied") {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      ad_storage: state,
      ad_personalization: state,
      ad_user_data: state,
      analytics_storage: state,
    });
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(() => getStoredConsent());
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!consent) {
      // Small delay so the banner doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [consent]);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "granted");
    updateConsentMode("granted");
    setConsent("granted");
    setVisible(false);
  }, []);

  const handleDecline = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "denied");
    updateConsentMode("denied");
    setConsent("denied");
    setVisible(false);
  }, []);

  return (
    <>
      {/* AdSense — always loaded, consent mode controls personalisation */}
      <Script
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      {/* GA4 scripts — only load after consent */}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Banner */}
      {visible && (
        <div
          className="
            fixed bottom-0 left-0 right-0 z-50
            animate-[slideUp_0.3s_ease-out]
          "
        >
          <div className="mx-auto max-w-3xl px-4 pb-4">
            <div
              className="
                flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
                rounded-xl border border-neutral-200 dark:border-neutral-800
                bg-white dark:bg-neutral-950
                px-5 py-4 shadow-sm
              "
            >
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                We use cookies for analytics and personalised ads.{" "}
                <Link
                  href="/privacy-policy"
                  className="text-neutral-900 dark:text-neutral-200 underline underline-offset-4"
                >
                  Privacy policy
                </Link>
              </p>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleDecline}
                  className="
                    rounded-lg px-3.5 py-1.5 text-sm
                    text-neutral-500 dark:text-neutral-400
                    hover:text-neutral-700 dark:hover:text-neutral-200
                    transition-colors
                  "
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="
                    rounded-lg bg-neutral-900 dark:bg-white
                    px-3.5 py-1.5 text-sm font-medium
                    text-white dark:text-neutral-950
                    hover:bg-neutral-700 dark:hover:bg-neutral-300
                    active:scale-[0.97] transition-all duration-150
                  "
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
