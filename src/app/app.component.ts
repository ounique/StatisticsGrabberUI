import {Component, HostBinding} from "@angular/core";

@Component({
    selector: "sg-app",
    templateUrl: "./app.component.html"
})
export class SGAppComponent {

    @HostBinding()
    private hostClass: boolean = true;
}
