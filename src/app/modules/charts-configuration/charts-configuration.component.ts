import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule} from "@taiga-ui/kit";
import {SGChartsConfigurationDialogData} from "./model/charts-configuration.model";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgFormsManager} from "@ngneat/forms-manager";

@Component({
    selector: "sg-charts-configuration",
    templateUrl: "./charts-configuration.component.html",
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, TuiCheckboxLabeledModule, TuiButtonModule, ReactiveFormsModule]
})
export class SGChartsConfigurationComponent implements OnInit {

    public _nativeFormGroup: FormGroup;

    private _formName: string = "chartsConfigForm";

    get data(): SGChartsConfigurationDialogData {
        return this.context.data;
    }

    @HostBinding("class.sg-charts-configuration")
    private hostClass: boolean = true;

    constructor(@Inject(POLYMORPHEUS_CONTEXT)
                private readonly context: TuiDialogContext<void, SGChartsConfigurationDialogData>,
                private formManager: NgFormsManager) {
    }

    public ngOnInit(): void {
        this.initializeGroup();
    }

    public _onSaveClick(): void {
        this.getFormValue(this._formName);
        this.formManager.upsert("chartsConfigForm", this._nativeFormGroup);

        this.context.completeWith();
    }

    public _onCancelClick(): void {
        this.context.completeWith();
    }

    private getFormValue(formName: string): void {

    }

    private initializeGroup(): void {
        const controls: Record<string, FormControl> = {};
        this.data.models.forEach((model) => {
            model.outputs.forEach((output) => {
               controls[`${model.name}_${output.name}`] = new FormControl(false);
            });
        });
        controls["leftWing"] = new FormControl(false);
        controls["rightWing"] = new FormControl(false);

        this._nativeFormGroup = new FormGroup({ ...controls });
        this.formManager.upsert(this._formName, this._nativeFormGroup);
    }
}
