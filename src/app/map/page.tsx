import type { Metadata } from "next";
import { MapPageClient } from "@/components/pages/MapPageClient";
import { createPageMetadata, createWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Live ISS Map",
  description:
    "Explore the live ISS map to see the International Space Station's current location and orbital movement in real time.",
  path: "/map",
  keywords: ["live ISS map", "ISS location now", "space station map"],
});

const schema = createWebPageSchema({
  title: "Live ISS Map",
  description:
    "Explore the live ISS map to see the International Space Station's current location and orbital movement in real time.",
  path: "/map",
});

export default function MapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MapPageClient />
    </>
  );
}
