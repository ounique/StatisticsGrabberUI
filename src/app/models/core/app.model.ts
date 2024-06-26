import {SGModelsWing} from "./models-status.model";

export interface SGConfig {
    readonly defaultTimeout: number;
    readonly availableTimeouts: number[];
    readonly numberFormat: SGConfigNumberFormat;
    readonly server: SGServerConfig;
    readonly models: SGModelsConfig[];
}

export interface SGConfigNumberFormat {
    readonly thousandsDelimiter: string;
    readonly precision: number;
    readonly decimalDelimiter: string;
}

export interface SGServerConfig {
    readonly url: string;
}

export interface SGModelsConfig {
    readonly name: string;
    readonly description: string;
    readonly properties: SGModelPropertyConfig[];
    readonly inputs: SGModelPropertyConfig[];
    readonly outputs: SGModelPropertyConfig[];
}

export interface SGModelPropertyConfig {
    readonly name: SGModelName;
    readonly description: string;
    readonly units: string;
    readonly icon?: string;
}

export enum SGModelName {
    BMS_MODEL = "BMS",
    RU_MODEL = "RU",
    IMPELLER_MODEL = "Imp"
}

export enum SGModelOrientation {
    LEFT_WING = "leftWing",
    RIGHT_WING = "rightWing"
}

export const SG_MODEL_NAME_TO_SERVER_FIELD_MAPPING: Record<SGModelName, keyof SGModelsWing> = {
    [SGModelName.RU_MODEL]: "ru",
    [SGModelName.IMPELLER_MODEL]: "impellers",
    [SGModelName.BMS_MODEL]: "bms"
};
