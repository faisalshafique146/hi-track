import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { MapSkeleton } from "@/components/map/MapSkeleton";

export default function Loading() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <PageTransition className="relative z-0 flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
                <div className="absolute inset-4 sm:inset-6 lg:inset-8">
                    <MapSkeleton />
                </div>
            </PageTransition>
        </div>
    );
}
