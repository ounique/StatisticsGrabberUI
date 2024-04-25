import {SGMockServerConfig} from "./server";

export const SG_MOCK_SERVER_CONFIG: SGMockServerConfig = {
    port: 3000,
    allowedHeaders: [
        "Access-Control-Allow-Headers",
        "Origin",
        "Accept",
        "Content-Type",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
        "Authorization"
    ]
};
