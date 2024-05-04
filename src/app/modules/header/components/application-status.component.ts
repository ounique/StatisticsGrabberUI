import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../../state/app.query";
import {SGServerStatus} from "../../../models/core/server.model";
import {TuiHintModule, TuiTooltipModule} from "@taiga-ui/core";

@Component({
    selector: "sg-application-status",
    templateUrl: "./application-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiTooltipModule, TuiHintModule]
})
export class SGApplicationStatusComponent {

    @Input()
    public status: SGServerStatus;

    @HostBinding("class.sg-application-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }
}
