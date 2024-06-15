import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {SGServerApplicationStatus, SGServerStatus} from "../models/core/server.model";
import {SGDataService} from "./data.service";
import {SGAppService} from "../state/app.service";
import {SGApplicationStartModels, SGApplicationStartSingleRequest} from "../models/core/application-start.model";

@Injectable()
export class SGApplicationStatusService {

    constructor(private dataService: SGDataService,
                private appService: SGAppService) {
    }

    public startApplication(data: SGApplicationStartModels): Observable<SGServerStatus> {
        return this.dataService.startApplication(data)
            .pipe(
                tap((status: SGServerStatus) => {
                    this.appService.updateApplicationStatus(status.applicationStatus);
                })
            );
    }

    public stopApplication(): Observable<SGServerStatus> {
        return this.dataService.stopApplication()
            .pipe(
                tap((status: SGServerStatus) => {
                    this.appService.updateApplicationStatus(status.applicationStatus);
                })
            );
    }
}
