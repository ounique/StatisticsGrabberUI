import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {SGAppState} from "./app.state";
import {SGAppStore} from "./app.store";

@Injectable({
    providedIn: "root"
})
export class SGAppQuery extends Query<SGAppState> {
    constructor(protected override store: SGAppStore) {
        super(store);
    }
}
