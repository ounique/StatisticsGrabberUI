import {ChartConfiguration} from "chart.js";
import {SGModelsWing} from "../../../models/core/models-status.model";

export type SGChartWrapperConfig = Readonly<{
    modelFieldKey: keyof SGModelsWing;
    fieldKey: string;
    description: string;
    units: string;
    seriesPrefix: string;
}>;

export const SG_CHART_WRAPPER_DEFAULT_OPTIONS: ChartConfiguration["options"] = {
    elements: {
        line: {
            tension: 0.3
        }
    },
    interaction: {
        mode: "index",
        intersect: false
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
        x: {
            display: false
        },
        y: {
            min: 0
        }
    },
    plugins: {
        legend: {
            display: true
        }
    }
}
