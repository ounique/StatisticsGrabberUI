import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {TuiAlertService, TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {SGGenericModel} from "../../../models/core/generic-model.model";
import {
    SGParametersPanelConfiguration,
    SGParametersPanelParameter
} from "../../parameters-panel/model/parameters-panel.model";
import {CommonModule} from "@angular/common";
import {SGFormComponent} from "../../form/form.component";
import {SGFormConfig} from "../../form/models/form.model";
import {SGGenericModelDeviceViewFormService} from "../services/generic-model-device-view-form.service";
import {NgFormsManager} from "@ngneat/forms-manager";
import {BehaviorSubject, finalize, Observable, switchMap, tap} from "rxjs";
import {SGDataService} from "../../../services/data.service";
import {SGModelName, SGModelOrientation, SGModelPropertyConfig} from "../../../models/core/app.model";
import {TuiLetModule} from "@taiga-ui/cdk";
import {SGModelUpdateRequest} from "../../../models/core/models-status.model";

export type SGGenericModelDeviceViewFormData = Readonly<{
    data: SGGenericModel;
    inputs: SGParametersPanelConfiguration;
    parameters: SGParametersPanelConfiguration;
    number: number;
    wing: SGModelOrientation;
    name: SGModelName;
}>;

@Component({
    selector: "sg-generic-model-device-view-form",
    templateUrl: "./generic-model-device-view-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        SGFormComponent,
        TuiLetModule
    ],
    providers: [
        SGGenericModelDeviceViewFormService
    ]
})
export class SGGenericModelDeviceViewFormComponent implements OnInit {

    public _formConfig: SGFormConfig;

    public _isValid$: Observable<boolean> = this.formsManager.validityChanges("modelParametersInputsForm");

    public _isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get data(): SGGenericModelDeviceViewFormData {
        return this.context.data;
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGGenericModelDeviceViewFormData>,
                @Inject(TuiAlertService) private readonly alerts: TuiAlertService,
                private readonly formService: SGGenericModelDeviceViewFormService,
                private formsManager: NgFormsManager,
                private dataService: SGDataService) {
    }

    public ngOnInit(): void {
        this._formConfig = this.formService.getFormConfig(this.data);
    }

    public _onCancel(): void {
        this.context.completeWith();
    }

    public _onSubmit(): void {
        this.sendDataToServer();
    }

    private sendDataToServer(): void {
        this._isLoading$.next(true);
        this.dataService.updateModelProps(
            this.getBodyRequest(),
            this.data.wing,
            this.data.number,
            this.data.name
        )
            .pipe(
                switchMap(() => {
                    this._isLoading$.next(false);
                    this.context.completeWith();

                    return this.alerts
                        .open("Данные успешно отправлены на сервер!", {
                            status: "success",
                            autoClose: 1500
                        })
                }),
                finalize(() => {
                    this._isLoading$.next(false);
                    this.context.completeWith();
                })
            )
            .subscribe();
    }

    private getBodyRequest(): SGModelUpdateRequest {
        const formValue = this.formsManager.getControl(this._formConfig.name).value;

        return {
            parameters: this.data.parameters.parameters.reduce((obj: object, val: SGParametersPanelParameter) => {
                return {
                    ...obj,
                    [val.fieldKey]: formValue[val.fieldKey]
                };
            }, {}),
            input: this.data.inputs.parameters.reduce((obj: object, val: SGParametersPanelParameter) => {
                return {
                    ...obj,
                    [val.fieldKey]: formValue[val.fieldKey]
                };
            }, {})
        }
    }
}
