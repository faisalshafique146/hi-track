"use server";

import { AstronautsResponse, ISSPassPromise } from "@/lib/types";
import * as satellite from "satellite.js";

export async function getAstronauts(): Promise<AstronautsResponse> {
    // Using open-notify http API via server to avoid mixed content
    try {
        const res = await fetch(process.env.NEXT_PUBLIC_ASTROS_API_URL!, {
            next: { revalidate: 3600 }, // Cache for 1 hour
        });
        if (!res.ok) throw new Error("Failed to fetch astronauts");
        return res.json();
    } catch (error) {
        console.error("Error fetching astronauts:", error);
        return { message: "error", number: 0, people: [] };
    }
}

export async function getISSPasses(lat: number, lon: number): Promise<ISSPassPromise | null> {
    try {
        // 1. Fetch latest TLE data from CelesTrak
        const tleRes = await fetch(process.env.NEXT_PUBLIC_CELESTRAK_TLE_URL!, {
            next: { revalidate: 3600 } // Cache TLE for 1 hour
        });

        if (!tleRes.ok) throw new Error("Failed to fetch TLE data");
        const tleData = await tleRes.text();
        const lines = tleData.trim().split('\n');

        let tleLine1 = "";
        let tleLine2 = "";

        if (lines.length >= 3) {
            tleLine1 = lines[1].trim();
            tleLine2 = lines[2].trim();
        } else if (lines.length === 2) {
            tleLine1 = lines[0].trim();
            tleLine2 = lines[1].trim();
        } else {
            throw new Error("Invalid TLE format received");
        }

        const satRec = satellite.twoline2satrec(tleLine1, tleLine2);

        // 2. Calculate passes for the next 24 hours
        const passes: { duration: number; risetime: number }[] = [];
        const simulationStart = new Date();
        const simulationEnd = new Date(simulationStart.getTime() + 24 * 60 * 60 * 1000); // 24 hours
        const timeStep = 30 * 1000; // 30 seconds step

        let currentTime = new Date(simulationStart.getTime());
        let currentPass: { startTime: number | null, maxElevation: number } | null = null;

        const observerGd = {
            latitude: satellite.degreesToRadians(lat),
            longitude: satellite.degreesToRadians(lon),
            height: 0
        };

        while (currentTime < simulationEnd) {
            const positionAndVelocity = satellite.propagate(satRec, currentTime);
            const gmst = satellite.gstime(currentTime);

            if (positionAndVelocity && positionAndVelocity.position && typeof positionAndVelocity.position !== 'boolean') {
                const positionEcf = satellite.eciToEcf(positionAndVelocity.position as satellite.EciVec3<number>, gmst);
                const lookAngles = satellite.ecfToLookAngles(observerGd, positionEcf);

                // elevation is in radians
                const elevationDeg = satellite.radiansToDegrees(lookAngles.elevation);

                if (elevationDeg > 10) {
                    if (!currentPass) {
                        // Start of a pass
                        currentPass = { startTime: currentTime.getTime(), maxElevation: elevationDeg };
                    } else {
                        // ongoing pass
                        if (elevationDeg > currentPass.maxElevation) {
                            currentPass.maxElevation = elevationDeg;
                        }
                    }
                } else {
                    if (currentPass && currentPass.startTime) {
                        // End of a pass
                        const duration = (currentTime.getTime() - currentPass.startTime) / 1000;
                        passes.push({
                            risetime: Math.floor(currentPass.startTime / 1000),
                            duration: Math.floor(duration)
                        });
                        currentPass = null;
                    }
                }
            }

            currentTime = new Date(currentTime.getTime() + timeStep);
        }

        return {
            message: "success",
            request: {
                altitude: 0,
                datetime: Math.floor(Date.now() / 1000),
                latitude: lat,
                longitude: lon,
                passes: passes.length
            },
            response: passes
        };

    } catch (error) {
        console.error("Error calculating passes:", error);
        return null;
    }
}

export async function getLocationName(lat: number, lon: number): Promise<string | null> {
    try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`, {
            headers: {
                'User-Agent': 'Hi-Track-ISS-Tracker/1.0'
            },
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!res.ok) return null;

        const data = await res.json();

        // Try to get the most relevant name
        const address = data.address;
        if (!address) return null;

        const city = address.city || address.town || address.village || address.hamlet;
        const state = address.state || address.region;
        const country = address.country;

        const parts = [city, state, country].filter(Boolean);
        return parts.length > 0 ? parts.join(", ") : null;
    } catch (error) {
        console.error("Error fetching location name:", error);
        return null;
    }
}
