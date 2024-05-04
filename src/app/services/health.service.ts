import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SGServerStatus} from "../models/core/server.model";

@Injectable({
    providedIn: "root"
})
export class SGHealthDataService {

    constructor(private http: HttpClient) {
    }

    public getHealthCheck(): Observable<SGServerStatus> {
        return this.http.get<SGServerStatus>("http://localhost:3000/api/health");
    }
}
