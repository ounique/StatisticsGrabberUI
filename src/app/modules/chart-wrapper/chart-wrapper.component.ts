import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnChanges,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SG_CHART_WRAPPER_DEFAULT_OPTIONS, SGChartWrapperConfig} from "./models/chart-wrapper.model";
import {SGModelsOutput} from "../../models/core/models-status.model";
import {BaseChartDirective, NgChartsModule} from "ng2-charts";
import {ChartData} from "chart.js";

@Component({
    selector: "sg-chart-wrapper",
    templateUrl: "./chart-wrapper.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [CommonModule, NgChartsModule]
})
export class SGChartWrapperComponent implements OnChanges {

    @Input()
    public config: SGChartWrapperConfig;

    @Input()
    public orientation: keyof SGModelsOutput;

    @Input()
    public data: SGModelsOutput;

    @ViewChild(BaseChartDirective)
    public chart?: BaseChartDirective;

    public _chartOptions = SG_CHART_WRAPPER_DEFAULT_OPTIONS;

    public _chartData: ChartData<"bar"> = {
        labels: ["1", "2", "3", "4", "5", "6", "7"],
        datasets: [
            {
                data: [65, 59, 80, 81, 56, 55, 40],
                label: "Series A"
            },
            {
                data: [28, 48, 40, 19, 86, 27, 90],
                label: "Series B"
            },
            {
                data: [28, 48, 40, 9, 86, 27, 90],
                label: "Series c"
            },
            {
                data: [28, 48, 0, 19, 86, 27, 90],
                label: "Series d"
            }
        ]
    };

    @HostBinding("class.sg-chart-wrapper")
    private hostClass: boolean = true;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"].currentValue) {
            this.updateChartData();
        }
    }

    public updateChartData(): void {
        // this.lineChartData.datasets.forEach((x, i) => {
        //     const num = LineChartComponent.generateNumber(i);
        //     x.data.push(num);
        // });
        // this.lineChartData?.labels?.push(
        //     `Label ${this.lineChartData.labels.length}`,
        // );

        this.chart?.update();
    }
}
