"use client";

import { useISSPosition } from "@/hooks/use-iss";
import { GlassCard } from "@/components/shared/GlassCard";
import { Activity, ArrowUp, Navigation, RefreshCw } from "lucide-react";

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {stats.map((stat) => (
                <GlassCard key={stat.label} className="p-4 flex flex-col items-center justify-center text-center">
                    <stat.icon className={`h-8 w-8 mb-2 ${stat.color}`} />
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                    <p className="text-xl font-bold font-mono">{stat.value}</p>
                </GlassCard>
            ))}
        </div>
    );
}
