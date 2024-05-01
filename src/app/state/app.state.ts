export interface SGAppState {
    models: [];
    timeout: number; // waiting time in 'ms'
}

export function createInitialAppState(): SGAppState {
    return {
        models: [],
        timeout: 500
    };
}
