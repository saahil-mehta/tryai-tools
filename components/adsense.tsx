"use client";

import Script from "next/script";

const ADSENSE_CLIENT = "ca-pub-8849126721468775";

export function AdSense() {
  return (
    <Script
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
}
