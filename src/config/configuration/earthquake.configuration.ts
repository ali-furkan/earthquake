import { registerAs } from "@nestjs/config"

export const EarthquakeConfiguration = registerAs("earthquake", () => ({
    baseUrl: "http://sc3.koeri.boun.edu.tr/eqevents",
    cacheSize: parseInt(process.env.EQ_MAX_CACHE) || 300,
}))
