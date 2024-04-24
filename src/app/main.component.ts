import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "sg-main",
    templateUrl: "main.component.html"
})
export class SGMainComponent {

    @HostBinding("class.sg-main")
    private hostClass: boolean = true;

    constructor() {
    }
}
