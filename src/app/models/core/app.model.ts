export interface SGConfig {
    readonly defaultTimeout: number;
    readonly server: SGServerConfig;
    readonly models: SGModelsConfig[];
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
    readonly name: string;
    readonly description: string;
    readonly units: string;
    readonly icon?: string;
}
