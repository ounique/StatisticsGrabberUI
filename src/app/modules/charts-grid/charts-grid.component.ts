import {ChangeDetectionStrategy, Component, HostBinding, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGAppQuery} from "../../state/app.query";
import {SGChartWrapperConfig} from "../chart-wrapper/models/chart-wrapper.model";
import {SGModelName, SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
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

    private modelNameMapping: Record<SGModelName, SGChartWrapperConfig["modelFieldKey"]> = {
        [SGModelName.RU_MODEL]: "ru",
        [SGModelName.IMPELLER_MODEL]: "impellers",
        [SGModelName.BMS_MODEL]: "bms"
    };

    private modelSeriesPrefixMapping: Record<SGModelName, string> = {
        [SGModelName.RU_MODEL]: "РУ",
        [SGModelName.IMPELLER_MODEL]: "Импеллер",
        [SGModelName.BMS_MODEL]: "Батарея"
    };

    @HostBinding("class.sg-charts-grid")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery) {
    }

    public ngOnInit(): void {
        this._chartConfigs = this.getChartConfigs();
    }

    private getChartConfigs(): SGChartWrapperConfig[] {
        return this.appQuery.getValue().config.models.reduce((arr: SGChartWrapperConfig[], model: SGModelsConfig) => {
            if (model.name === SGModelName.BMS_MODEL) {
                arr.push(
                    ...model.outputs.map((item: SGModelPropertyConfig) => {
                        return {
                            fieldKey: item.name,
                            description: item.description,
                            modelFieldKey: this.modelNameMapping[model.name],
                            units: item.units,
                            seriesPrefix: this.modelSeriesPrefixMapping[model.name]
                        };
                    })
                )
            }
            return arr;
        }, []);
    }
}
