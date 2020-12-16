import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common"
import { EarthquakeService } from "./earthquake.service"

@Controller("/earthquakes")
export class EarthquakeController {
    constructor(
        private readonly earthquakeService: EarthquakeService
    ) {}

    @Get("/id/:id")
    async getEarthquake(
        @Param("id") id: string,
    ): Promise<Earthquake.IEarthquake> {
        return await this.earthquakeService.findOne(id)
    }

    @Get(["/", "@all"])
    async getAllEarthquakes(
        @Query("size") size: number,
        @Query("begin") begin: number
    ): Promise<Earthquake.IEarthquake[]> {
        return await this.earthquakeService.getList(size||20,begin||0)
    }
}
