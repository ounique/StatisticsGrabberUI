import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule} from "@taiga-ui/kit";
import {SGModelsParametersConfigurationDialogData} from "./model/models-parameters-configuration.model";

@Component({
    selector: "sg-models-parameters-configuration-configuration",
    templateUrl: "./models-parameters-configuration.component.html",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCheckboxLabeledModule, TuiButtonModule]
})
export class SGModelsParametersConfigurationComponent implements OnInit {

    get data(): SGModelsParametersConfigurationDialogData {
        return this.context.data;
    }

    @HostBinding("class.sg-charts-configuration")
    private hostClass: boolean = true;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGModelsParametersConfigurationDialogData>) {
    }

    public ngOnInit(): void {
    }

}
