import {
    BadRequestException,
    CACHE_MANAGER,
    HttpService,
    Inject,
    Injectable,
} from "@nestjs/common"
import { Cache } from "cache-manager"
import { JSDOM } from "jsdom"
import { AppConfigService } from "src/config/config.service"
import { v4 as uuidV4 } from "uuid"

@Injectable()
export class EarthquakeService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: AppConfigService,
        @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
    ) {}

    private parse(html: string): Earthquake.IEarthquake[] {
        const dom = new JSDOM(html)
        const res: Earthquake.IEarthquake[] = []

        const eqRows = dom.window.document.getElementsByClassName("trIndoddrow")

        for (let i = 0; i < eqRows.length; i++) {
            const row = eqRows.item(i)
            const rowElements = row.getElementsByTagName("td")
            const uName = row.getAttribute("onclick").split("/")[1]
            res.push({
                id: uuidV4(),
                verified: rowElements.item(7).textContent === "M",
                image: `${this.configService.earthquake.baseUrl}/event/${uName}/${uName}-map.jpeg`,
                region: rowElements.item(6).textContent,
                magnitude: {
                    size: rowElements.item(1).textContent,
                    type: rowElements.item(2).textContent,
                },
                depth: rowElements.item(5).textContent,
                location: {
                    latitude: rowElements.item(3).textContent,
                    longtitude: rowElements.item(4).textContent,
                },
                occuredAt: rowElements.item(0).textContent,
            })
        }

        return res
    }

    async geEqWithUrl(url: string): Promise<Earthquake.IEarthquake[]> {
        try {
            const res = await this.httpService.get(url).toPromise()
            return this.parse(res.data)
        } catch (e) {
            throw new BadRequestException("Url not valid")
        }
    }

    async getLastEarthquake(): Promise<Earthquake.IEarthquake> {
        return await this.cacheService.get("earthquake.last")
    }

    async getList(size=20, start=0): Promise<Earthquake.IEarthquake[]> {
        const list:Earthquake.IEarthquake[] = await this.cacheService.get("earthquake.list")
        return list.slice(start,start+size)
    }

    async findOne(id: string): Promise<Earthquake.IEarthquake> {
        const earthquake: Earthquake.IEarthquake = await this.cacheService.get(
            `eq.${id}`,
        )
        if (!earthquake)
            throw new BadRequestException(`"${id}" ID not found on cache`)

        return earthquake
    }
}
