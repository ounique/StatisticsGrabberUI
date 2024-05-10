import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {map, Observable} from "rxjs";
import {SGServerStatus} from "../../../models/core/server.model";
import {TuiHintModule, TuiSvgModule} from "@taiga-ui/core";
import {TuiComboBoxModule, TuiDataListWrapperModule} from "@taiga-ui/kit";

@Component({
    selector: "sg-pooling-interval",
    templateUrl: "./pooling-interval.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiComboBoxModule, TuiDataListWrapperModule]
})
export class SGServerStatusComponent implements OnChanges {

    public _serverStatus$: Observable<number> = this.appQuery.select(state => state.timeout);

    public _timeout: string;

    public _items$: Observable<string[]> = this.appQuery.select(state => state.config.availableTimeouts)
        .pipe(
            map((items: number[]) => items.map(String))
        )

    @HostBinding("class.sg-server-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        // this._serverStatus$ = this.appQuery.select(state => state.serverStatuses[this.serverNumber]);
    }
}
