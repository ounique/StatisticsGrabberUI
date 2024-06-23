import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGGenericModelDeviceViewComponent} from "../generic-model-device-view/generic-model-device-view.component";
import {SGModelName, SGModelOrientation} from "../../models/core/app.model";
import {TuiMarkerIconModule} from "@taiga-ui/kit";
import {SGServerApplicationStatus} from "../../models/core/server.model";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SGAppQuery} from "../../state/app.query";
import {SGGenericModel} from "../../models/core/generic-model.model";

@Component({
    selector: "sg-devices-grid",
    templateUrl: "./devices-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGGenericModelDeviceViewComponent, TuiMarkerIconModule, TuiLetModule]
})
export class SGDevicesGridComponent {

    @Input()
    public data: SGModelsOutput;

    public _appStatus$ = this.appQuery.applicationStatus$;

    public _appStatuses: typeof SGServerApplicationStatus = SGServerApplicationStatus;

    public _wing: typeof SGModelOrientation = SGModelOrientation;

    public _modelName: typeof SGModelName = SGModelName;

    @HostBinding("class.sg-devices-grid")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public _trackByFn(index: number, data: SGGenericModel): string {
        return index.toString();
    }

}
