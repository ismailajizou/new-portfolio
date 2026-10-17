import { DEFAULT_SETTINGS } from "@/cms/default-content";
import { LogoMark, SIGNAL } from "@/components/site/logo";
import { env } from "@/env";
import { getSettings } from "@/server/cms/queries";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const FONT_DIR = join(process.cwd(), "src/assets/fonts");

async function loadFonts() {
  const [bold, regular, mono] = await Promise.all([
    readFile(join(FONT_DIR, "Geist-Bold.ttf")),
    readFile(join(FONT_DIR, "Geist-Regular.ttf")),
    readFile(join(FONT_DIR, "GeistMono-Medium.ttf")),
  ]);
  return [
    { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 500 as const, style: "normal" as const },
  ];
}

/** Settings from the backoffice, or the seed defaults when the DB is unreachable (e.g. at build time). */
async function loadSettings() {
  try {
    return await getSettings();
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function host(url: string | undefined) {
  try {
    return url ? new URL(url).host : null;
  } catch {
    return null;
  }
}

/** Social preview card in the "signal on black" theme, shared by Open Graph and Twitter images. */
export async function renderOgCard(size: { width: number; height: number }) {
  const [settings, fonts] = await Promise.all([loadSettings(), loadFonts()]);
  const [first, ...rest] = settings.name.split(/\s+/);
  const last = rest.join(" ");
  const domain = host(env.NEXT_PUBLIC_URL);

  return new ImageResponse(
    <div
      style={{
        display: "flex",
        position: "relative",
        height: "100%",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: SIGNAL.background,
        // Spotlight glow, top right
        backgroundImage:
          "radial-gradient(circle at 88% 12%, rgba(99,102,241,0.3) 0%, rgba(168,85,247,0.1) 25%, rgba(5,6,11,0) 50%)",
        color: SIGNAL.foreground,
        fontFamily: "Geist",
      }}
    >
      {/* Signal hairline along the bottom edge */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 6,
          backgroundImage: `linear-gradient(90deg, ${SIGNAL.cyan}, ${SIGNAL.indigo}, ${SIGNAL.violet})`,
        }}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <LogoMark size={72} tile gradientId="og-signal" />
        {domain ? (
          <div
            style={{
              display: "flex",
              fontFamily: "Geist Mono",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: SIGNAL.muted,
            }}
          >
            {domain}
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 112,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          <span>{first}</span>
          {last ? (
            <span
              style={{
                marginLeft: 28,
                backgroundImage: `linear-gradient(100deg, ${SIGNAL.cyan}, ${SIGNAL.indigo} 48%, ${SIGNAL.violet})`,
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {last}
            </span>
          ) : null}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 44,
            marginTop: 20,
            color: SIGNAL.foreground,
          }}
        >
          {settings.role}
        </div>
      </div>
    </div>,
    { ...size, fonts },
  );
}
