import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGModelsOutput, SGModelUpdateRequest} from "../models/core/models-status.model";
import {SGModelName, SGModelOrientation} from "../models/core/app.model";
import {SGServerApplicationStatus, SGServerStatus} from "../models/core/server.model";
import {SGApplicationStartModels} from "../models/core/application-start.model";
import {SGChartsConfiguration} from "../models/core/charts-configuration.model";
import {SGAppQuery} from "../state/app.query";

@Injectable({
    providedIn: "root"
})
export class SGDataService {

    constructor(private http: HttpClient,
                private appQuery: SGAppQuery) {
    }

    public getHealthCheck(): Observable<SGServerStatus> {
        return this.http.get<SGServerStatus>(this.appQuery.getValue().config.server.url + "/api/health");
    }

    public getModelsOutput(): Observable<SGModelsOutput> {
        return this.http.get<SGModelsOutput>(this.appQuery.getValue().config.server.url + "/api/output");
    }

    public updateModelProps(data: SGModelUpdateRequest, wing: SGModelOrientation, number: number, model: SGModelName): Observable<void> {
        return this.http.post<void>(this.appQuery.getValue().config.server.url + "/api/updateDeviceInputParameters/" + `${wing}_${model}_${number}`, data);
    }

    public startApplication(data: SGApplicationStartModels): Observable<SGServerStatus> {
        return this.http.post<SGServerStatus>(this.appQuery.getValue().config.server.url + "/api/start", data);
    }

    public stopApplication(): Observable<SGServerStatus> {
        return this.http.post<SGServerStatus>(this.appQuery.getValue().config.server.url + "/api/stop", {});
    }

    public getInitialConditions(): Observable<SGApplicationStartModels> {
        return this.http.get<SGApplicationStartModels>(this.appQuery.getValue().config.server.url + "/api/initial-conditions");
    }

    public getChartsConfiguration(): Observable<SGChartsConfiguration> {
        return this.http.get<SGChartsConfiguration>(this.appQuery.getValue().config.server.url + "/api/charts-configuration");
    }

    public updateChartsConfiguration(data: SGChartsConfiguration): Observable<SGChartsConfiguration> {
        return this.http.post<SGChartsConfiguration>(this.appQuery.getValue().config.server.url + "/api/charts-configuration", data);
    }

    public changeDeviceAvailability(device: string): Observable<unknown> {
        return this.http.post<SGChartsConfiguration>(this.appQuery.getValue().config.server.url + "/api/changeDeviceAvailability/" + device, "{}");
    }
}
