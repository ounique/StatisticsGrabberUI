import {ChangeDetectionStrategy, Component, Inject} from "@angular/core";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {SGGenericModel} from "../../../models/core/generic-model.model";
import {SGParametersPanelConfiguration} from "../../parameters-panel/model/parameters-panel.model";
import {CommonModule} from "@angular/common";

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
        TuiButtonModule
    ]
})
export class SGGenericModelDeviceViewFormComponent {

    get data(): SGGenericModelDeviceViewFormData {
        return this.context.data;
    }

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGGenericModelDeviceViewFormData>) {
    }

    public _test(): void {
        this.context.completeWith();
    }
}
