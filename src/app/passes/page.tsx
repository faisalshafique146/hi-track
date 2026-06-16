"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button"; // Correct Case
import { getISSPasses, getLocationName } from "@/app/actions"; // Server Action
import { ISSPassPromise } from "@/lib/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { MapPin, Clock, Calendar } from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

export default function PassesPage() {
    const [geoError, setGeoError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [passes, setPasses] = useState<ISSPassPromise | null>(null);
    const [locationName, setLocationName] = useState<string | null>(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setGeoError("Geolocation is not supported by your browser");
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoords({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
                setLoading(false);
            },
            (error) => {
                setGeoError(`Unable to retrieve your location: ${error.message}`);
                setLoading(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 0
            }
        );
    };

    useEffect(() => {
        if (coords) {
            setLoading(true);

            // Parallel data fetching
            Promise.all([
                getISSPasses(coords.lat, coords.lon),
                getLocationName(coords.lat, coords.lon)
            ]).then(([passesData, locName]) => {
                setPasses(passesData);
                setLocationName(locName);
                setLoading(false);
            });
        }
    }, [coords]);

    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <PageTransition className="container mx-auto flex flex-1 flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
                <h1 className="mb-6 text-center text-3xl font-bold sm:text-4xl">ISS Pass Predictions</h1>

                {!coords && (
                    <div className="w-full max-w-lg space-y-4 text-center">
                        <p className="mx-auto max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                            Allow access to your location to see when the ISS will pass overhead.
                        </p>
                        <Button
                            onClick={getLocation}
                            disabled={loading}
                            size="lg"
                            className="cursor-pointer bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 hover:from-blue-700 hover:via-cyan-600 hover:to-teal-500 text-white shadow-lg shadow-cyan-500/25 active:scale-95 transition-all duration-300 font-bold tracking-wide rounded-full px-8 h-12 border-none"
                        >
                            {loading ? "Locating..." : "Find My Location"}
                            <MapPin className="ml-2 h-5 w-5 animate-bounce" />
                        </Button>
                        {geoError && <p className="text-destructive mt-2">{geoError}</p>}
                    </div>
                )}

                {coords && passes && (
                    <div className="mt-8 w-full max-w-3xl space-y-4">
                        <div className="mb-4 text-center text-sm text-muted-foreground">
                            Prediction for <span className="font-mono text-primary">
                                {locationName ? locationName : `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}`}
                            </span>
                        </div>
                        {passes.response.map((pass, idx) => (
                            <GlassCard key={idx} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="rounded text-primary bg-primary/20 p-2">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-semibold">{new Date(pass.risetime * 1000).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground sm:text-sm">{new Date(pass.risetime * 1000).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-left sm:justify-end sm:border-t-0 sm:pt-0 sm:text-right">
                                    <div>
                                        <p className="text-lg font-semibold">{Math.floor(pass.duration / 60)}m {pass.duration % 60}s</p>
                                        <p className="text-xs text-muted-foreground">Duration</p>
                                    </div>
                                    <Clock className="h-5 w-5 shrink-0 text-muted-foreground" />
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}

                {coords && loading && <p className="mt-8 animate-pulse text-center">Calculating orbital passes...</p>}

            </PageTransition>
            <Footer />
        </div>
    );
}
