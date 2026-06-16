import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/shared/GlassCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <PageTransition className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <Skeleton className="mb-6 h-10 w-64 sm:h-12 sm:w-80" />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <GlassCard key={index} className="flex items-start gap-4 p-5 sm:p-6">
                            <Skeleton className="h-11 w-11 rounded-full sm:h-12 sm:w-12" />
                            <div className="min-w-0 flex-1 space-y-3">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </PageTransition>
            <Footer />
        </div>
    );
}
