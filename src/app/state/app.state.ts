export interface SGAppState {
    models: [];
    timeout: number; // waiting time in 'ms'
    serverStatuses: Record<1 | 2 | 3 | 4, boolean>;
}

export function createInitialAppState(): SGAppState {
    return {
        models: [],
        timeout: 500,
        serverStatuses: {
            1: false,
            2: false,
            3: true,
            4: false
        }
    };
}
