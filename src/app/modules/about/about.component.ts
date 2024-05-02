import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "sg-about",
    templateUrl: "./about.component.html",
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class SGAboutComponent {

    @HostBinding("class.sg-about")
    private hostClass: boolean = true;
}
