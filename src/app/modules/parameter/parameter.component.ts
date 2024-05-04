import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: "sg-parameter",
    templateUrl: "./parameter.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiSvgModule
    ]
})
export class SGParameterComponent {

    @Input()
    // @ts-ignore
    public icon: string;

    @Input()
    // @ts-ignore
    public value: number;

    @Input()
    // @ts-ignore
    public unit: string;

    // @Input()
    // public type: "number" | "array";

    @HostBinding("class.sg-parameter")
    private hostClass: boolean = true;

    constructor() {
    }
}
