"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Skeleton } from "@/components/ui/skeleton";
import { PageTransition } from "@/components/layout/PageTransition";

const ISSMap = dynamic(() => import("@/components/map/ISSMap"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-full" />,
});

export default function MapPage() {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <PageTransition className="flex-1 relative z-0">
                <div className="absolute inset-0">
                    <ISSMap />
                </div>
                {/* Overlay controls could go here */}
                <div className="absolute top-4 right-4 z-[400] bg-black/50 backdrop-blur p-2 rounded text-xs text-white">
                    Real-time Tracking
                </div>
            </PageTransition>
        </div>
    );
}
