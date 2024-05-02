import {Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {Observable} from "rxjs";

@Component({
    selector: "sg-server-status",
    templateUrl: "./server-status.component.html",
    standalone: true,
    imports: [CommonModule]
})
export class SGServerStatusComponent implements OnChanges {

    @Input()
    public serverNumber: number;

    public _serverStatus$: Observable<boolean>;

    @HostBinding("class.sg-server-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        this._serverStatus$ = this.appQuery.select(state => state.serverStatuses[this.serverNumber]);
    }
}
