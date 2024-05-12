import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGFormConfig, SGFormControlConfig, SGFormGroupConfig, SGFormInnerGroupConfig} from "./models/form.model";
import {FormControl, FormGroup, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {TuiInputNumberModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";
import {NgFormsManager} from "@ngneat/forms-manager";

@Component({
    selector: "sg-form",
    templateUrl: "./form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputNumberModule, TuiTextfieldControllerModule]
})
export class SGFormComponent implements OnChanges, OnDestroy {

    @Input()
    public config: SGFormConfig;

    public _formGroup: UntypedFormGroup;

    @HostBinding("class.sg-form")
    private hostClass: boolean = true;

    constructor(private formsManager: NgFormsManager) {
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["config"].currentValue) {
            this.unsubscribeFromForm();
            this._formGroup = this.getFormGroup();
            this.subscribeToForm();
        }
    }

    public ngOnDestroy(): void {
        this.unsubscribeFromForm();
    }

    private subscribeToForm(): void {
        this.formsManager.upsert(this.config.name, this._formGroup);
    }

    private unsubscribeFromForm(): void {
        this.config?.name && this.formsManager.unsubscribe(this.config.name);
    }

    private getFormGroup(): UntypedFormGroup {
        const controls: Record<string, FormControl> = {};
        this.config.groups.forEach((group: SGFormGroupConfig) => {
            group.innerGroups.forEach((innerGroup: SGFormInnerGroupConfig) => {
                innerGroup.controls.forEach((control: SGFormControlConfig) => {
                    controls[control.name] = new FormControl(control.value, Validators.required);
                })
            });
        });
        return new FormGroup({...controls});
    }
}
