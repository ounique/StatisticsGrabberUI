import {ChangeDetectionStrategy, Component, HostBinding, Inject, Injector, Input, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGAppQuery} from "../../state/app.query";
import {SGChartWrapperConfig} from "../chart-wrapper/models/chart-wrapper.model";
import {SGModelName, SGModelOrientation, SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGChartWrapperComponent} from "../chart-wrapper/chart-wrapper.component";
import {TuiButtonModule, TuiDialogService, TuiSvgModule} from "@taiga-ui/core";
import {
    SGGenericModelDeviceViewFormData
} from "../generic-model-device-view/components/generic-model-device-view-form.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";
import {SGChartsConfigurationComponent} from "../charts-configuration/charts-configuration.component";
import {SGChartsConfigurationDialogData} from "../charts-configuration/model/charts-configuration.model";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SGServerApplicationStatus} from "../../models/core/server.model";
import {TuiMarkerIconModule} from "@taiga-ui/kit";
import {SGDataService} from "../../services/data.service";
import {BehaviorSubject, finalize, tap} from "rxjs";
import {SGChartsConfiguration} from "../../models/core/charts-configuration.model";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SGChartsFilterPipe} from "./pipes/charts-filter.pipe";

@UntilDestroy()
@Component({
    selector: "sg-charts-grid",
    templateUrl: "./charts-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, SGChartWrapperComponent, TuiButtonModule, TuiLetModule, TuiSvgModule, TuiMarkerIconModule, SGChartsFilterPipe]
})
export class SGChartsGridComponent implements OnInit {

    public _appStatus$ = this.appQuery.applicationStatus$;

    public _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public _chartsConfiguration$: BehaviorSubject<SGChartsConfiguration> = new BehaviorSubject<SGChartsConfiguration>(null);

    public _appStatuses: typeof SGServerApplicationStatus = SGServerApplicationStatus;

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
                @Inject(Injector) private readonly injector: Injector,
                private dataService: SGDataService) {
    }

    public ngOnInit(): void {
        this.subscribeToGetChartsConfiguration();

        this._chartConfigs = this.getChartConfigs();
    }

    public _onChangeViewClick(): void {
        this.dialogs
            .open<SGChartsConfiguration>(
                new PolymorpheusComponent(SGChartsConfigurationComponent, this.injector),
                {
                    data: <SGChartsConfigurationDialogData>{
                        models: this.appQuery.getValue().config.models,
                        configuration: this._chartsConfiguration$.value
                    },
                    dismissible: true,
                    size: "page"
                }
            )
            .pipe(
                tap((response: SGChartsConfiguration) => {
                    if (response) {
                        this._chartsConfiguration$.next(response);
                    }
                })
            )
            .subscribe();
    }

    private getChartConfigs(): SGChartWrapperConfig[] {
        return this.appQuery.getValue().config.models.reduce((arr: SGChartWrapperConfig[], model: SGModelsConfig) => {
            model.outputs.forEach((item: SGModelPropertyConfig) => {
                arr.push({
                    fieldKey: item.name,
                    description: item.description,
                    modelFieldKey: this.modelNameMapping[model.name],
                    units: item.units,
                    seriesPrefix: this.modelSeriesPrefixMapping[model.name],
                    orientation: SGModelOrientation.LEFT_WING
                });
                arr.push({
                    fieldKey: item.name,
                    description: item.description,
                    modelFieldKey: this.modelNameMapping[model.name],
                    units: item.units,
                    seriesPrefix: this.modelSeriesPrefixMapping[model.name],
                    orientation: SGModelOrientation.RIGHT_WING
                });
            });

            return arr;
        }, []);
    }

    private subscribeToGetChartsConfiguration(): void {
        this._isLoading$.next(true);
        this.dataService.getChartsConfiguration()
            .pipe(
                tap((response: SGChartsConfiguration) => {
                    this._chartsConfiguration$.next(response);
                }),
                finalize(() => this._isLoading$.next(false)),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
