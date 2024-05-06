import {SGGenericModel} from "./generic-model.model";

export interface SGBmsModel extends SGGenericModel<SGBmsModelInput, SGBmsModelOutput, SGBmsModelParameters> {
}

export interface SGBmsModelParameters {
    readonly capacity: number;
    readonly cellVoltage: number;
}

export interface SGBmsModelInput {
    readonly consumedCurrent: number;
}

export interface SGBmsModelOutput {
    readonly voltage: number;
    readonly cellsVoltage: number;
    readonly cellsAvgVoltage: number;
    readonly current: number;
    readonly cellsTemperature: number;
    readonly balanceTemperature: number;
    readonly switchTemperature: number;
    readonly batteryMaxTemp: number;
    readonly batteryMaxTempNumber: number;
    readonly cellMinVoltage: number;
    readonly cellMinVoltageNumber: number;
    readonly maxDisplace: number;
    readonly qs: number;
    readonly soc: number;
}
