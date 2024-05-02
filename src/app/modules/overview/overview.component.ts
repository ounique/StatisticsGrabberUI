import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";
import {TuiTabsModule} from "@taiga-ui/kit";
import {SGBmsModelDeviceViewComponent} from "../bms-model-device-view/bms-model-device-view.component";
import {SGChartsGridComponent} from "../charts-grid/charts-grid.component";
import {SGDevicesGridComponent} from "../devices-grid/devices-grid.component";

@Component({
    selector: "sg-overview",
    templateUrl: "./overview.component.html",
    standalone: true,
    imports: [
        CommonModule,
        TuiTabsModule,
        SGBmsModelDeviceViewComponent,
        SGChartsGridComponent,
        SGDevicesGridComponent
    ]
})
export class SGOverviewComponent {

    public _activeTabIndex: number = 0;

    @HostBinding("class.sg-overview")
    private hostClass: boolean = true;

    constructor() {
    }
}
