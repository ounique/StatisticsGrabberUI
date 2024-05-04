import {HttpClient} from "@angular/common/http";
import {SGAppConfigDataService} from "./services/app-config.service";
import {finalize, forkJoin, tap} from "rxjs";
import {SGConfig} from "./models/core/app.model";
import {SGHealthDataService} from "./services/health.service";
import {SGAppService} from "./state/app.service";
import {applyTransaction} from "@datorama/akita";

export function appBootstrap(
    http: HttpClient,
    dataService: SGAppConfigDataService,
    healthDataService: SGHealthDataService,
    appService: SGAppService
) {
    return (): Promise<void> => new Promise(done => {
        forkJoin([
            dataService.getConfig(),
            healthDataService.getHealthCheck()
        ])
            .pipe(
                tap(([config, health]) => {
                    applyTransaction(() => {
                        appService.updateConfig(config);
                        appService.updateServerStatus(health);
                    });
                }),
                finalize(() => done())
            )
            .subscribe();
    });
}
