export interface SGBmsModel {
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
