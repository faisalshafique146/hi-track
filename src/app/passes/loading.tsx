import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { GlassCard } from "@/components/shared/GlassCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <PageTransition className="container mx-auto flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
                <section className="rounded-[28px] border border-cyan-400/15 p-6 sm:p-8 lg:p-10">
                    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
                        <div className="space-y-5">
                            <Skeleton className="h-6 w-44 rounded-full" />
                            <Skeleton className="h-12 w-72 sm:h-14 sm:w-96" />
                            <Skeleton className="h-5 w-full max-w-2xl" />
                            <Skeleton className="h-5 w-3/4 max-w-xl" />
                            <Skeleton className="h-12 w-48 rounded-full" />
                        </div>
                        <GlassCard className="rounded-[24px] p-5 sm:p-6">
                            <div className="space-y-5">
                                <Skeleton className="h-6 w-40" />
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                    {Array.from({ length: 3 }).map((_, index) => (
                                        <Skeleton key={index} className="h-24 rounded-2xl" />
                                    ))}
                                </div>
                                <Skeleton className="h-5 w-full" />
                            </div>
                        </GlassCard>
                    </div>
                </section>

                <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)]">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-48" />
                            <Skeleton className="h-4 w-72" />
                        </div>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <GlassCard key={index} className="rounded-[24px] p-5 sm:p-6">
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex items-start gap-4">
                                        <Skeleton className="h-12 w-12 rounded-2xl" />
                                        <div className="space-y-3">
                                            <Skeleton className="h-5 w-20 rounded-full" />
                                            <Skeleton className="h-8 w-32" />
                                            <Skeleton className="h-4 w-48" />
                                        </div>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                                        <Skeleton className="h-24 rounded-2xl" />
                                        <Skeleton className="h-24 rounded-2xl" />
                                    </div>
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <GlassCard className="rounded-[24px] p-5 sm:p-6">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                            </div>
                        </GlassCard>
                        <GlassCard className="rounded-[24px] p-5 sm:p-6">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-20 rounded-2xl" />
                                <Skeleton className="h-20 rounded-2xl" />
                            </div>
                        </GlassCard>
                    </div>
                </section>
            </PageTransition>
            <Footer />
        </div>
    );
}
