import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {SGAppState, SGAppUiState} from "./app.state";
import {SGAppStore} from "./app.store";
import {Observable} from "rxjs";

@Injectable({
    providedIn: "root"
})
export class SGAppQuery extends Query<SGAppState> {

    public isServersReady$: Observable<boolean> = this.select(state => {
        return state.serverStatus.server1 &&
            state.serverStatus.server2 &&
            state.serverStatus.server3 &&
            state.serverStatus.server4;
    })
    constructor(protected override store: SGAppStore) {
        super(store);
    }
}
