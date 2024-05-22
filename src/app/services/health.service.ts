import {Injectable} from "@angular/core";
import {interval, Observable, switchMap, tap} from "rxjs";
import {SGServerStatus} from "../models/core/server.model";
import {SGDataService} from "./data.service";
import {SGAppService} from "../state/app.service";

@Injectable({
    providedIn: "root"
})
export class SGHealthDataService {

    private delay: number = 5000;

    constructor(private dataService: SGDataService,
                private appService: SGAppService) {
    }

    public getHealthCheck(): Observable<SGServerStatus> {
        return this.dataService.getHealthCheck()
            .pipe(
                tap((status: SGServerStatus) => {
                    this.appService.updateServerStatus(status);
                }),
                switchMap(() => {
                    return interval(this.delay)
                        .pipe(
                            switchMap(() => {
                                return this.dataService.getHealthCheck()
                                    .pipe(
                                        tap((status: SGServerStatus) => {
                                            this.appService.updateServerStatus(status);
                                        })
                                    )
                            })
                        );
                })
            );
    }
}
