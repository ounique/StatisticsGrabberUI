import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {TuiSvgModule} from "@taiga-ui/core";
import {SGNumberPipe} from "../../pipes/number/number.pipe";

@Component({
    selector: "sg-parameter",
    templateUrl: "./parameter.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiSvgModule,
        SGNumberPipe
    ]
})
export class SGParameterComponent {

    @Input()
    public icon: string;

    @Input()
    public value: number;

    @Input()
    public unit: string;

    @Input()
    @HostBinding("title")
    public description: string;

    @Input()
    public parametersWithIconsView: boolean;

    // @Input()
    // public type: "number" | "array";

    @HostBinding("class.sg-parameter")
    private hostClass: boolean = true;

    constructor() {
    }
}
