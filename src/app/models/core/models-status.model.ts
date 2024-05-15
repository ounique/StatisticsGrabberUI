import {SGImpellerModel} from "./impeller.model";
import {SGRuModel} from "./ru-model.model";
import {SGBmsModel} from "./bms-model.model";

export interface SGModelsOutput {
    readonly leftWing: SGModelsWing;
    readonly rightWing: SGModelsWing;
}

export interface SGModelsWing {
    readonly impellers: SGImpellerModel[];
    readonly bms: SGBmsModel[];
    readonly ru: SGRuModel[];
}

export interface SGModelUpdateRequest<Input = any, Parameters = any> {
    readonly input: Input;
    readonly parameters: Parameters;
}
