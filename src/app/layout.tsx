import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Providers } from "./providers";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";
import { env } from "@/env";

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
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="dark scroll-smooth">
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
