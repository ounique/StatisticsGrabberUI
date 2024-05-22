import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from "@angular/core";
import {SGHealthDataService} from "./services/health.service";

@Component({
    selector: "sg-app",
    templateUrl: "./app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SGAppComponent implements OnInit {

    @HostBinding()
    private hostClass: boolean = true;

    constructor(private healthService: SGHealthDataService) {
    }

    public ngOnInit(): void {
        this.subscribeToFetchApplicationStatus();
    }

    private subscribeToFetchApplicationStatus(): void {
        this.healthService.getHealthCheck()
            .pipe()
            .subscribe();
    }
}
