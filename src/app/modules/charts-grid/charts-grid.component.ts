import {ChangeDetectionStrategy, Component, HostBinding, Inject, Injector, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGAppQuery} from "../../state/app.query";
import {SGChartWrapperConfig} from "../chart-wrapper/models/chart-wrapper.model";
import {SGModelName, SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGChartWrapperComponent} from "../chart-wrapper/chart-wrapper.component";
import {TuiButtonModule, TuiDialogService} from "@taiga-ui/core";
import {
    SGGenericModelDeviceViewFormComponent,
    SGGenericModelDeviceViewFormData
} from "../generic-model-device-view/components/generic-model-device-view-form.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {SGChartsConfigurationComponent} from "../charts-configuration/charts-configuration.component";
import {SGChartsConfigurationDialogData} from "../charts-configuration/model/charts-configuration.model";

@Component({
    selector: "sg-charts-grid",
    templateUrl: "./charts-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGChartWrapperComponent, TuiButtonModule]
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

    constructor(private appQuery: SGAppQuery,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector) {
    }

    public ngOnInit(): void {
        this._chartConfigs = this.getChartConfigs();
    }

    public _onChangeViewClick(): void {
        this.dialogs
            .open<SGGenericModelDeviceViewFormData>(
                new PolymorpheusComponent(SGChartsConfigurationComponent, this.injector),
                {
                    data: <SGChartsConfigurationDialogData>{
                        models: this.appQuery.getValue().config.models
                    },
                    dismissible: true,
                    size: "page"
                }
            )
            .subscribe();
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
