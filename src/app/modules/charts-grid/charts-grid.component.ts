import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGAppQuery} from "../../state/app.query";
import {SGChartWrapperConfig} from "../chart-wrapper/models/chart-wrapper.model";
import {SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGChartWrapperComponent} from "../chart-wrapper/chart-wrapper.component";

@Component({
    selector: "sg-charts-grid",
    templateUrl: "./charts-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGChartWrapperComponent]
})
export class SGChartsGridComponent implements OnInit {

    public _chartConfigs: SGChartWrapperConfig[] = [];

    @Input()
    public data: SGModelsOutput;

    @HostBinding("class.sg-charts-grid")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public ngOnInit(): void {
        this._chartConfigs = this.getChartConfigs();
    }

    private getChartConfigs(): SGChartWrapperConfig[] {
        return this.appQuery.getValue().config.models.reduce((arr: SGChartWrapperConfig[], model: SGModelsConfig) => {
            arr.push(
                ...model.outputs.map((item: SGModelPropertyConfig) => {
                    return {
                        fieldKey: item.name,
                        description: item.description,
                        modelFieldKey: model.name,
                        units: item.units
                    };
                })
            )
            return arr;
        }, []);
    }
}
