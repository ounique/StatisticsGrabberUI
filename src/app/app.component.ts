import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";

@Component({
    selector: "sg-app",
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SGAppComponent {

    @HostBinding()
    private hostClass: boolean = true;
}
