"use client";

import useSWR from "swr";
import { ISSPosition } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useISSPosition() {
    const { data, error, isLoading } = useSWR<ISSPosition>(
        process.env.NEXT_PUBLIC_ISS_API_URL,
        fetcher,
        {
            refreshInterval: 3000,
            revalidateOnFocus: false,
        }
    );

    return {
        position: data,
        isLoading,
        isError: error,
    };
}
