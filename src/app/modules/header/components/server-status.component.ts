import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {Observable} from "rxjs";
import {SGServerStatus} from "../../../models/core/server.model";
import {TuiHintModule, TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: "sg-server-status",
    templateUrl: "./server-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiSvgModule, TuiHintModule]
})
export class SGServerStatusComponent implements OnChanges {

    public _isAllServersUp$: Observable<boolean> = this.appQuery.select(state => {
        return state.serverStatus.server1 &&
            state.serverStatus.server2 &&
            state.serverStatus.server3 &&
            state.serverStatus.server4;
    });

    public _serverStatus$: Observable<SGServerStatus> = this.appQuery.select(state => state.serverStatus);

    @HostBinding("class.sg-server-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // this._serverStatus$ = this.appQuery.select(state => state.serverStatuses[this.serverNumber]);
    }
}
