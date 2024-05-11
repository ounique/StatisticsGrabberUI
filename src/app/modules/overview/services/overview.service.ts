import {Injectable} from "@angular/core";
import {interval, Observable, switchMap} from "rxjs";
import {SGModelsOutput} from "../../../models/core/models-status.model";
import {SGDataService} from "../../../services/data.service";
import {SGAppQuery} from "../../../state/app.query";

@Injectable()
export class SGOverviewService {

    private readonly isMultipleMode: boolean = false;

    constructor(private dataService: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public getModelsOutput(): Observable<SGModelsOutput> {
        return !this.isMultipleMode
            ? this.dataService.getModelsOutput()
            : this.appQuery.select(state => state.config.defaultTimeout)
                    .pipe(
                        switchMap((timeout: number) => {
                            return interval(timeout)
                                .pipe(
                                    switchMap(() => this.dataService.getModelsOutput())
                                );
                        })
                    );
    }
}
