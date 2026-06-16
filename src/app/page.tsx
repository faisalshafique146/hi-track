import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { PageTransition } from "@/components/layout/PageTransition";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <PageTransition className="container mx-auto flex-1 space-y-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <HeroSection />
        <StatsGrid />
      </PageTransition>
      <Footer />
    </div>
  );
}
