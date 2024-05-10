import {SGServerStatus} from "../models/core/server.model";
import {SGConfig} from "../models/core/app.model";

export interface SGAppState {
    models: [];
    serverStatus: SGServerStatus;
    config: SGConfig;
    ui: SGAppUiState;
}

export interface SGAppUiState {
    parametersWithIconsView: boolean;
}

export function createInitialAppState(): SGAppState {
    return {
        models: [],
        serverStatus: null,
        config: null,
        ui: {
            parametersWithIconsView: false
        }
    };
}
