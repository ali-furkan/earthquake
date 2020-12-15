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
        @Query("size",new ParseIntPipe()) size: number,
        @Query("begin",new ParseIntPipe()) begin: number
    ): Promise<Earthquake.IEarthquake[]> {
        return await this.earthquakeService.getList(size,begin)
    }
}
