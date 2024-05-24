import {Injectable} from "@angular/core";
import {SGFormConfig, SGFormGroupConfig} from "../../form/models/form.model";
import {SGBmsModelInput, SGBmsModelParameters} from "../../../models/core/bms-model.model";
import {SGApplicationStartModelsWingModelData} from "../../../models/core/application-start.model";
import {SGModelName, SGModelsConfig} from "../../../models/core/app.model";

@Injectable()
export class SGModelsParametersConfigurationService {

    private config: SGModelsConfig[];

    public initialize(data: SGModelsConfig[]): void {
        this.config = data;
    }

    public getModelForm(data: SGApplicationStartModelsWingModelData, name: SGModelName): SGFormConfig {
        return {
            name: "modelParametersInputsForm",
            groups: [
                this.getModelFormGroup(data, name)
            ]
        }
    }

    private getModelFormGroup(data: SGApplicationStartModelsWingModelData, name: SGModelName): SGFormGroupConfig {
        const config = this.config.find((conf: SGModelsConfig) => conf.name === name);

        return {
            name: "mainGroupForm",
            label: null,
            innerGroups: [
                {
                    name: "inputsInnerGroup",
                    label: "Входы",
                    controls: [
                        ...config.inputs.map((item) => {
                            return {
                                id: item.name,
                                name: item.name,
                                label: item.description,
                                value: data?.input?.[item.name],
                                postfix: item.units
                            };
                        })
                    ]
                },
                {
                    name: "parametersInnerGroup",
                    label: "Параметры",
                    controls: [
                        ...config.properties.map((item) => {
                            return {
                                id: item.name,
                                name: item.name,
                                label: item.description,
                                value: data?.parameters?.[item.name],
                                postfix: item.units
                            };
                        })
                    ]
                }
            ]
        };
    }
}
