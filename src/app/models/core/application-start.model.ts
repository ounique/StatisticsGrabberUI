import {SGRuModelInput, SGRuModelParameters} from "./ru-model.model";
import {SGImpellerModelInput, SGImpellerModelParameters} from "./impeller.model";
import {SGBmsModelInput, SGBmsModelParameters} from "./bms-model.model";

export interface SGApplicationStartModels {
    readonly leftWing: SGApplicationStartModelsWingData;
    readonly rightWing: SGApplicationStartModelsWingData;
}

export interface SGApplicationStartModelsWingData {
    readonly ru: SGApplicationStartModelsWingModelData<SGRuModelInput, SGRuModelParameters>[];
    readonly impellers: SGApplicationStartModelsWingModelData<SGImpellerModelInput, SGImpellerModelParameters>[];
    readonly bms: SGApplicationStartModelsWingModelData<SGBmsModelInput, SGBmsModelParameters>[];
}

export interface SGApplicationStartModelsWingModelData<Input, Parameters> {
    readonly input: Input;
    readonly parameters: Parameters;
}
