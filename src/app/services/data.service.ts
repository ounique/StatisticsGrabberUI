import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGModelsOutput} from "../models/core/models-status.model";

@Injectable({
    providedIn: "root"
})
export class SGDataService {

    constructor(private http: HttpClient) {
    }

    public getModelsOutput(): Observable<SGModelsOutput> {
        return this.http.get<SGModelsOutput>("http://localhost:3000/api/output");
    }
}
