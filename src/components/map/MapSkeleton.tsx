import { Skeleton } from "@/components/ui/skeleton";

export function MapSkeleton() {
    return (
        <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 shadow-2xl sm:min-h-[400px]">
            <Skeleton className="absolute inset-0 rounded-xl" />
            <Skeleton className="absolute bottom-5 left-5 h-14 w-40 rounded-2xl" />
        </div>
    );
}
