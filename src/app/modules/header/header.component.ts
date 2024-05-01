import {Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../state/app.query";
import {SGAppService} from "../../state/app.service";
import {Observable} from "rxjs";

@Component({
    selector: "sg-header",
    templateUrl: "./header.component.html",
    standalone: true,
    imports: [CommonModule]
})
export class SGHeaderComponent {

    public _timeout$: Observable<number> = this.appQuery.select(state => state.timeout);

    @HostBinding("class.sg-header")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService) {
    }

    public _onClick(): void {
        this.appService.updateTimeout(this.appQuery.getValue().timeout + 100);
    }
}
