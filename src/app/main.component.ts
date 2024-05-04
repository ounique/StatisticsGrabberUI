import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";

@Component({
    selector: "sg-main",
    templateUrl: "main.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SGMainComponent {

    @HostBinding("class.sg-main")
    private hostClass: boolean = true;

    constructor() {
    }
}
