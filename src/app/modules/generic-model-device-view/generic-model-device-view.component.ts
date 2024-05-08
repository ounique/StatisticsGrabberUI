import {CommonModule} from "@angular/common";
import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Injector,
    Input,
    OnChanges,
    SimpleChanges
} from "@angular/core";
import {SGDataService} from "../../services/data.service";
import {SGAppQuery} from "../../state/app.query";
import {
    TuiAlertService,
    TuiButtonModule,
    TuiDataListModule,
    TuiDialogService,
    TuiHostedDropdownModule,
    TuiSvgModule
} from "@taiga-ui/core";
import {
    SGParametersPanelConfiguration,
    SGParametersPanelParameter
} from "../parameters-panel/model/parameters-panel.model";
import {SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
import {SGParametersPanelModule} from "../parameters-panel/parameters-panel.module";
import {
    SGGenericModelDeviceViewConfig,
    SGGenericModelDeviceViewMenuItem,
    SGGenericModelDeviceViewMenuItemType
} from "./models/generic-model-device-view.model";
import {SGGenericModel} from "../../models/core/generic-model.model";
import {SGGenericModelDeviceViewFormService} from "./services/generic-model-device-view-form.service";
import {
    SGGenericModelDeviceViewFormComponent,
    SGGenericModelDeviceViewFormData
} from "./components/generic-model-device-view-form.component";
import {PolymorpheusComponent} from "@tinkoff/ng-polymorpheus";

@Component({
    selector: "sg-generic-model-device-view",
    templateUrl: "./generic-model-device-view.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiSvgModule,
        SGParametersPanelModule,
        TuiHostedDropdownModule,
        TuiButtonModule,
        TuiDataListModule
    ],
    providers: [
        SGGenericModelDeviceViewFormService
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

    public _menuItems: SGGenericModelDeviceViewMenuItem[] = [
        {
            id: SGGenericModelDeviceViewMenuItemType.INPUT_PARAMS_CHANGE,
            text: "Изменить входы/параметры"
        }
    ];

    @HostBinding("class.sg-generic-model-device-view")
    private hostClass: boolean = true;

    constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector,
                private service: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"].currentValue) {
            this.initModel();
        }
    }

    public _onMenuItemClick(id: SGGenericModelDeviceViewMenuItemType): void {
        this.dialogs
            .open<SGGenericModelDeviceViewFormData>(
                new PolymorpheusComponent(SGGenericModelDeviceViewFormComponent, this.injector),
                {
                    data: <SGGenericModelDeviceViewFormData>{
                        data: this.data,
                        inputs: this._inputParametersPanelConfig,
                        parameters: this._propertiesParametersPanelConfig
                    },
                    dismissible: true,
                    label: "Входы/Параметры"
                }
            )
            .subscribe();
        // this.alerts
        //     .open("Item clicked!", {
        //         status: "success",
        //         autoClose: 1500
        //     })
        //     .subscribe();
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
                    unit: val.units,
                    description: val.description
                };
            })
        };
    }
}
