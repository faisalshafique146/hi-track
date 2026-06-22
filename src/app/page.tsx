import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  absoluteUrl,
  createPageMetadata,
  siteConfig,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Live ISS Tracker and Space Station Map",
  description:
    "Follow the International Space Station in real time with a live map, orbital stats, pass predictions, and current astronaut data.",
  path: "/",
  keywords: ["ISS map", "real-time satellite tracker", "space station live"],
});

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      description: siteConfig.description,
      inLanguage: "en",
    },
    {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl("/"),
    },
    {
      "@type": "WebApplication",
      name: siteConfig.name,
      url: absoluteUrl("/"),
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      description:
        "A web app for live ISS tracking, upcoming pass predictions, and current astronaut information.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
      <Header />
      <PageTransition className="container mx-auto flex-1 space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HeroSection />
        <StatsGrid />
      </PageTransition>
      <Footer />
    </div>
  );
}
