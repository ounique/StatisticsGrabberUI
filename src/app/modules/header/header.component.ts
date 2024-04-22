import {Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: "sg-header",
    templateUrl: "./header.component.html",
    standalone: true,
    imports: [CommonModule]
})
export class SGHeaderComponent {

    @HostBinding("class.sg-header")
    private hostClass: boolean = true;

    constructor() {
    }
}
