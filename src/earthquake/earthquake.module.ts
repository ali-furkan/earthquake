import { CacheModule, HttpModule, Module } from "@nestjs/common"
import { ScheduleModule } from "@nestjs/schedule"
import { AppConfigModule } from "src/config/config.module"
import { EarthquakeTaskService } from "./earthquake-task.service"
import { EarthquakeController } from "./earthquake.controller"
import { EarthquakeService } from "./earthquake.service"

@Module({
    imports: [
        AppConfigModule,
        CacheModule.register(),
        HttpModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [EarthquakeController],
    providers: [EarthquakeService, EarthquakeTaskService],
})
export class EarthquakeModule {}
