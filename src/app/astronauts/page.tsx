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
            <PageTransition className="flex-1 container py-8 px-4">
                <h1 className="text-3xl font-bold mb-6">Humans in Space ({data.number})</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.people.map((person, i) => (
                        <GlassCard key={`${person.name}-${i}`} className="p-6 flex items-start gap-4">
                            <div className="bg-primary/20 p-3 rounded-full">
                                <User className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold">{person.name}</h3>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <Rocket className="h-4 w-4" />
                                    <span className="text-sm">{person.craft}</span>
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
