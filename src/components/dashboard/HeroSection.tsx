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
    const { position } = useISSPosition();

    return (
        <section className="relative w-full py-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div className="w-full">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gradient">
                        ISS Tracker Live
                    </h1>
                    <p className="text-muted-foreground mt-2 max-w-lg">
                        Monitor the International Space Station in real-time as it orbits the Earth at 27,600 km/h.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-mono text-green-400">LIVE DATA STREAM</span>
                </div>
            </div>

            <div className="h-125 w-full relative group">
                <ISSMap />
            </div>
        </section>
    );
}
