import {Injectable} from "@angular/core";
import {SGAppStore} from "./app.store";
import {UpdateStateCallback} from "@datorama/akita";
import {SGAppState, SGAppUiState} from "./app.state";
import {SGConfig} from "../models/core/app.model";
import {SGServerApplicationStatus, SGServerStatus} from "../models/core/server.model";

@Injectable({
    providedIn: "root"
})
export class SGAppService {
    constructor(private store: SGAppStore) {
    }

    public updateTimeout(value: number): void {
        this.updateState((state) => {
            return {
                config: {
                    ...state.config,
                    defaultTimeout: value
                }
            };
        });
    }

    public updateParametersView(parametersWithIconsView: boolean): void {
        this.updateUiState(() => {
            return {
                parametersWithIconsView: parametersWithIconsView
            };
        });
    }

    public updateConfig(config: SGConfig): void {
        this.updateState(() => {
            return {
                config: config
            };
        });
    }

    public updateApplicationStatus(status: SGServerApplicationStatus): void {
        this.updateServerStatus({
            applicationStatus: status
        });
    }

    public updateServerStatus(status: Partial<SGServerStatus>): void {
        this.updateState((state: SGAppState) => {
            return {
                serverStatus: {
                    ...state.serverStatus,
                    ...status
                }
            };
        });
    }

    private updateUiState(callback: UpdateStateCallback<SGAppUiState>): void {
        this.store.update((state: SGAppState) => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    ...callback(state.ui)
                }
            };
        });
    }

    private updateState(callback: UpdateStateCallback<SGAppState>): void {
        this.store.update((state: SGAppState) => {
            return {
                ...state,
                ...callback(state)
            };
        });
    }
}
