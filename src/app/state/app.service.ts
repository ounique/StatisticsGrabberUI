import {Injectable} from "@angular/core";
import {SGAppStore} from "./app.store";
import {UpdateStateCallback} from "@datorama/akita";
import {SGAppState} from "./app.state";

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

    private updateState(callback: UpdateStateCallback<SGAppState>): void {
        this.store.update((state: SGAppState) => {
            return {
                ...state,
                ...callback(state)
            };
        });
    }
}
