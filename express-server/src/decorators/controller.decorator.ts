import {Request, Response, Router} from "express";

export enum SGMockControllerMethod {
    GET = "get",
    POST = "post",
    PUT = "put",
    PATCH = "patch",
    DELETE = "delete"
}

export type SGMockControllerConfig = Readonly<{
    path: string;
}>;

export type SGMockRequestConfig = Readonly<{
    path: string;
    method?: SGMockControllerMethod;
    handleFile?: boolean;
}>;

export const SG_MOCK_ROUTER_VAR: unique symbol = Symbol("__sgMockRouter");

type SGMockRouterMethodMapping = Record<SGMockControllerMethod, (path: string, handler: SGMockRouterMethod) => any>;

type SGMockRouterMethod = (request: Request, response: Response) => void;

const SG_MOCK_CONTROLLER_URL_VAR: unique symbol = Symbol("__sgMockControllerUrl");

const SG_MOCK_ROUTER_METHOD_MAPPING_VAR: unique symbol = Symbol("__sgMockRouterMethodMapping");

const SG_MOCK_REQUEST_DECORATOR_APPLIED_SYMBOL: unique symbol = Symbol("__sgMockRouterRequestDecoratorApplied");

export function SGMockController(config: SGMockControllerConfig) {
    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/explicit-function-return-type,@typescript-eslint/explicit-module-boundary-types
    return function <T extends { new(...args: any[]): {} }>(constr: T) {
        return class extends constr {
            public [SG_MOCK_ROUTER_VAR] = Router();

            private [SG_MOCK_CONTROLLER_URL_VAR]: string = config.path;

            private [SG_MOCK_ROUTER_METHOD_MAPPING_VAR]: SGMockRouterMethodMapping;

            constructor(...args: any[]) {
                super(...args);

                this.initRouterMapping();
                this.initRouterNavigation();
            }

            private initRouterMapping(): void {
                this[SG_MOCK_ROUTER_METHOD_MAPPING_VAR] = {
                    [SGMockControllerMethod.GET]: (path: string, handler: SGMockRouterMethod): any => this[SG_MOCK_ROUTER_VAR].get(path, handler),
                    [SGMockControllerMethod.POST]: (path: string, handler: SGMockRouterMethod): any => this[SG_MOCK_ROUTER_VAR].post(path, handler),
                    [SGMockControllerMethod.PUT]: (path: string, handler: SGMockRouterMethod): any => this[SG_MOCK_ROUTER_VAR].put(path, handler),
                    [SGMockControllerMethod.PATCH]: (path: string, handler: SGMockRouterMethod): any => this[SG_MOCK_ROUTER_VAR].patch(path, handler),
                    [SGMockControllerMethod.DELETE]: (path: string, handler: SGMockRouterMethod): any => this[SG_MOCK_ROUTER_VAR].delete(path, handler)
                };
            }

            private initRouterNavigation(): void {
                Object.getOwnPropertyNames(constr.prototype)
                    .filter((fn: string) => constr.prototype[fn][SG_MOCK_REQUEST_DECORATOR_APPLIED_SYMBOL])
                    .forEach((fn: string) => {
                        const config: SGMockRequestConfig = constr.prototype[fn][SG_MOCK_REQUEST_DECORATOR_APPLIED_SYMBOL];

                        this[SG_MOCK_ROUTER_METHOD_MAPPING_VAR][config.method](
                            `${this[SG_MOCK_CONTROLLER_URL_VAR]}${config.path}`,
                            (request: Request, response: Response) => this[fn](request, response)
                        );
                    });
            }
        };
    };
}

export function SGMockRequest<T>(config: SGMockRequestConfig) {
    return (
        target: T,
        methodName: string,
        descriptor: TypedPropertyDescriptor<SGMockRouterMethod>
    ): TypedPropertyDescriptor<SGMockRouterMethod> => {
        descriptor.value[SG_MOCK_REQUEST_DECORATOR_APPLIED_SYMBOL] = {
            ...config,
            method: config.method || SGMockControllerMethod.GET
        };
        return descriptor;
    };
}
