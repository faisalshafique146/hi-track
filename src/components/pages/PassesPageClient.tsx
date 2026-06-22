"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { getISSPasses, getLocationName } from "@/app/actions";
import { ISSPassPromise } from "@/lib/types";
import { GlassCard } from "@/components/shared/GlassCard";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Calendar,
  Clock3,
  MapPin,
  Orbit,
  Radar,
  Sparkles,
} from "lucide-react";
import { PageTransition } from "@/components/layout/PageTransition";

type Coordinates = { lat: number; lon: number };

export function PassesPageClient() {
  const [geoError, setGeoError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<Coordinates | null>(null);
  const [passes, setPasses] = useState<ISSPassPromise | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setGeoError("Geolocation is not supported by your browser.");
      return;
    }

    setGeoError(null);
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
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    if (!coords) return;

    setLoading(true);

    Promise.all([
      getISSPasses(coords.lat, coords.lon),
      getLocationName(coords.lat, coords.lon),
    ])
      .then(([passesData, locName]) => {
        setPasses(passesData);
        setLocationName(locName);
      })
      .catch(() => {
        setPasses(null);
        setLocationName(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [coords]);

  const totalPasses = passes?.response.length ?? 0;
  const nextPass = passes?.response[0] ?? null;
  const longestPass =
    passes?.response.reduce((longest, current) =>
      current.duration > longest.duration ? current : longest
    ) ?? null;

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <Header />
      <PageTransition className="container mx-auto flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-[28px] border border-cyan-400/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.20),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(59,130,246,0.16),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.92),rgba(8,15,33,0.88))] p-6 shadow-[0_20px_80px_rgba(8,145,178,0.16)] sm:p-8 lg:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.04),transparent)]" />
          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-center">
            <div className="space-y-5">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-cyan-200">
                <Radar className="h-3.5 w-3.5" />
                Orbital Visibility Window
              </div>
              <div className="space-y-3">
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                  ISS Pass Predictions
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                  Find upcoming opportunities to spot the station overhead, with pass timing tuned to
                  your live location.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Button
                  onClick={getLocation}
                  disabled={loading}
                  size="lg"
                  className="h-12 rounded-full border-none bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-500 px-7 font-semibold text-slate-950 shadow-[0_12px_30px_rgba(34,211,238,0.35)] transition-transform duration-300 hover:scale-[1.02] hover:from-sky-400 hover:via-cyan-300 hover:to-blue-400"
                >
                  {loading ? "Syncing Location..." : coords ? "Refresh Predictions" : "Use My Location"}
                  <MapPin className="ml-2 h-4 w-4 animate-bounce" />
                </Button>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
                  <Sparkles className="h-4 w-4 text-cyan-300" />
                  Best results come from an accurate GPS fix.
                </div>
              </div>

              {geoError && (
                <p className="max-w-xl rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {geoError}
                </p>
              )}
            </div>

            <GlassCard className="rounded-[24px] border-cyan-400/15 bg-black/25 p-5 sm:p-6">
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Tracking Zone</p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {locationName ??
                        (coords
                          ? `${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)}`
                          : "Waiting for location")}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-3 text-cyan-200">
                    <Orbit className="h-5 w-5" />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {loading && coords ? (
                    <>
                      <MetricCardSkeleton />
                      <MetricCardSkeleton />
                      <MetricCardSkeleton />
                    </>
                  ) : (
                    <>
                      <MetricCard
                        label="Next rise"
                        value={nextPass ? formatTime(nextPass.risetime) : "--"}
                      />
                      <MetricCard
                        label="Pass count"
                        value={passes ? String(totalPasses) : "--"}
                      />
                      <MetricCard
                        label="Longest pass"
                        value={longestPass ? formatDuration(longestPass.duration) : "--"}
                      />
                    </>
                  )}
                </div>

                <p className="text-sm leading-6 text-slate-400">
                  Predictions cover the next 24 hours and are based on your current coordinates.
                </p>
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)]">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-bold text-white">Upcoming Passes</h2>
                <p className="text-sm text-slate-400">
                  Clean, time-first predictions for your next visible ISS windows.
                </p>
              </div>
              {passes && (
                <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.24em] text-slate-300">
                  {totalPasses} results
                </div>
              )}
            </div>

            {loading && coords && (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <GlassCard key={index} className="rounded-[24px] p-5 sm:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex items-start gap-4">
                        <Skeleton className="h-12 w-12 rounded-2xl" />
                        <div className="space-y-3">
                          <Skeleton className="h-5 w-20 rounded-full" />
                          <Skeleton className="h-8 w-36" />
                          <Skeleton className="h-4 w-52" />
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
            )}

            {!loading && passes && totalPasses > 0 && (
              <div className="space-y-4">
                {passes.response.map((pass, idx) => {
                  const date = new Date(pass.risetime * 1000);

                  return (
                    <GlassCard
                      key={`${pass.risetime}-${idx}`}
                      className="group rounded-[24px] border-white/10 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 sm:p-6"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/25 to-blue-500/20 text-cyan-200 shadow-[0_10px_24px_rgba(34,211,238,0.15)]">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-cyan-200">
                                Pass {idx + 1}
                              </span>
                              <span className="text-xs uppercase tracking-[0.22em] text-slate-500">
                                Local time
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                              {formatTime(pass.risetime)}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
                              <span>{date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span>
                              <span className="hidden h-1 w-1 rounded-full bg-slate-600 sm:block" />
                              <span>{date.toLocaleDateString(undefined, { year: "numeric" })}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2 lg:min-w-[320px]">
                          <DetailTile
                            icon={<Clock3 className="h-4 w-4" />}
                            label="Duration"
                            value={formatDuration(pass.duration)}
                          />
                          <DetailTile
                            icon={<Sparkles className="h-4 w-4" />}
                            label="Visibility"
                            value={pass.duration >= 360 ? "Excellent" : pass.duration >= 240 ? "Strong" : "Brief"}
                          />
                        </div>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>
            )}

            {!loading && coords && (!passes || totalPasses === 0) && (
              <GlassCard className="rounded-[24px] p-6 sm:p-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">No predicted passes found</h3>
                  <p className="max-w-2xl text-sm leading-6 text-slate-400">
                    We could not find visible passes in the next prediction window for your current location.
                    Try again shortly or refresh after moving to a clearer horizon.
                  </p>
                </div>
              </GlassCard>
            )}

            {!coords && !loading && (
              <GlassCard className="rounded-[24px] p-6 sm:p-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white">Start with your location</h3>
                  <p className="max-w-2xl text-sm leading-6 text-slate-400">
                    Share your location and we&apos;ll build a pass timeline tuned to the sky above you.
                  </p>
                </div>
              </GlassCard>
            )}
          </div>

          <aside className="space-y-4">
            <GlassCard className="rounded-[24px] p-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">How to read this</p>
                <div className="space-y-3 text-sm leading-6 text-slate-300">
                  <p>The listed time is when the ISS rises into view for your area.</p>
                  <p>Longer passes usually mean more time to spot it before it dips below the horizon.</p>
                  <p>Best visibility typically happens in dark skies with a clear western or eastern horizon.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="rounded-[24px] p-5 sm:p-6">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Live coordinates</p>
                <div className="grid gap-3">
                  <MetricCard
                    label="Latitude"
                    value={coords ? coords.lat.toFixed(4) : "--"}
                  />
                  <MetricCard
                    label="Longitude"
                    value={coords ? coords.lon.toFixed(4) : "--"}
                  />
                </div>
              </div>
            </GlassCard>
          </aside>
        </section>
      </PageTransition>
      <Footer />
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <Skeleton className="h-3 w-20" />
      <Skeleton className="mt-3 h-7 w-24" />
    </div>
  );
}

function DetailTile({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center gap-2 text-cyan-200">
        {icon}
        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400">{label}</span>
      </div>
      <p className="mt-3 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function formatTime(timestampSeconds: number) {
  return new Date(timestampSeconds * 1000).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function formatDuration(durationSeconds: number) {
  const minutes = Math.floor(durationSeconds / 60);
  const seconds = durationSeconds % 60;

  if (minutes === 0) {
    return `${seconds}s`;
  }

  return `${minutes}m ${seconds}s`;
}
