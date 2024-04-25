import {SGMockApplication} from "./decorators/app.decorator";
import {SG_MOCK_SERVER_CONFIG} from "./server.config";
import * as bodyParser from "body-parser";
import {allowCrossDomain, loggingMiddleware} from "./middleware/middleware";
import {SGMainController} from "./controllers/main.controller";

export type SGMockServerConfig = Readonly<{
    port: number;
    allowedHeaders: string[];
}>;

@SGMockApplication({
    controllers: [
        SGMainController
    ],
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({
            limit: "50mb",
            extended: true
        }),
        allowCrossDomain,
        loggingMiddleware
    ],
    serverConfig: SG_MOCK_SERVER_CONFIG
})
export class SGMockServer {
}
