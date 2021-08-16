import { CACHE_MANAGER, Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common"
import { Cron, CronExpression } from "@nestjs/schedule"
import { Cache } from "cache-manager"
import { AppConfigService } from "src/config/config.service"
import { EarthquakeService } from "./earthquake.service"

@Injectable()
export class EarthquakeTaskService implements OnModuleInit {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheService: Cache,
        private readonly earthquakeService: EarthquakeService,
        private readonly configService: AppConfigService,
    ) {}
    private readonly logger = new Logger(EarthquakeTaskService.name)
    
    async onModuleInit(): Promise<void> {
        await this.handleEarthquake()
    }

    @Cron(CronExpression.EVERY_5_MINUTES)
    async handleEarthquake(): Promise<void> {
        this.logger.debug("Searching new earthquake")
        const lastEarthquake: Earthquake.IEarthquake = await this.earthquakeService.getLastEarthquake()
        this.logger.debug("Last Earthquake " + lastEarthquake?.occuredAt)
        if (!lastEarthquake) {
            // All of earthquake fetching
            this.logger.debug("Adding from the beginning")
            let [size, p] = [0, 0]
            do {
                const eqs = await this.earthquakeService.geEqWithUrl(
                    this.configService.earthquake.baseUrl +
                        `/events${p === 0 ? "" : p}.html`,
                )
                await this.cacheService.set("earthquake.list",eqs.reverse(),{
                    ttl: 5*60
                })
                if (size === 0 && p === 0) {
                    await this.cacheService.set("earthquake.last", eqs[0], {
                        ttl: 5 * 60,
                    })
                }
                size += eqs.length
                p++
            } while (size < this.configService.earthquake.cacheSize)
            this.logger.debug(`Searching done. ${size} earthquake data added on cache`)
            return
        }
        const eqs = await this.earthquakeService.geEqWithUrl(
            this.configService.earthquake.baseUrl + "/events.html",
        )

        const lastEqDate = new Date(lastEarthquake.occuredAt)

        let len = 0,
            c = true

        do {
            const newEqDate = new Date(eqs[len].occuredAt)
            c = newEqDate.getTime() > lastEqDate.getTime()
            len++
        } while (c)

        this.logger.debug(`Found missing ${len} earthquakes`)

        // One more statement may be add to here for validation

        for (let i = len; i > 0; i--) {
            await this.cacheService.set(
                "earthquake.list",
                [eqs[i], ...(await this.cacheService.get("earthquake.list"))],
                {
                    ttl: 5 * 60,
                },
            )
        }

        return
    }
}
