import {NextFunction, Request, RequestHandler, Response} from "express";
import {SG_MOCK_SERVER_CONFIG} from "../server.config";

export const allowCrossDomain: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,POST,DELETE");
    response.header("Access-Control-Allow-Headers", SG_MOCK_SERVER_CONFIG.allowedHeaders.join(","));
    response.header("Access-Control-Allow-Credentials", "true");
    next();
};

export const loggingMiddleware: RequestHandler = (request: Request, response: Response, next: NextFunction) => {
    console.log(`${request.method} Request to: ${request.url}`);
    next();
};
