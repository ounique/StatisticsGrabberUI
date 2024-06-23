import {CommonModule} from "@angular/common";
import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {TuiTabsModule} from "@taiga-ui/kit";
import {SGChartsGridComponent} from "../charts-grid/charts-grid.component";
import {SGDevicesGridComponent} from "../devices-grid/devices-grid.component";
import {Observable} from "rxjs";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {SGOverviewService} from "./services/overview.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
    selector: "sg-overview",
    templateUrl: "./overview.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        CommonModule,
        TuiTabsModule,
        SGChartsGridComponent,
        SGDevicesGridComponent
    ],
    providers: [
        SGOverviewService
    ]
})
export class SGOverviewComponent implements OnInit {

    public _data$: Observable<SGModelsOutput> = this.service.getModelsOutput();

    public _activeTabIndex: number = 1;

    @HostBinding("class.sg-overview")
    private hostClass: boolean = true;

    constructor(private service: SGOverviewService) {
    }

    public ngOnInit(): void {
        this.service.fetchModelsOutput()
            .pipe(
                untilDestroyed(this)
            )
            .subscribe();
    }
}
