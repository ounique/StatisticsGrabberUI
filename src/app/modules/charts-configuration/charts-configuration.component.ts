import {ChangeDetectionStrategy, Component, HostBinding, Inject, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {POLYMORPHEUS_CONTEXT} from "@tinkoff/ng-polymorpheus";
import {TuiButtonModule, TuiDialogContext} from "@taiga-ui/core";
import {TuiCheckboxLabeledModule} from "@taiga-ui/kit";
import {SGChartsConfigurationDialogData} from "./model/charts-configuration.model";
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgFormsManager} from "@ngneat/forms-manager";
import {SGChartsConfiguration} from "../../models/core/charts-configuration.model";
import {SGDataService} from "../../services/data.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {tap} from "rxjs";

@UntilDestroy()
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
                private readonly context: TuiDialogContext<SGChartsConfiguration, SGChartsConfigurationDialogData>,
                private formManager: NgFormsManager,
                private dataService: SGDataService) {
    }

    public ngOnInit(): void {
        this.initializeGroup();
    }

    public _onSaveClick(): void {
        const formValue = this.getFormValue(this._formName);

        this.dataService.updateChartsConfiguration(formValue)
            .pipe(
                tap((response: SGChartsConfiguration) => {
                    this.formManager.destroy(this._formName);
                    this.formManager.unsubscribe(this._formName);
                    this.context.completeWith(response);
                }),
                untilDestroyed(this)
            )
            .subscribe();
    }

    public _onCancelClick(): void {
        this.context.completeWith(null);
    }

    private getFormValue(formName: string): SGChartsConfiguration {
        return this.formManager.getControl(formName).value;
    }

    private initializeGroup(): void {
        const controls: Record<string, FormControl> = {};
        this.data.models.forEach((model) => {
            model.outputs.forEach((output) => {
                const key = `${model.name}_${output.name}`;
                controls[key] = new FormControl(this.data.configuration[key]);
            });
        });
        controls["leftWing"] = new FormControl(this.data.configuration["leftWing"]);
        controls["rightWing"] = new FormControl(this.data.configuration["rightWing"]);

        this._nativeFormGroup = new FormGroup({ ...controls });
        this.formManager.upsert(this._formName, this._nativeFormGroup);
    }
}
