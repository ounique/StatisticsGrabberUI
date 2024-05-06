import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGGenericModelDeviceViewComponent} from "../generic-model-device-view/generic-model-device-view.component";

@Component({
    selector: "sg-devices-grid",
    templateUrl: "./devices-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGGenericModelDeviceViewComponent]
})
export class SGDevicesGridComponent {

    @Input()
    public data: SGModelsOutput;

    @HostBinding("class.sg-devices-grid")
    private hostClass: boolean = true;
}
