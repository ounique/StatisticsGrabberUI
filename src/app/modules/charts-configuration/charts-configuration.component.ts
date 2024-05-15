import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule} from "@taiga-ui/kit";
import {SGChartsConfigurationDialogData} from "./model/charts-configuration.model";

@Component({
    selector: "sg-charts-configuration",
    templateUrl: "./charts-configuration.component.html",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCheckboxLabeledModule, TuiButtonModule]
})
export class SGChartsConfigurationComponent implements OnInit {

    get data(): SGChartsConfigurationDialogData {
        return this.context.data;
    }

    @HostBinding("class.sg-charts-configuration")
    private hostClass: boolean = true;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGChartsConfigurationDialogData>) {
    }

    public ngOnInit(): void {
    }

}
