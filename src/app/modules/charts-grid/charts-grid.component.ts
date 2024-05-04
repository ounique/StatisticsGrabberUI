import {ChangeDetectionStrategy, Component, HostBinding} from "@angular/core";
import {CommonModule} from "@angular/common";

@Component({
    selector: "sg-charts-grid",
    templateUrl: "./charts-grid.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule]
})
export class SGChartsGridComponent {

    @HostBinding("class.sg-charts-grid")
    private hostClass: boolean = true;
}
