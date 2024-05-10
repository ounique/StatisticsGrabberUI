import {Injectable} from "@angular/core";
import {SGFormConfig, SGFormGroupConfig} from "../../form/models/form.model";
import {SGGenericModelDeviceViewFormData} from "../components/generic-model-device-view-form.component";

@Injectable()
export class SGGenericModelDeviceViewFormService {

    constructor() {
    }

    public getFormConfig(data: SGGenericModelDeviceViewFormData): SGFormConfig {
        return {
            name: "modelParametersInputsForm",
            groups: [
                this.getMainGroup(data)
            ]
        };
    }

    private getMainGroup(data: SGGenericModelDeviceViewFormData): SGFormGroupConfig {
        return {
            name: "mainGroupForm",
            label: null,
            innerGroups: [
                {
                    name: "inputsInnerGroup",
                    label: "Входы",
                    controls: [
                        ...data.inputs.parameters.map((item) => {
                            return {
                                id: item.fieldKey,
                                name: item.fieldKey,
                                label: item.description,
                                value: data.data.input[item.fieldKey],
                                postfix: item.unit
                            };
                        })
                    ]
                },
                {
                    name: "parametersInnerGroup",
                    label: "Параметры",
                    controls: [
                        ...data.parameters.parameters.map((item) => {
                            return {
                                id: item.fieldKey,
                                name: item.fieldKey,
                                label: item.description,
                                value: data.data.parameters[item.fieldKey],
                                postfix: item.unit
                            };
                        })
                    ]
                }
            ]
        };
    }
}
