import express, {RequestHandler} from "express";
import {SG_MOCK_ROUTER_VAR} from "./controller.decorator";
import {SGMockServerConfig} from "../server";

type SGMockController = { new(...args: any[]): any };

export type SGMockApplicationConfig = Readonly<{
    controllers: SGMockController[];
    serverConfig: SGMockServerConfig;
    middleWares: RequestHandler[];
}>;

function createController<T>(controller: SGMockController, ...args: any[]): T {
    return new controller(...args);
}

export function SGMockApplication(config: SGMockApplicationConfig) {
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    return function <T extends { new(...args: any[]): any; }>(constr: T) {
        return class extends constr {
            private app = express();

            constructor(...args: any[]) {
                super(...args);

                this.registerMiddleware(config.middleWares);
                this.registerControllers(config.controllers);
                this.listen();
            }

            private listen(): void {
                this.app.listen(config.serverConfig.port, (): void => {
                    console.log(`Fake API server is listening on port: ${config.serverConfig.port}`);
                });
            }

            private registerMiddleware(middleWares: RequestHandler[]): void {
                middleWares.forEach((middleWare: RequestHandler) => {
                    this.app.use(middleWare);
                });
            }

            private registerControllers(controllers: SGMockController[]): void {
                controllers.forEach((controller: SGMockController) => {
                    this.app.use(createController(controller, this.stateConfigurator)[SG_MOCK_ROUTER_VAR]);
                });
            }
        };
    };
}
