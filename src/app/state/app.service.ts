import {Injectable} from "@angular/core";
import {SGAppStore} from "./app.store";
import {UpdateStateCallback} from "@datorama/akita";
import {SGAppState} from "./app.state";
import {SGConfig} from "../models/core/app.model";
import {SGServerStatus} from "../models/core/server.model";

@Injectable({
    providedIn: "root"
})
export class SGAppService {
    constructor(private store: SGAppStore) {
    }

    public updateTimeout(value: number): void {
        this.updateState(() => {
            return {
                timeout: value
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

    public updateServerStatus(status: SGServerStatus): void {
        this.updateState(() => {
            return {
                serverStatus: status
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
