import {HttpClient} from "@angular/common/http";
import {SGAppConfigDataService} from "./services/app-config.service";
import {finalize, tap} from "rxjs";
import {SGConfig} from "./models/core/app.model";

export function appBootstrap(
    http: HttpClient,
    dataService: SGAppConfigDataService
) {
    return (): Promise<void> => new Promise(done => {
        dataService.getConfig()
            .pipe(
                tap((config: SGConfig) => {
                    console.log(config);
                }),
                finalize(() => done())
            )
            .subscribe();
    });
}
