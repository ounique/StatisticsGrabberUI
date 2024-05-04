import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: "sg-footer",
    templateUrl: "./footer.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class SGFooterComponent {

    @HostBinding("class.sg-footer")
    private hostClass: boolean = true;

    constructor() {
    }
}
