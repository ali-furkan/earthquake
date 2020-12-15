import { registerAs } from "@nestjs/config"

export const AppConfiguration = registerAs("app", () => ({
    port: process.env.PORT,
    rootPath: process.env.ROOT_PATH,
}))
