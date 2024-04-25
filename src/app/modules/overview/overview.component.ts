import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";
import {TuiTabsModule} from "@taiga-ui/kit";
import {SGBmsModelDeviceViewComponent} from "../bms-model-device-view/bms-model-device-view.component";

@Component({
    selector: "sg-overview",
    templateUrl: "./overview.component.html",
    standalone: true,
    imports: [
        CommonModule,
        TuiTabsModule,
        SGBmsModelDeviceViewComponent
    ]
})
export class SGOverviewComponent {

    @HostBinding("class.sg-overview")
    private hostClass: boolean = true;

    constructor() {
    }
}
