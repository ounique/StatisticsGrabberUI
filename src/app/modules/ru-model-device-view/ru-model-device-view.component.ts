import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {SGDataService} from "../../services/data.service";
import {Observable} from "rxjs";
import {SGParameterComponent} from "../parameter/parameter.component";
import {SGAppQuery} from "../../state/app.query";
import {TuiSvgModule} from "@taiga-ui/core";
import {
    SGParametersPanelConfiguration,
    SGParametersPanelParameter
} from "../parameters-panel/model/parameters-panel.model";
import {SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGParametersPanelModule} from "../parameters-panel/parameters-panel.module";
import {SGRuModel} from "../../models/core/ru-model.model";

@Component({
    selector: "sg-ru-model-device-view",
    templateUrl: "./ru-model-device-view.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        SGParameterComponent,
        TuiSvgModule,
        SGParametersPanelModule
    ]
})
export class SGRuModelDeviceViewComponent implements OnInit {

    // multiple calls
    // public _data$: Observable<SGBmsModel> = this.appQuery.select(state => state.timeout)
    //     .pipe(
    //         switchMap((timeout: number) => {
    //             return interval(timeout)
    //                 .pipe(
    //                     switchMap(() => this.service.getModelOutput())
    //                 );
    //         })
    //     );

    // single call
    public _data$: Observable<SGRuModel> = this.service.getRuModelOutput();

    public _outputParametersPanelConfig: SGParametersPanelConfiguration;

    public _propertiesParametersPanelConfig: SGParametersPanelConfiguration;

    public _inputParametersPanelConfig: SGParametersPanelConfiguration;

    private readonly BMS_MODEL_NAME: string = "RUModel";

    @HostBinding("class.sg-bms-model-device-view")
    private hostClass: boolean = true;

    constructor(private service: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public ngOnInit(): void {
        const model = this.appQuery.getValue().config.models
            .find((model: SGModelsConfig) => model.name === this.BMS_MODEL_NAME);

        this._outputParametersPanelConfig = this.getPanelConfiguration(model.outputs);
        this._inputParametersPanelConfig = this.getPanelConfiguration(model.inputs);
        this._propertiesParametersPanelConfig = this.getPanelConfiguration(model.properties);
    }

    private getPanelConfiguration(config: SGModelPropertyConfig[]): SGParametersPanelConfiguration {
        return {
            parameters: config.map((val: SGModelPropertyConfig) => {
                return <SGParametersPanelParameter>{
                    label: val.description,
                    fieldKey: val.name,
                    icon: val.icon,
                    unit: val.units
                };
            })
        };
    }
}
