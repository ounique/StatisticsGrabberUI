import {SGModelsConfig} from "../../../models/core/app.model";
import {SGChartsConfiguration} from "../../../models/core/charts-configuration.model";

export type SGChartsConfigurationDialogData = Readonly<{
    models: SGModelsConfig[];
    configuration: SGChartsConfiguration;
}>;
