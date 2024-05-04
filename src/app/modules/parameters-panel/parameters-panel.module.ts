import {NgModule} from "@angular/core";
import {SGParametersPanelComponent} from "./parameters-panel.component";
import {CommonModule} from "@angular/common";
import {SGParameterComponent} from "../parameter/parameter.component";

@NgModule({
    imports: [CommonModule, SGParameterComponent],
    declarations: [SGParametersPanelComponent],
    exports: [SGParametersPanelComponent]
})
export class SGParametersPanelModule {

}
