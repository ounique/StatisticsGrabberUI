import {SGServerStatus} from "../models/core/server.model";
import {SGConfig} from "../models/core/app.model";

export interface SGAppState {
    models: [];
    timeout: number; // waiting time in 'ms'
    serverStatus: SGServerStatus;
    config: SGConfig;
}

export function createInitialAppState(): SGAppState {
    return {
        models: [],
        timeout: 500,
        serverStatus: null,
        config: null
    };
}
