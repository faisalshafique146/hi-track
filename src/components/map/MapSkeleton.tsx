import { Skeleton } from "@/components/ui/skeleton";

export function MapSkeleton() {
    return (
        <div className="relative h-full min-h-[320px] w-full overflow-hidden rounded-xl border border-white/10 bg-slate-950/70 shadow-2xl sm:min-h-[400px]">
            <Skeleton className="absolute inset-0 rounded-xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(56,189,248,0.10),transparent_28%),radial-gradient(circle_at_70%_38%,rgba(96,165,250,0.10),transparent_22%),radial-gradient(circle_at_48%_72%,rgba(14,165,233,0.08),transparent_24%)]" />
            <Skeleton className="absolute left-[12%] top-[18%] h-5 w-24 rounded-full" />
            <Skeleton className="absolute left-[58%] top-[26%] h-4 w-20 rounded-full" />
            <Skeleton className="absolute left-[32%] top-[48%] h-4 w-16 rounded-full" />
            <Skeleton className="absolute left-[72%] top-[62%] h-5 w-28 rounded-full" />
            <Skeleton className="absolute left-[44%] top-[36%] h-16 w-16 rounded-full" />
            <Skeleton className="absolute bottom-5 left-5 h-14 w-40 rounded-2xl" />
        </div>
    );
}
