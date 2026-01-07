import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PageTransition } from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <PageTransition className="flex-1 container py-6 space-y-8 px-4">
        <HeroSection />
        <StatsGrid />
      </PageTransition>
      <Footer />
    </div>
  );
}
