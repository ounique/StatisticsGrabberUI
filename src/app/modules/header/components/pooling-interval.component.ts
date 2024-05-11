import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {map, Observable} from "rxjs";
import {SGServerStatus} from "../../../models/core/server.model";
import {TuiHintModule, TuiSvgModule, TuiTextfieldControllerModule} from "@taiga-ui/core";
import {TuiComboBoxModule, TuiDataListWrapperModule} from "@taiga-ui/kit";
import {FormsModule} from "@angular/forms";
import {SGAppService} from "../../../state/app.service";

@Component({
    selector: "sg-pooling-interval",
    templateUrl: "./pooling-interval.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiComboBoxModule, TuiDataListWrapperModule, TuiTextfieldControllerModule, FormsModule]
})
export class SGPoolingIntervalComponent implements OnInit {

    public _serverStatus$: Observable<number> = this.appQuery.select(state => state.config.defaultTimeout);

    public _timeout: string;

    public _items$: Observable<string[]> = this.appQuery.select(state => state.config.availableTimeouts)
        .pipe(
            map((items: number[]) => items.map(String))
        )

    @HostBinding("class.sg-pooling-interval")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService) {
    }

    public ngOnInit(): void {
        this._timeout = this.appQuery.getValue().config.defaultTimeout.toString();
    }

    public _onModelChange(event: string): void {
        if (event) {
            this.appService.updateTimeout(Number(event));
        }
    }
}
