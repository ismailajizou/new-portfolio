import { LogoMark, SIGNAL } from "@/components/site/logo";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

// iOS adds its own rounded mask, so the tile is a full-bleed square.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        background: SIGNAL.background,
      }}
    >
      <LogoMark size={150} gradientId="apple-signal" />
    </div>,
    { ...size },
  );
}
