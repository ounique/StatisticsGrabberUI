import {ChangeDetectionStrategy, Component, HostBinding, Inject, TemplateRef, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SGAppQuery} from "../../state/app.query";
import {SGAppService} from "../../state/app.service";
import {TuiDialogService, TuiSvgModule} from "@taiga-ui/core";
import {SGAboutComponent} from "../about/about.component";
import {SGApplicationStatusComponent} from "./components/application-status.component";
import {SGServerStatusComponent} from "./components/server-status.component";
import {SGPoolingIntervalComponent} from "./components/pooling-interval.component";

@Component({
    selector: "sg-header",
    templateUrl: "./header.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, TuiSvgModule, SGPoolingIntervalComponent, SGServerStatusComponent, SGAboutComponent, SGApplicationStatusComponent, SGServerStatusComponent]
})
export class SGHeaderComponent {

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
