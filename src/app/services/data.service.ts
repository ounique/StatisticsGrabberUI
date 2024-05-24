import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGModelsOutput, SGModelUpdateRequest} from "../models/core/models-status.model";
import {SGModelName, SGModelOrientation} from "../models/core/app.model";
import {SGServerApplicationStatus, SGServerStatus} from "../models/core/server.model";
import {SGApplicationStartModels} from "../models/core/application-start.model";

@Injectable({
    providedIn: "root"
})
export class SGDataService {

    constructor(private http: HttpClient) {
    }

    public getHealthCheck(): Observable<SGServerStatus> {
        return this.http.get<SGServerStatus>("http://localhost:3000/api/health");
    }

    public getModelsOutput(): Observable<SGModelsOutput> {
        return this.http.get<SGModelsOutput>("http://localhost:3000/api/output");
    }

    public updateModelProps(data: SGModelUpdateRequest, wing: SGModelOrientation, number: number, model: SGModelName): Observable<void> {
        return this.http.post<void>("http://localhost:3000/api/modelConfiguration:update", data, {
            params: {
                wing: wing,
                number: number,
                modelType: model
            }
        });
    }

    public statusApplication(): Observable<SGServerApplicationStatus> {
        return this.http.get<SGServerApplicationStatus>("http://localhost:3000/api/application:status");
    }

    public startApplication(data: unknown): Observable<SGServerApplicationStatus> {
        return this.http.post<SGServerApplicationStatus>("http://localhost:3000/api/application:start", data);
    }

    public stopApplication(): Observable<SGServerApplicationStatus> {
        return this.http.post<SGServerApplicationStatus>("http://localhost:3000/api/application:stop", {});
    }

    public getInitialConditions(): Observable<SGApplicationStartModels> {
        return this.http.get<SGApplicationStartModels>("http://localhost:3000/api/initial-conditions");
    }
}
