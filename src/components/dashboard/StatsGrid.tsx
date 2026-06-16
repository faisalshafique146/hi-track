"use client";

import { useISSPosition } from "@/hooks/use-iss";
import { GlassCard } from "@/components/shared/GlassCard";
import { Activity, ArrowUp, Navigation } from "lucide-react";

export function StatsGrid() {
    const { position } = useISSPosition();

    if (!position) return null;

    const stats = [
        {
            label: "Altitude",
            value: `${position.altitude.toFixed(2)} km`,
            icon: ArrowUp,
            color: "text-cyan-400",
        },
        {
            label: "Velocity",
            value: `${position.velocity.toFixed(2)} km/h`,
            icon: Activity,
            color: "text-fuchsia-400",
        },
        {
            label: "Latitude",
            value: position.latitude.toFixed(4),
            icon: Navigation,
            color: "text-violet-400",
        },
        {
            label: "Longitude",
            value: position.longitude.toFixed(4),
            icon: Navigation,
            color: "text-amber-400",
        },
    ];

    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
                <GlassCard key={stat.label} className="flex min-h-32 flex-col items-center justify-center p-5 text-center sm:min-h-36">
                    <stat.icon className={`mb-3 h-8 w-8 ${stat.color}`} />
                    <p className="text-[11px] uppercase tracking-[0.24em] text-muted-foreground sm:text-xs">{stat.label}</p>
                    <p className="mt-2 break-words text-lg font-bold font-mono sm:text-xl">{stat.value}</p>
                </GlassCard>
            ))}
        </div>
    );
}
