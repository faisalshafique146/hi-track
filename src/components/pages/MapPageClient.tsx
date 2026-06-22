"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { MapSkeleton } from "@/components/map/MapSkeleton";

const ISSMap = dynamic(() => import("@/components/map/ISSMap"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export function MapPageClient() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <PageTransition className="relative z-0 flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <div className="absolute inset-4 sm:inset-6 lg:inset-8">
          <ISSMap />
        </div>
        <div className="absolute left-6 top-6 z-[400] rounded-full bg-black/50 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-white backdrop-blur sm:left-8 sm:top-8 sm:text-xs">
          Real-time Tracking
        </div>
      </PageTransition>
    </div>
  );
}

