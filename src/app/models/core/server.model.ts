export enum SGServerApplicationStatus {
    IDLE = "idle",
    RUNNING = "running",
    WAITING_START = "waitingStart",
    WAITING_STOP = "waitingStop",
    ERROR = "error"
}

export interface SGServerStatus {
    readonly applicationStatus: SGServerApplicationStatus;
    readonly server1: boolean;
    readonly server2: boolean;
    readonly server3: boolean;
    readonly server4: boolean;
}
