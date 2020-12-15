import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { EarthquakeModule } from "./earthquake/earthquake.module"

@Module({
    imports: [EarthquakeModule, ConfigModule],
})
export class AppModule {}
