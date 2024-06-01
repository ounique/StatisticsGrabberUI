import {Pipe, PipeTransform} from "@angular/core";
import {SGChartWrapperConfig} from "../../chart-wrapper/models/chart-wrapper.model";
import {SGChartsConfiguration} from "../../../models/core/charts-configuration.model";
import {SGModelName, SGModelOrientation} from "../../../models/core/app.model";

@Pipe({
    name: "sgChartsFilter",
    standalone: true
})
export class SGChartsFilterPipe implements PipeTransform {

    private modelNameMapping: Record<SGChartWrapperConfig["modelFieldKey"], SGModelName> = {
        ["ru"]: SGModelName.RU_MODEL,
        ["impellers"]: SGModelName.IMPELLER_MODEL,
        ["bms"]: SGModelName.BMS_MODEL
    };

    public transform(value: SGChartWrapperConfig[], configuration: SGChartsConfiguration): SGChartWrapperConfig[] {
        if (!configuration) {
            return [];
        }

        // Object.keys(formValue).reduce((obj: SGChartsConfiguration, key: string) => {
        //     if (["leftWing", "rightWing"].includes(key)) {
        //         return obj;
        //     }
        //
        //     const [modelName, controlName] = key.split("_");
        //
        //     if (formValue[key]) {
        //         if (leftWing) {
        //             obj[`${this.orientations.LEFT_WING}_${this.modelNameMapping[modelName]}_${controlName}`] = formValue[key];
        //         }
        //
        //         if (rightWing) {
        //             obj[`${this.orientations.RIGHT_WING}_${this.modelNameMapping[modelName]}_${controlName}`] = formValue[key];
        //         }
        //     }
        //
        //     return obj;
        // }, {});

        const isLeftWing = configuration["leftWing"];
        const isRightWing = configuration["rightWing"];

        return value
            .filter((item) => {
                if (isLeftWing && isRightWing) {
                    return true;
                }

                if (isLeftWing) {
                    return item.orientation === SGModelOrientation.LEFT_WING;
                }

                return item.orientation === SGModelOrientation.RIGHT_WING;
            })
            .filter((item) => {
                return configuration[`${this.modelNameMapping[item.modelFieldKey]}_${item.fieldKey}`];
            });
    }
}
