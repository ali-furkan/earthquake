import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import * as helmet from "helmet"
import * as rateLimit from "express-rate-limit"
import { AppModule } from "./app.module"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.enableCors()
    app.use(helmet())
    app.use(rateLimit({
        windowMs: 5*60*1000,
        max: 100
    }))

    app.setGlobalPrefix(process.env.ROOT_PATH || "/")
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    )

    await app.listen(process.env.PORT || 3000)
}
bootstrap()
