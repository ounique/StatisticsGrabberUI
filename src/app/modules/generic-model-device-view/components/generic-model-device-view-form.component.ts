import {ChangeDetectionStrategy, Component, Inject, OnInit} from "@angular/core";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {SGGenericModel} from "../../../models/core/generic-model.model";
import {SGParametersPanelConfiguration} from "../../parameters-panel/model/parameters-panel.model";
import {CommonModule} from "@angular/common";
import {SGFormComponent} from "../../form/form.component";
import {SGFormConfig} from "../../form/models/form.model";
import {SGGenericModelDeviceViewFormService} from "../services/generic-model-device-view-form.service";

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

    get data(): SGGenericModelDeviceViewFormData {
        return this.context.data;
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGGenericModelDeviceViewFormData>,
                private readonly formService: SGGenericModelDeviceViewFormService) {
    }

    public ngOnInit(): void {
        this._formConfig = this.formService.getFormConfig(this.data);
    }

    public _test(): void {
        this.context.completeWith();
    }
}
