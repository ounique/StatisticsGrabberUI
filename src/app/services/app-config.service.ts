import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGConfig} from "../models/core/app.model";

@Injectable({
    providedIn: "root"
})
export class SGAppConfigDataService {

    constructor(private http: HttpClient) {
    }

    public getConfig(): Observable<SGConfig> {
        return this.http.get<SGConfig>("/assets/config/config.json");
    }
}
