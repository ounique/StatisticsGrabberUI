import {SGGenericModel} from "./generic-model.model";

export interface SGRuModel extends SGGenericModel<SGRuModelInput, SGRuModelOutput, SGRuModelParameters> {
}

export interface SGRuModelOutput {
    readonly cpuTemperature: number;
}

export interface SGRuModelInput {
}

export interface SGRuModelParameters {
    readonly ambientTemperature: number;
}
