import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGBmsModel} from "../models/core/bms-model.model";
import {SGRuModel} from "../models/core/ru-model.model";

@Injectable({
    providedIn: "root"
})
export class SGDataService {

    constructor(private http: HttpClient) {
    }

    public getBmsModelOutput(): Observable<SGBmsModel> {
        return this.http.get<SGBmsModel>("http://localhost:3000/api/model/bmsModel");
    }

    public getRuModelOutput(): Observable<SGRuModel> {
        return this.http.get<SGRuModel>("http://localhost:3000/api/model/ruModel");
    }
}
