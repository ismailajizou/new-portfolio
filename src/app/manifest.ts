import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ismail Ajizou, Lead Full Stack Developer",
    short_name: "Ismail Ajizou",
    start_url: "/",
    display: "browser",
    background_color: "#05060b",
    theme_color: "#05060b",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
