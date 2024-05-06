import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges} from "@angular/core";
import {SGDataService} from "../../services/data.service";
import {SGAppQuery} from "../../state/app.query";
import {TuiSvgModule} from "@taiga-ui/core";
import {
    SGParametersPanelConfiguration,
    SGParametersPanelParameter
} from "../parameters-panel/model/parameters-panel.model";
import {SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGParametersPanelModule} from "../parameters-panel/parameters-panel.module";
import {SGGenericModelDeviceViewConfig} from "./models/generic-model-device-view.model";
import {SGGenericModel} from "../../models/core/generic-model.model";

@Component({
    selector: "sg-generic-model-device-view",
    templateUrl: "./generic-model-device-view.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiSvgModule,
        SGParametersPanelModule
    ]
})
export class SGGenericModelDeviceViewComponent implements OnChanges {

    @Input()
    public modelName: string;

    @Input()
    public multipleMode: boolean = false;

    @Input()
    public data: SGGenericModel;

    @Input()
    public config: SGGenericModelDeviceViewConfig;

    public _initializationError: boolean;

    public _outputParametersPanelConfig: SGParametersPanelConfiguration;

    public _propertiesParametersPanelConfig: SGParametersPanelConfiguration;

    public _inputParametersPanelConfig: SGParametersPanelConfiguration;

    @HostBinding("class.sg-generic-model-device-view")
    private hostClass: boolean = true;

    constructor(private service: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"].currentValue) {
            this.initModel();
        }
    }

    private initModel(): void {
        const model = this.appQuery.getValue().config.models
            .find((model: SGModelsConfig) => model.name === this.modelName);

        if (model) {
            this._outputParametersPanelConfig = this.getPanelConfiguration(model.outputs);
            this._inputParametersPanelConfig = this.getPanelConfiguration(model.inputs);
            this._propertiesParametersPanelConfig = this.getPanelConfiguration(model.properties);
        } else {
            this._initializationError = true;
        }
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
