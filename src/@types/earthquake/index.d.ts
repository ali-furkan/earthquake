import express from "express"

export {}

declare global {
    namespace Earthquake {
        interface AppConfigProps {
            port: number
            rootPath: string
        }
        interface EqConfigProps {
            baseUrl: string
            cacheSize: number
        }
        interface Request extends express.Request {
            [prop: string]: unknown
        }
        interface IRequest {
            id: string
            [prop: string]: unknown
        }
        interface Response extends express.Response {
            message?: string
            [prop: string]: unknown
        }
        interface IEarthquake {
            id: string
            verified: boolean
            image: string
            region: string
            magnitude: {
                size: string
                type: string
            }
            depth: string
            location: {
                latitude: string
                longtitude: string
            }
            occuredAt: string
        }
    }
}
