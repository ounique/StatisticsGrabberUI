import {ChangeDetectionStrategy, Component, HostBinding, HostListener} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../state/app.query";
import {SGServerApplicationStatus} from "../../models/core/server.model";
import {TuiButtonModule, TuiHintModule, TuiSvgModule, TuiTooltipModule} from "@taiga-ui/core";
import {SGApplicationStatusFormService} from "./services/application-status-form.service";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SGAppService} from "../../state/app.service";

@Component({
    selector: "sg-application-status",
    templateUrl: "./application-status.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiTooltipModule, TuiHintModule, TuiButtonModule, TuiSvgModule, TuiLetModule],
    providers: [
        SGApplicationStatusFormService
    ]
})
export class SGApplicationStatusComponent {

    public _appStatus$ = this.appQuery.select(state => state.serverStatus.applicationStatus);

    public _appStatuses: typeof SGServerApplicationStatus = SGServerApplicationStatus;

    @HostBinding("class.sg-application-status")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService) {
    }

    @HostListener("click")
    private onClick(): void {
        this.appService.updateServerStatus({
            ...this.appQuery.getValue().serverStatus,
            applicationStatus: this.appQuery.getValue().serverStatus.applicationStatus === SGServerApplicationStatus.RUNNING
                ? SGServerApplicationStatus.IDLE
                : SGServerApplicationStatus.RUNNING
        });
    }
}
