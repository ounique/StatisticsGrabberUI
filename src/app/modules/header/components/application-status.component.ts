import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {SGServerStatus} from "../../../models/core/server.model";
import {TuiButtonModule, TuiHintModule, TuiTooltipModule} from "@taiga-ui/core";
import {Observable} from "rxjs";

@Component({
    selector: "sg-application-status",
    templateUrl: "./application-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiTooltipModule, TuiHintModule, TuiButtonModule]
})
export class SGApplicationStatusComponent {

    public _isServerReady$ = this.appQuery.isServersReady$;

    @Input()
    public status: SGServerStatus;

    @HostBinding("class.sg-application-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }
}
