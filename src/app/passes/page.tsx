import type { Metadata } from "next";
import { PassesPageClient } from "@/components/pages/PassesPageClient";
import { createPageMetadata, createWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "ISS Pass Predictions",
  description:
    "Find upcoming International Space Station pass times for your location and plan the best window to spot the ISS overhead.",
  path: "/passes",
  keywords: ["ISS pass predictions", "ISS flyover times", "spot the ISS"],
});

const schema = createWebPageSchema({
  title: "ISS Pass Predictions",
  description:
    "Find upcoming International Space Station pass times for your location and plan the best window to spot the ISS overhead.",
  path: "/passes",
});

export default function PassesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <PassesPageClient />
    </>
  );
}
