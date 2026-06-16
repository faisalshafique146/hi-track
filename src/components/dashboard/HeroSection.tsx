"use client";

import dynamic from "next/dynamic";
import { useISSPosition } from "@/hooks/use-iss";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "lucide-react"; // Wait, Badge is ui component usually. I'll stick to simple native elements or glass card.

const ISSMap = dynamic(() => import("@/components/map/ISSMap"), {
    ssr: false,
    loading: () => <Skeleton className="w-full h-100 rounded-xl" />,
});

export function HeroSection() {
    return (
        <section className="relative w-full space-y-6 py-4 sm:space-y-8 sm:py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="w-full max-w-3xl">
                    <h1 className="text-4xl font-extrabold tracking-tight text-gradient sm:text-5xl lg:text-6xl">
                        ISS Tracker Live
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                        Monitor the International Space Station in real-time as it orbits the Earth at 27,600 km/h.
                    </p>
                </div>
                <div className="flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 backdrop-blur-sm">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-mono tracking-[0.2em] text-green-400 sm:text-sm">LIVE DATA STREAM</span>
                </div>
            </div>

            <div className="relative h-[320px] w-full sm:h-[420px] lg:h-[560px]">
                <ISSMap />
            </div>
        </section>
    );
}
