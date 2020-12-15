import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get app(): Earthquake.AppConfigProps {
        return this.configService.get("app")
    }

    get earthquake(): Earthquake.EqConfigProps {
        return this.configService.get("earthquake")
    }
}
