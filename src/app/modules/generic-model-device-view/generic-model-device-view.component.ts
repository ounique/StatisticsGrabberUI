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
import {SGAppQuery} from "../../state/app.query";
import {
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
import {SGModelName, SGModelOrientation, SGModelPropertyConfig, SGModelsConfig} from "../../models/core/app.model";
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
import {SGDataService} from "../../services/data.service";
import {TUI_PROMPT} from "@taiga-ui/kit";
import {EMPTY, switchMap} from "rxjs";

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
    public modelName: SGModelName;

    @Input()
    public number: number;

    @Input()
    public wing: SGModelOrientation;

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
        },
        {
            id: SGGenericModelDeviceViewMenuItemType.EMIT_EMERGENCY,
            text: "Выключить/Включить"
        }
    ];

    @HostBinding("class.sg-generic-model-device-view")
    private hostClass: boolean = true;

    constructor(@Inject(TuiDialogService) private readonly dialogs: TuiDialogService,
                @Inject(Injector) private readonly injector: Injector,
                private dataService: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"].currentValue) {
            this.initModel();
        }
    }

    public _onMenuItemClick(id: SGGenericModelDeviceViewMenuItemType): void {
        if (id === SGGenericModelDeviceViewMenuItemType.INPUT_PARAMS_CHANGE) {
            this.showChangeParametersDialog();
        } else if (id === SGGenericModelDeviceViewMenuItemType.EMIT_EMERGENCY) {
            this.emitEmergency();
        }
    }

    private emitEmergency(): void {
        this.dialogs
            .open<boolean>(TUI_PROMPT, {
                label: "Включение/Выключение",
                data: {
                    content: 'Вы уверены, что хотите остановить/запустить модель?',
                    yes: 'Да',
                    no: 'Нет',
                },
            })
            .pipe(
                switchMap((response: boolean) => {
                    if (response) {
                        return this.dataService.changeDeviceAvailability(`${this.wing}_${this.modelName}_${this.number}`)
                            .pipe();
                    }

                    return EMPTY;
                })
            )
            .subscribe();
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

    private showChangeParametersDialog(): void {
        this.dialogs
            .open<SGGenericModelDeviceViewFormData>(
                new PolymorpheusComponent(SGGenericModelDeviceViewFormComponent, this.injector),
                {
                    data: <SGGenericModelDeviceViewFormData>{
                        data: this.data,
                        inputs: this._inputParametersPanelConfig,
                        parameters: this._propertiesParametersPanelConfig,
                        number: this.number,
                        wing: this.wing,
                        name: this.modelName
                    },
                    dismissible: true,
                    label: "Входы/Параметры"
                }
            )
            .subscribe();
    }
}
