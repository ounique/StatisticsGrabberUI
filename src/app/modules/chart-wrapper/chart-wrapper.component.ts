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
        labels: [],
        datasets: []
    };

    private readonly MAXIMUM_POINTS_NUMBERS_INTERVAL: number = 20;

    private readonly OFFSET_POINTS_TO_REMOVE: number[] = Array(10).fill(0);

    @HostBinding("class.sg-chart-wrapper")
    private hostClass: boolean = true;

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes["data"].firstChange) {
            this.initChartData();
        }

        if (!changes["data"].firstChange && changes["data"].currentValue) {
            this.updateChartData();
        }
    }

    public initChartData(): void {
        this._chartData.labels = [];
        this._chartData.datasets.push(
            ...this.data[this.orientation][this.config.modelFieldKey].map((_, idx) => {
                return {
                    data: [],
                    label: this.config.seriesPrefix + " #" + (idx + 1).toString()
                };
            })
        )
    }

    public updateChartData(): void {
        if (this.chart) {
            this.data[this.orientation][this.config.modelFieldKey].forEach((val, idx) => {
                if (this._chartData.datasets[idx].data.length > this.MAXIMUM_POINTS_NUMBERS_INTERVAL) {
                    this.OFFSET_POINTS_TO_REMOVE.forEach(() => this._chartData.datasets[idx].data.shift());
                }
                this._chartData.datasets[idx].data.push(val.output[this.config.fieldKey]);
            });
            if (this._chartData.labels.length > this.MAXIMUM_POINTS_NUMBERS_INTERVAL) {
                this.OFFSET_POINTS_TO_REMOVE.forEach(() => this._chartData.labels.shift());
            }
            this._chartData.labels.push(
                `${this._chartData.labels.length}`,
            );
            this.chart.update();
        }
    }
}
