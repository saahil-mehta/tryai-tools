import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CookieConsent } from "@/components/cookie-consent";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tryai.tools",
  description: "Simple tools to make your life easy.",
};

// Inline script to set dark mode + Google Consent Mode v2 before paint
const headScript = `
  (function() {
    var stored = localStorage.getItem('theme');
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;

    var cc = localStorage.getItem('cookie-consent');
    var state = cc === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'default', {
      ad_storage: state,
      ad_personalization: state,
      ad_user_data: state,
      analytics_storage: state,
    });
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
        <Analytics />
        <CookieConsent />
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              fontFamily: "var(--font-plus-jakarta), sans-serif",
            },
          }}
        />
      </body>
    </html>
  );
}
