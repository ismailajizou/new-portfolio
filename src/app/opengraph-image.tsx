import { renderOgCard } from "@/lib/og-card";

// Re-render hourly so backoffice edits to name, role or location show up.
export const revalidate = 3600;

export const alt = "Ismail Ajizou, Lead Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return renderOgCard(size);
}
