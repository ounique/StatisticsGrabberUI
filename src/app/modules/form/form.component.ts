import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGFormConfig} from "./models/form.model";
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputNumberModule} from "@taiga-ui/kit";
import {TuiTextfieldControllerModule} from "@taiga-ui/core";

@Component({
    selector: "sg-form",
    templateUrl: "./form.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiInputNumberModule, TuiTextfieldControllerModule]
})
export class SGFormComponent {

    @Input()
    public config: SGFormConfig;

    @HostBinding("class.sg-form")
    private hostClass: boolean = true;
}
