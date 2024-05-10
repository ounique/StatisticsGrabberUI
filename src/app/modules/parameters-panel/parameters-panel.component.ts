import {SGParametersPanelConfiguration} from "./model/parameters-panel.model";
import {ChangeDetectionStrategy, Component, HostBinding, Input} from "@angular/core";

@Component({
    selector: "sg-parameters-panel",
    templateUrl: "./parameters-panel.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SGParametersPanelComponent<T> {

    @Input()
    public title: string;

    @Input()
    public config: SGParametersPanelConfiguration;

    @Input()
    public value: T;

    @Input()
    public parametersWithIconsView: boolean;

    @HostBinding("class.sg-parameters-panel")
    private hostClass: boolean = true;

    constructor() {
    }
}
