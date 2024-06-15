export enum SGServerApplicationStatus {
    IDLE = "idle",
    RUNNING = "running",
    WAITING_START = "waitingStart",
    WAITING_STOP = "waitingStop",
    ERROR = "error"
}

export interface SGServerStatus {
    readonly applicationStatus: SGServerApplicationStatus;
    readonly apiGateway: boolean;
    readonly leftWing: boolean;
    readonly rightWing: boolean;
    readonly system: boolean;
}
