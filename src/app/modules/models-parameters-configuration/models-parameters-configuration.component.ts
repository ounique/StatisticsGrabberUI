import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiAlertModule, TuiButtonModule, TuiDialogContext, TuiNotificationModule} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule, TuiCheckboxModule, TuiMarkerIconModule} from "@taiga-ui/kit";
import {SGModelsParametersConfigurationDialogData} from "./model/models-parameters-configuration.model";
import {SGApplicationStatusService} from "../../services/application-status.service";
import {SGModelName} from "../../models/core/app.model";
import {SGFormComponent} from "../form/form.component";
import {SGFormConfig} from "../form/models/form.model";
import {SGModelsParametersConfigurationService} from "./services/models-parameters-configuration.service";
import {SGAppQuery} from "../../state/app.query";
import {BehaviorSubject, tap} from "rxjs";
import {SGDataService} from "../../services/data.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {SGApplicationStartModels, SGApplicationStartModelsWingData} from "../../models/core/application-start.model";
import {TuiAlertHostModule, TuiLetModule} from "@taiga-ui/cdk";
import {NgFormsManager} from "@ngneat/forms-manager";

@UntilDestroy()
@Component({
    selector: "sg-model-parameters-configuration",
    templateUrl: "./models-parameters-configuration.component.html",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCheckboxLabeledModule, TuiButtonModule, TuiCheckboxModule, SGFormComponent, TuiMarkerIconModule, TuiLetModule, TuiAlertModule, TuiAlertHostModule, TuiNotificationModule],
    providers: [
        SGModelsParametersConfigurationService
    ]
})
export class SGModelsParametersConfigurationComponent implements OnInit {

    public _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    public _isMultipleView: boolean = false;

    public _selectedMenuItem: SGModelName = null;

    public _singleMenuItems: Readonly<{ id: SGModelName; text: string; }>[] = [
        {
            id: SGModelName.BMS_MODEL,
            text: "Батарея"
        },
        {
            id: SGModelName.RU_MODEL,
            text: "Распределительное Устройство"
        },
        {
            id: SGModelName.IMPELLER_MODEL,
            text: "Импеллер"
        }
    ];

    public _formConfig: SGFormConfig = null;

    private initialConditions: SGApplicationStartModels;

    private modelNameToFieldKeyMapping: Record<SGModelName, keyof SGApplicationStartModelsWingData> = {
        [SGModelName.BMS_MODEL]: "bms",
        [SGModelName.RU_MODEL]: "ru",
        [SGModelName.IMPELLER_MODEL]: "impellers"
    };

    get data(): SGModelsParametersConfigurationDialogData {
        return this.context.data;
    }

    @HostBinding("class.sg-model-parameters-configuration")
    private hostClass: boolean = true;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGModelsParametersConfigurationDialogData>,
                private applicationStatusService: SGApplicationStatusService,
                private appQuery: SGAppQuery,
                private formManager: NgFormsManager,
                private formService: SGModelsParametersConfigurationService,
                private dataService: SGDataService) {
    }

    public ngOnInit(): void {
        this.formService.initialize(this.appQuery.getValue().config.models);
        this.subscribeOnFormValueChanges();
        this.subscribeToGetInitialConditions();
    }

    public start(): void {
        this.applicationStatusService.startApplication({})
            .pipe()
            .subscribe();
    }

    public _onMenuItemClick(id: SGModelName): void {
        this._selectedMenuItem = id;
        this._formConfig = this.formService.getModelForm(
            this.initialConditions.leftWing[this.modelNameToFieldKeyMapping[id]][0],
            this._selectedMenuItem
        );
    }

    public _onBackClick(): void {
        this.context.completeWith();
    }

    private subscribeToGetInitialConditions(): void {
        this._isLoading$.next(true);
        this.dataService.getInitialConditions()
            .pipe(
                tap((response) => {
                    this.initialConditions = response;
                    this._isLoading$.next(false);
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    private subscribeOnFormValueChanges(): void {
        this.formManager.valueChanges("inputsInnerGroup")
            .pipe(
                tap((value) => {
                    console.log(value);
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }
}
