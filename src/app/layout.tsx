import "../styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata, type Viewport } from "next";
import { env } from "@/env";
import { GeistMono } from "geist/font/mono";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_SCRIPT_ID, SCRIPT_URL } from "@marsidev/react-turnstile";
import Script from "next/script";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
  title: {
    default: "Ismail Ajizou, Lead Full Stack Developer",
    template: "%s | Ismail Ajizou",
  },
  description:
    "Lead Full Stack Developer in Casablanca, shipping production platforms with a two-person team.",
  applicationName: "Ismail Ajizou",
  authors: [{ name: "Ismail Ajizou", url: env.NEXT_PUBLIC_URL }],
  creator: "Ismail Ajizou",
  keywords: [
    "Ismail Ajizou",
    "Lead Full Stack Developer",
    "Full Stack Developer",
    "Tech Lead",
    "Casablanca",
    "Morocco",
    "Laravel",
    "Nuxt",
    "Next.js",
    "TypeScript",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: "/",
    siteName: "Ismail Ajizou",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#05060b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        spaceGrotesk.variable,
        "dark font-sans [color-scheme:dark]",
      )}
    >
      <body>
        <Script
          id={DEFAULT_SCRIPT_ID}
          src={SCRIPT_URL}
          strategy="afterInteractive"
        />
        <Providers>
          <TooltipProvider>{children}</TooltipProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
