import {Store, StoreConfig} from "@datorama/akita";
import {createInitialAppState, SGAppState} from "./app.state";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: "root"
})
@StoreConfig({
    name: "app-store"
})
export class SGAppStore extends Store<SGAppState> {

    constructor() {
        super(createInitialAppState());
    }
}
