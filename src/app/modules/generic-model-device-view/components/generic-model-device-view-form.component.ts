import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {SGGenericModel} from "../../../models/core/generic-model.model";
import {SGParametersPanelConfiguration} from "../../parameters-panel/model/parameters-panel.model";
import {CommonModule} from "@angular/common";
import {SGFormComponent} from "../../form/form.component";
import {SGFormConfig} from "../../form/models/form.model";
import {SGGenericModelDeviceViewFormService} from "../services/generic-model-device-view-form.service";
import {NgFormsManager} from "@ngneat/forms-manager";
import {Observable} from "rxjs";

export type SGGenericModelDeviceViewFormData = Readonly<{
    data: SGGenericModel;
    inputs: SGParametersPanelConfiguration;
    parameters: SGParametersPanelConfiguration;
}>;

@Component({
    selector: "sg-generic-model-device-view-form",
    templateUrl: "./generic-model-device-view-form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        SGFormComponent
    ],
    providers: [
        SGGenericModelDeviceViewFormService
    ]
})
export class SGGenericModelDeviceViewFormComponent implements OnInit {

    public _formConfig: SGFormConfig;

    public _isValid$: Observable<boolean> = this.formsManager.validityChanges("modelParametersInputsForm");

    get data(): SGGenericModelDeviceViewFormData {
        return this.context.data;
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGGenericModelDeviceViewFormData>,
                private readonly formService: SGGenericModelDeviceViewFormService,
                private formsManager: NgFormsManager) {
    }

    public ngOnInit(): void {
        this._formConfig = this.formService.getFormConfig(this.data);
    }

    public _onCancel(): void {
        this.context.completeWith();
    }

    public _onSubmit(): void {
        console.log(this.formsManager.getControl(this._formConfig.name).value);

        this.context.completeWith();
    }
}
