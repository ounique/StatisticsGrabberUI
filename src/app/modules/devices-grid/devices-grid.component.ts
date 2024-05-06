import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGBmsModelDeviceViewComponent} from "../bms-model-device-view/bms-model-device-view.component";
import {SGRuModelDeviceViewComponent} from "../ru-model-device-view/ru-model-device-view.component";

@Component({
    selector: "sg-devices-grid",
    templateUrl: "./devices-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGBmsModelDeviceViewComponent, SGRuModelDeviceViewComponent]
})
export class SGDevicesGridComponent {

    @HostBinding("class.sg-devices-grid")
    private hostClass: boolean = true;
}
