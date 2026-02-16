"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { useISSPosition } from "@/hooks/use-iss";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";

// Function to update map center smoothly
function MapController({ coords }: { coords: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, map.getZoom(), { duration: 1.5 });
  }, [coords, map]);
  return null;
}

// Custom Glowing Icon for ISS
const issIcon = new L.DivIcon({
  className: "bg-transparent",
  html: `<div class="relative flex items-center justify-center w-12 h-12">
            <div class="absolute w-full h-full bg-blue-500/50 rounded-full animate-ping"></div>
            <div class="relative w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-white"><path d="M12 2a10 10 0 1 0 10 10 4 10 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="m9 12 3 3 3-3"></path></svg>
            </div>
         </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
  popupAnchor: [0, -24],
});

export default function ISSMap() {
  const { position, isLoading, isError } = useISSPosition();
  const [trail, setTrail] = useState<[number, number][]>([]);

  useEffect(() => {
    if (position) {
      const newCoord: [number, number] = [
        position.latitude,
        position.longitude,
      ];
      setTrail((prev) => {
        const newTrail = [...prev, newCoord];
        // Keep last 100 points
        if (newTrail.length > 100) return newTrail.slice(-100);
        return newTrail;
      });
    }
  }, [position]);

  if (isLoading && !position) {
    return <Skeleton className="w-full h-[400px] rounded-xl" />;
  }

  if (isError || !position) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-muted text-muted-foreground rounded-xl">
        Error loading map data
      </div>
    );
  }

  const center: [number, number] = [position.latitude, position.longitude];

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden shadow-2xl border border-white/10 z-0">
      <MapContainer
        center={center}
        zoom={3}
        scrollWheelZoom={true}
        className="w-full h-full min-h-[400px]"
        style={{ background: "#0a0a0a" }}
      >
        <TileLayer
          attribution='Hi-track'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        <Marker position={center} icon={issIcon}>
          <Popup>
            <div className="text-black">
              <h3 className="font-bold">ISS Location</h3>
              <p>Alt: {position.altitude.toFixed(2)} km</p>
              <p>Vel: {position.velocity.toFixed(2)} km/h</p>
            </div>
          </Popup>
        </Marker>
        <Polyline
          positions={trail}
          pathOptions={{ color: "#3b82f6", weight: 2, opacity: 0.6 }}
        />
        <MapController coords={center} />
      </MapContainer>
    </div>
  );
}
