import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {SGAppState, SGAppUiState} from "./app.state";
import {SGAppStore} from "./app.store";
import {distinctUntilChanged, Observable} from "rxjs";
import {SGServerApplicationStatus} from "../models/core/server.model";

@Injectable({
    providedIn: "root"
})
export class SGAppQuery extends Query<SGAppState> {

    public applicationStatus$: Observable<SGServerApplicationStatus> = this.select(state => state?.serverStatus?.applicationStatus)
        .pipe(
            distinctUntilChanged()
        );

    public isServersReady$: Observable<boolean> = this.select(state => {
        return state.serverStatus?.server1 &&
            state.serverStatus?.server2 &&
            state.serverStatus?.server3 &&
            state.serverStatus?.server4;
    })
    constructor(protected override store: SGAppStore) {
        super(store);
    }
}
