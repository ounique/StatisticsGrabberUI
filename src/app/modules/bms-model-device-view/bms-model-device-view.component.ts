import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";
import {SGDataService} from "../../services/data.service";
import {interval, Observable, switchMap} from "rxjs";
import {SGBmsModel} from "../../models/core/bms-model.model";
import {SGParameterComponent} from "../parameter/parameter.component";

@Component({
    selector: "sg-bms-model-device-view",
    templateUrl: "./bms-model-device-view.component.html",
    standalone: true,
    imports: [
        CommonModule,
        SGParameterComponent
    ]
})
export class SGBmsModelDeviceViewComponent {

    // multiple calls
    // public _data$: Observable<SGBmsModel> = interval(100)
    //     .pipe(
    //         switchMap(() => {
    //             return this.service.getModelOutput();
    //         })
    //     );

    // single call
    public _data$: Observable<SGBmsModel> = this.service.getModelOutput();

    @HostBinding("class.sg-bms-model-device-view")
    private hostClass: boolean = true;

    constructor(private service: SGDataService) {
    }
}
