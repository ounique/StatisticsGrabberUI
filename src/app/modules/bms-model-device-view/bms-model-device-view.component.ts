import {CommonModule} from "@angular/common";
import {Component, HostBinding} from "@angular/core";
import {SGDataService} from "../../services/data.service";
import {delay, interval, Observable, switchMap} from "rxjs";
import {SGBmsModel} from "../../models/core/bms-model.model";
import {SGParameterComponent} from "../parameter/parameter.component";
import {SGAppService} from "../../state/app.service";
import {SGAppQuery} from "../../state/app.query";
import {TuiSvgModule} from "@taiga-ui/core";

@Component({
    selector: "sg-bms-model-device-view",
    templateUrl: "./bms-model-device-view.component.html",
    standalone: true,
    imports: [
        CommonModule,
        SGParameterComponent,
        TuiSvgModule
    ]
})
export class SGBmsModelDeviceViewComponent {

    // multiple calls
    // public _data$: Observable<SGBmsModel> = this.appQuery.select(state => state.timeout)
    //     .pipe(
    //         switchMap((timeout: number) => {
    //             return interval(timeout)
    //                 .pipe(
    //                     switchMap(() => this.service.getModelOutput())
    //                 );
    //         })
    //     );

    // single call
    public _data$: Observable<SGBmsModel> = this.service.getModelOutput();

    @HostBinding("class.sg-bms-model-device-view")
    private hostClass: boolean = true;

    constructor(private service: SGDataService,
                private appQuery: SGAppQuery) {
    }
}
