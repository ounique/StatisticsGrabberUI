import {Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGBmsModelDeviceViewComponent} from "../bms-model-device-view/bms-model-device-view.component";

@Component({
    selector: "sg-devices-grid",
    templateUrl: "./devices-grid.component.html",
    standalone: true,
    imports: [CommonModule, SGBmsModelDeviceViewComponent]
})
export class SGDevicesGridComponent {

    @HostBinding("class.sg-devices-grid")
    private hostClass: boolean = true;
}
