import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {SGServerApplicationStatus} from "../models/core/server.model";
import {SGDataService} from "./data.service";
import {SGAppService} from "../state/app.service";
import {SGApplicationStartSingleRequest} from "../models/core/application-start.model";

@Injectable()
export class SGApplicationStatusService {

    constructor(private dataService: SGDataService,
                private appService: SGAppService) {
    }

    public startApplication(data: SGApplicationStartSingleRequest): Observable<SGServerApplicationStatus> {
        return this.dataService.startApplication(data)
            .pipe(
                tap((status: SGServerApplicationStatus) => {
                    this.appService.updateApplicationStatus(status);
                })
            );
    }

    public stopApplication(): Observable<SGServerApplicationStatus> {
        return this.dataService.stopApplication()
            .pipe(
                tap((status: SGServerApplicationStatus) => {
                    this.appService.updateApplicationStatus(status);
                })
            );
    }
}
