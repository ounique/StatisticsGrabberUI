import {SGGenericModel} from "./generic-model.model";

export interface SGImpellerModel extends SGGenericModel<SGImpellerModelInput, SGImpellerModelOutput, SGImpellerModelParameters> {
}

export interface SGImpellerModelInput {
    readonly destinationAngleSpeed: number;
    readonly sourceVoltage: number;
}

export interface SGImpellerModelParameters {
    readonly airDencity: number;
    readonly airSpeed: number;
    readonly ambientTemperature: number;
}

export interface SGImpellerModelOutput {
    readonly angleSpeed: number;
    readonly power: number;
    readonly current: number;
    readonly phasesVoltages: number;
    readonly phasesCurents: number;
    readonly id: number;
    readonly iq: number;
    readonly cpuTemperature: number;
    readonly switchesTempratures: number;
    readonly tempSwHosts1: number;
    readonly nSwHosts1: number;
    readonly tempSwHosts2: number;
    readonly nSwHosts2: number;
    readonly tempSwAvg: number;
    readonly windingsTemperatures: number;
    readonly tempWMax: number;
    readonly maxMaxSwitchTemperature: number;
    readonly maxMaxWindingTemperature: number;
}
