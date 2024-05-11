import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGChartWrapperConfig} from "./models/chart-wrapper.model";
import {SGModelsOutput} from "../../models/core/models-status.model";

@Component({
    selector: "sg-chart-wrapper",
    templateUrl: "./chart-wrapper.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class SGChartWrapperComponent {

    @Input()
    public config: SGChartWrapperConfig;

    @Input()
    public orientation: keyof SGModelsOutput;

    @Input()
    public data: SGModelsOutput;

    @HostBinding("class.sg-chart-wrapper")
    private hostClass: boolean = true;
}
