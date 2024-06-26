import {ChartConfiguration} from "chart.js";
import {SGModelsWing} from "../../../models/core/models-status.model";
import {SGModelOrientation} from "../../../models/core/app.model";

export type SGChartWrapperConfig = Readonly<{
    modelFieldKey: keyof SGModelsWing;
    fieldKey: string;
    description: string;
    units: string;
    seriesPrefix: string;
    orientation: SGModelOrientation;
}>;

export const SG_CHART_WRAPPER_DEFAULT_OPTIONS: ChartConfiguration["options"] = {
    elements: {
        point:{
            radius: 0
        },
        line: {
            tension: 0
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
    },
    animation: false,
    animations: {
        x: false
    }
}
