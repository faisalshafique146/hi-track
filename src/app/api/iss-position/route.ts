import { NextResponse } from "next/server";
import * as satellite from "satellite.js";

export async function GET() {
    try {
        const celestrakTleUrl =
            process.env.CELESTRAK_TLE_URL ??
            process.env.NEXT_PUBLIC_CELESTRAK_TLE_URL ??
            "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE";

        // Fetch latest TLE data from CelesTrak. Next.js caches this fetch for 1 hour.
        const tleRes = await fetch(celestrakTleUrl, {
            next: { revalidate: 3600 },
        });

        if (!tleRes.ok) {
            throw new Error("Failed to fetch TLE data");
        }

        const tleData = await tleRes.text();
        const lines = tleData.trim().split("\n");

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

        // Initialize satellite record
        const satRec = satellite.twoline2satrec(tleLine1, tleLine2);
        const now = new Date();
        const positionAndVelocity = satellite.propagate(satRec, now);
        const gmst = satellite.gstime(now);

        if (
            !positionAndVelocity ||
            !positionAndVelocity.position ||
            !positionAndVelocity.velocity ||
            typeof positionAndVelocity.position === "boolean" ||
            typeof positionAndVelocity.velocity === "boolean"
        ) {
            throw new Error("Could not propagate satellite position");
        }

        const positionEci = positionAndVelocity.position;
        const velocityEci = positionAndVelocity.velocity;

        // Convert ECI to Geodetic coordinates
        const positionGd = satellite.eciToGeodetic(positionEci, gmst);
        const latitude = satellite.radiansToDegrees(positionGd.latitude);
        const longitude = satellite.radiansToDegrees(positionGd.longitude);
        const altitude = positionGd.height; // in km

        // Calculate velocity in km/h (velocity components in satellite.js are in km/s)
        const vx = velocityEci.x;
        const vy = velocityEci.y;
        const vz = velocityEci.z;
        const velocityKmS = Math.sqrt(vx * vx + vy * vy + vz * vz);
        const velocity = velocityKmS * 3600; // km/h

        // Format output to match wheretheiss.at API structure
        return NextResponse.json({
            name: "iss",
            id: 25544,
            latitude,
            longitude,
            altitude,
            velocity,
            visibility: "daylight",
            footprint: 0,
            timestamp: Math.floor(now.getTime() / 1000),
            daynum: 0,
            solar_lat: 0,
            solar_lon: 0,
            units: "kilometers",
        });
    } catch (error: any) {
        console.error("Error calculating live ISS position:", error);
        return NextResponse.json(
            { error: error.message || "Failed to calculate ISS position" },
            { status: 500 }
        );
    }
}
