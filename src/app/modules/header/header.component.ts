import {Component, HostBinding, Inject, TemplateRef, ViewChild, ViewChildren} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../state/app.query";
import {SGAppService} from "../../state/app.service";
import {Observable} from "rxjs";
import {TuiDialogService, TuiSvgModule} from "@taiga-ui/core";
import {SGServerStatusComponent} from "./components/server-status.component";
import {SGAboutComponent} from "../about/about.component";

@Component({
    selector: "sg-header",
    templateUrl: "./header.component.html",
    standalone: true,
    imports: [CommonModule, TuiSvgModule, SGServerStatusComponent, SGAboutComponent]
})
export class SGHeaderComponent {

    public _timeout$: Observable<number> = this.appQuery.select(state => state.timeout);

    @ViewChild("aboutTemplate", {
        static: true
    })
    private aboutTemplate: TemplateRef<any>;

    @HostBinding("class.sg-header")
    private hostClass: boolean = true;

    constructor(private appQuery: SGAppQuery,
                private appService: SGAppService,
                @Inject(TuiDialogService) private readonly dialogs: TuiDialogService) {
    }

    public _onClick(): void {
        this.appService.updateTimeout(this.appQuery.getValue().timeout + 100);
    }

    public _onAboutClick(): void {
        this.dialogs.open(this.aboutTemplate, {
            label: "О программе",
            size: "s"
        })
            .pipe(
                // add until destroy
            )
            .subscribe();
    }
}
