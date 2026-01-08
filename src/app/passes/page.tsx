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
            <PageTransition className="flex-1 container py-8 px-4 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-center">ISS Pass Predictions</h1>

                {!coords && (
                    <div className="text-center space-y-4">
                        <p className="text-muted-foreground max-w-md">
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
                    <div className="w-full max-w-2xl mt-8 space-y-4">
                        <div className="text-sm text-muted-foreground text-center mb-4">
                            Prediction for <span className="font-mono text-primary">
                                {locationName ? locationName : `${coords.lat.toFixed(4)}, ${coords.lon.toFixed(4)}`}
                            </span>
                        </div>
                        {passes.response.map((pass, idx) => (
                            <GlassCard key={idx} className="p-4 flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="bg-primary/20 p-2 rounded text-primary">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{new Date(pass.risetime * 1000).toLocaleDateString()}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(pass.risetime * 1000).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-right">
                                    <div>
                                        <p className="font-semibold text-lg">{Math.floor(pass.duration / 60)}m {pass.duration % 60}s</p>
                                        <p className="text-xs text-muted-foreground">Duration</p>
                                    </div>
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                </div>
                            </GlassCard>
                        ))}
                    </div>
                )}

                {coords && loading && <p className="animate-pulse mt-8">Calculating orbital passes...</p>}

            </PageTransition>
            <Footer />
        </div>
    );
}
