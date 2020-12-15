import * as Joi from "joi"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { AppConfigService } from "./config.service"
import { AppConfiguration } from "./configuration/app.configuration"
import { EarthquakeConfiguration } from "./configuration/earthquake.configuration"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfiguration, EarthquakeConfiguration],
            validationSchema: Joi.object({
                PORT: Joi.number()
                    .min(0)
                    .max(65535)
                    .default(8080)
                    .optional(),
                ROOT_PATH: Joi.string().optional(),
                BASE_URL: Joi.string()
                    .uri()
                    .optional(),
                EQ_MAX_CACHE: Joi.number()
                    .min(100)
                    .max(1000)
                    .default(300)
                    .optional(),
            }),
        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class AppConfigModule {}
