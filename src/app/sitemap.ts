import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: absoluteUrl("/map"),
      lastModified,
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/passes"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/astronauts"),
      lastModified,
      changeFrequency: "hourly",
      priority: 0.8,
    },
  ];
}
