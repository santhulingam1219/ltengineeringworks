import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LT Admin — LT Engineering Works",
    short_name: "LT Admin",
    description: "Mobile Management App for LT Engineering Works Operations, Enquiries & Applications",
    start_url: "/admin",
    id: "com.ltengineeringworks.admin",
    display: "standalone",
    background_color: "#0B1120",
    theme_color: "#0B1120",
    orientation: "portrait",
    categories: ["business", "productivity", "utilities"],
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/images/hero-steel-plant.webp",
        sizes: "1280x720",
        type: "image/webp",
        form_factor: "wide",
      },
      {
        src: "/images/manpower-crew-team.webp",
        sizes: "720x1280",
        type: "image/webp",
        form_factor: "narrow",
      },
    ],
  };
}
