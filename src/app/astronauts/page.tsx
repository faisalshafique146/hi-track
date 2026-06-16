import { getAstronauts } from "@/app/actions";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GlassCard } from "@/components/shared/GlassCard";
import { User, Rocket } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

// Server Component
export default async function AstronautsPage() {
    const data = await getAstronauts();

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <PageTransition className="container mx-auto flex-1 px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-3xl font-bold sm:text-4xl">Humans in Space ({data.number})</h1>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
                    {data.people.map((person, i) => (
                        <GlassCard key={`${person.name}-${i}`} className="flex items-start gap-4 p-5 sm:p-6">
                            <div className="rounded-full bg-primary/20 p-3">
                                <User className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg font-semibold sm:text-xl">{person.name}</h3>
                                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                                    <Rocket className="h-4 w-4" />
                                    <span className="text-sm break-words">{person.craft}</span>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                {data.people.length === 0 && (
                    <p className="text-muted-foreground">Unable to load astronaut data at this time.</p>
                )}
            </PageTransition>
            <Footer />
        </div>
    );
}
