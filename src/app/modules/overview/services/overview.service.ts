import {Injectable} from "@angular/core";
import {BehaviorSubject, interval, Observable, switchMap, tap} from "rxjs";
import {SGModelsOutput} from "../../../models/core/models-status.model";
import {SGDataService} from "../../../services/data.service";
import {SGAppQuery} from "../../../state/app.query";

@Injectable()
export class SGOverviewService {

    private readonly isMultipleMode: boolean = true;

    private modelsOutput: BehaviorSubject<SGModelsOutput> = new BehaviorSubject<SGModelsOutput>(null);

    constructor(private dataService: SGDataService,
                private appQuery: SGAppQuery) {
    }

    public getModelsOutput(): Observable<SGModelsOutput> {
        return this.modelsOutput.asObservable();
    }

    public fetchModelsOutput(): Observable<SGModelsOutput> {
        return (!this.isMultipleMode
            ? this.dataService.getModelsOutput()
            : this.appQuery.select(state => state.config.defaultTimeout)
                    .pipe(
                        switchMap((timeout: number) => {
                            return interval(timeout)
                                .pipe(
                                    switchMap(() => {
                                        return this.dataService.getModelsOutput();
                                    })
                                );
                        })
                    )
        )
            .pipe(
                tap((data: SGModelsOutput) => {
                    this.modelsOutput.next(data);
                })
            );
    }
}
