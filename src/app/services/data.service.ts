import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGModelsOutput, SGModelUpdateRequest} from "../models/core/models-status.model";
import {SGModelName, SGModelOrientation} from "../models/core/app.model";

@Injectable({
    providedIn: "root"
})
export class SGDataService {

    constructor(private http: HttpClient) {
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
}
