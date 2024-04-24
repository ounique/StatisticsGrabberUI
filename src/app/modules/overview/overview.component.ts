import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";
import {TuiTabsModule} from "@taiga-ui/kit";

@Component({
    selector: "sg-overview",
    templateUrl: "./overview.component.html",
    standalone: true,
    imports: [
        CommonModule,
        TuiTabsModule
    ]
})
export class SGOverviewComponent {

    @HostBinding("class.sg-overview")
    private hostClass: boolean = true;

    constructor() {
    }
}
