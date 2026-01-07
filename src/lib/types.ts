export interface ISSPosition {
    name: string;
    id: number;
    latitude: number;
    longitude: number;
    altitude: number;
    velocity: number;
    visibility: string;
    footprint: number;
    timestamp: number;
    daynum: number;
    solar_lat: number;
    solar_lon: number;
    units: string;
}

export interface Astronaut {
    name: string;
    craft: string;
    country?: string; // Enhanced data might needed for flags
}

export interface AstronautsResponse {
    message: string;
    number: number;
    people: Astronaut[];
}

export interface ISSPassPromise {
    message: string;
    request: {
        altitude: number;
        datetime: number;
        latitude: number;
        longitude: number;
        passes: number;
    };
    response: {
        duration: number;
        risetime: number;
    }[];
}
