import "../styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";
import { env } from "@/env";
import { Inter, Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DEFAULT_SCRIPT_ID, SCRIPT_URL } from "@marsidev/react-turnstile";
import Script from "next/script";

const geistHeading = Geist({ subsets: ["latin"], variable: "--font-heading" });

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Ismail Ajizou - Portfolio",
  description: "Hi! I'm Ismail Ajizou, a software engineer.",
  metadataBase: new URL(env.NEXT_PUBLIC_URL),
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
        "font-sans",
        inter.variable,
        geistHeading.variable,
      )}
    >
      <body className="dark scroll-smooth">
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
