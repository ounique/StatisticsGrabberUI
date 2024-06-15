import {SGModelsOutput, SGModelsWing, SGModelUpdateRequest} from "../../../src/app/models/core/models-status.model";
import {
    SGRuModel,
    SGRuModelInput,
    SGRuModelOutput,
    SGRuModelParameters
} from "../../../src/app/models/core/ru-model.model";
import {SGMockDataGeneratorUtil} from "../utils/generator.util";
import {
    SGImpellerModel,
    SGImpellerModelInput,
    SGImpellerModelOutput,
    SGImpellerModelParameters
} from "../../../src/app/models/core/impeller.model";
import {
    SGBmsModel,
    SGBmsModelInput,
    SGBmsModelOutput,
    SGBmsModelParameters
} from "../../../src/app/models/core/bms-model.model";
import {SGModelName, SGModelOrientation} from "../../../src/app/models/core/app.model";
import {SGServerApplicationStatus, SGServerStatus} from "../../../src/app/models/core/server.model";
import {SGApplicationStartModels} from "../../../src/app/models/core/application-start.model";
import {SGChartsConfiguration} from "../../../src/app/models/core/charts-configuration.model";
import {SGGenericModel} from "../../../src/app/models/core/generic-model.model";

export class SGMockMainService {

    private applicationStatus: SGServerApplicationStatus = SGServerApplicationStatus.IDLE;

    private chartsConfiguration: Record<string, boolean> = {};

    private totalAngleSpeed: number = 0;

    private applicationStatusTransitions: Record<SGServerApplicationStatus, SGServerApplicationStatus> = {
        [SGServerApplicationStatus.IDLE]: SGServerApplicationStatus.WAITING_START,
        [SGServerApplicationStatus.WAITING_START]: SGServerApplicationStatus.RUNNING,
        [SGServerApplicationStatus.RUNNING]: SGServerApplicationStatus.WAITING_STOP,
        [SGServerApplicationStatus.WAITING_STOP]: SGServerApplicationStatus.IDLE,
        [SGServerApplicationStatus.ERROR]: SGServerApplicationStatus.ERROR
    };

    private modelOutputs: SGModelsOutput = {
        leftWing: this.generateWingData(),
        rightWing: this.generateWingData()
    };

    private startProps: SGApplicationStartModels = this.getFirstModelStartProps();

    constructor() {
        this.totalAngleSpeed = this.modelOutputs.leftWing.impellers.reduce((sum, dev) => {
            return sum + dev.input.destinationAngleSpeed;
        }, 0);
    }


    public getChartsConfiguration(): SGChartsConfiguration {
        return this.chartsConfiguration;
    }

    public updateChartsConfiguration(data: SGChartsConfiguration): SGChartsConfiguration {
        return this.chartsConfiguration = data;
    }

    public getModelStartProps(): SGApplicationStartModels {
        return this.startProps;
    }

    public updateModelOutputs(): void {
        this.modelOutputs = {
            leftWing: this.updateWingModelOutputs(this.modelOutputs.leftWing),
            rightWing: this.updateWingModelOutputs(this.modelOutputs.rightWing),
        };
    }

    public getApplicationStatus(): SGServerApplicationStatus {
        return this.applicationStatus;
    }

    public updateAppStatus(): SGServerStatus {
        this.setNextStatus();
        setTimeout(() => {
            this.setNextStatus();
        }, 3000);

        return {
            applicationStatus: this.applicationStatus,
            system: false,
            apiGateway: false,
            rightWing: false,
            leftWing: false
        };
    }

    public getModelsOutput(): SGModelsOutput {
        return this.modelOutputs;
    }

    public updateModelParameters(type: SGModelName, wing: SGModelOrientation, number: number, data: SGModelUpdateRequest): void {
        let wingData = wing === SGModelOrientation.RIGHT_WING ? this.modelOutputs.rightWing : this.modelOutputs.leftWing;

        switch (type) {
            case SGModelName.BMS_MODEL:
                wingData = this.updateBmsModelProps(data, number, wingData);
                break;
            case SGModelName.IMPELLER_MODEL:
                wingData = this.updateImpellerModelProps(data, number, wingData);
                break;
            case SGModelName.RU_MODEL:
                wingData = this.updateRuModelProps(data, number, wingData);
                break;
        }

        if (wing === SGModelOrientation.RIGHT_WING) {
            this.modelOutputs = {
                ...this.modelOutputs,
                rightWing: wingData
            };
        } else {
            this.modelOutputs = {
                ...this.modelOutputs,
                leftWing: wingData
            };
        }
    }

    public updateDeviceAvailability(type: SGModelName, wing: SGModelOrientation, number: number): void {
        if (wing === SGModelOrientation.RIGHT_WING) {
            this.modelOutputs = {
                ...this.modelOutputs,
                rightWing: this.updateDeviceAvailabilityWing(this.modelOutputs.rightWing, type, number)
            };
        } else {
            this.modelOutputs = {
                ...this.modelOutputs,
                leftWing: this.updateDeviceAvailabilityWing(this.modelOutputs.leftWing, type, number)
            };
        }
    }

    private updateDeviceAvailabilityWing(wing: SGModelsWing, type: SGModelName, n: number): SGModelsWing {
        return {
            ru: type !== SGModelName.RU_MODEL ? wing.ru : this.updateDeviceAvailabilityWingModel(wing.ru, n),
            bms: type !== SGModelName.BMS_MODEL ? wing.bms : this.updateDeviceAvailabilityWingModel(wing.bms, n),
            impellers: type !== SGModelName.IMPELLER_MODEL ? wing.impellers : this.updateImpellerAvailabilityWingModel(wing.impellers, n)
        };
    }

    private updateImpellerAvailabilityWingModel(devices: SGImpellerModel[], n: number): SGImpellerModel[] {
        const availableDevices = devices.filter((dev) => dev.isSwitchedOn).length +
            (devices[n].isSwitchedOn ? -1 : 1);

        return devices.map((item, idx) => {
            if (idx === n) {
                return {
                    ...item,
                    output: {
                        ...item.output,
                        angleSpeed: 0
                    },
                    isSwitchedOn: !item.isSwitchedOn
                };
            }

            return {
                ...item,
                output: {
                    ...item.output,
                    angleSpeed: item.isSwitchedOn ? this.totalAngleSpeed / availableDevices : 0
                }
            };
        });
    }

    private updateDeviceAvailabilityWingModel(devices: SGGenericModel[], n: number): SGGenericModel[] {
        return devices.map((item, idx) => {
            if (idx === n) {
                return {
                    ...item,
                    isSwitchedOn: !item.isSwitchedOn
                };
            }

            return item;
        })
    }

    private updateRuModelProps(data: SGModelUpdateRequest<SGRuModelInput, SGRuModelParameters>, number: number, wing: SGModelsWing): SGModelsWing {
        return {
            ...wing,
            ru: wing.ru.map((item, idx) => {
                if (idx === number) {
                    return {
                        ...item,
                        input: data.input,
                        parameters: data.parameters
                    };
                }

                return item;
            })
        };
    }

    private updateBmsModelProps(data: SGModelUpdateRequest<SGBmsModelInput, SGBmsModelParameters>, number: number, wing: SGModelsWing): SGModelsWing {
        return {
            ...wing,
            bms: wing.bms.map((item, idx) => {
                if (idx === number) {
                    return {
                        ...item,
                        input: data.input,
                        parameters: data.parameters
                    };
                }

                return item;
            })
        };
    }

    private updateImpellerModelProps(data: SGModelUpdateRequest<SGImpellerModelInput, SGImpellerModelParameters>, number: number, wing: SGModelsWing): SGModelsWing {
        return {
            ...wing,
            impellers: wing.impellers.map((item, idx) => {
                if (idx === number) {
                    return {
                        ...item,
                        input: data.input,
                        parameters: data.parameters
                    };
                }

                return item;
            })
        };
    }

    private updateWingModelOutputs(wing: SGModelsWing): SGModelsWing {
        return {
            ru: wing.ru.map((model: SGRuModel) => {
                return {
                    ...model,
                    output: this.updateRuModelOutput(model.output)
                };
            }),
            bms: wing.bms.map((model: SGBmsModel) => {
                return {
                    ...model,
                    output: this.updateBmsModelOutput(model.output)
                };
            }),
            impellers: wing.impellers.map((model: SGImpellerModel) => {
                return {
                    ...model,
                    output: this.updateImpellerModelOutput(model.output)
                };
            })
        };
    }

    private generateWingData(): SGModelsWing {
        return {
            ru: SGMockDataGeneratorUtil.generateArray(1, () => this.generateRuModel()),
            bms: SGMockDataGeneratorUtil.generateArray(1, () => this.generateBmsModel()),
            impellers: SGMockDataGeneratorUtil.generateArray(9, () => this.generateImpellerModel())
        };
    }

    private generateImpellerModel(): SGImpellerModel {
        return {
            output: this.generateImpellerModelOutput(),
            input: this.generateImpellerModelInput(),
            parameters: this.generateImpellerModelParameters(),
            isSwitchedOn: true
        };
    }

    private updateImpellerModelOutput(output: SGImpellerModelOutput): SGImpellerModelOutput {
        return {
            angleSpeed: output.angleSpeed > 1 ? output.angleSpeed + SGMockDataGeneratorUtil.generateDouble(-1, 1) : 0,
            power: output.power + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            current: output.current + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            phasesVoltages: output.phasesVoltages + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            phasesCurents: output.phasesCurents + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            id: output.id + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            iq: output.iq + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            cpuTemperature: output.cpuTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            switchesTempratures: output.switchesTempratures + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            tempSwHosts1: output.tempSwHosts1 + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            nSwHosts1: output.nSwHosts1 + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            tempSwHosts2: output.tempSwHosts2 + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            nSwHosts2: output.nSwHosts2 + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            tempSwAvg: output.tempSwAvg + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            windingsTemperatures: output.windingsTemperatures + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            tempWMax: output.tempWMax + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            maxMaxSwitchTemperature: output.maxMaxSwitchTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            maxMaxWindingTemperature: output.maxMaxWindingTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1)
        };
    }

    private generateImpellerModelOutput(): SGImpellerModelOutput {
        return {
            angleSpeed: SGMockDataGeneratorUtil.generateDouble(3000, 3000),
            power: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            current: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            phasesVoltages: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            phasesCurents: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            id: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            iq: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cpuTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            switchesTempratures: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            tempSwHosts1: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            nSwHosts1: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            tempSwHosts2: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            nSwHosts2: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            tempSwAvg: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            windingsTemperatures: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            tempWMax: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            maxMaxSwitchTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            maxMaxWindingTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000)
        };
    }

    private generateImpellerModelParameters(): SGImpellerModelParameters {
        return {
            airDencity: SGMockDataGeneratorUtil.generateDouble(0, 200),
            airSpeed: SGMockDataGeneratorUtil.generateDouble(0, 200),
            ambientTemperature: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateImpellerModelInput(): SGImpellerModelInput {
        return {
            destinationAngleSpeed: SGMockDataGeneratorUtil.generateDouble(3000, 3000),
            sourceVoltage: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateBmsModel(): SGBmsModel {
        return {
            output: this.generateBmsModelOutput(),
            input: this.generateBmsModelInput(),
            parameters: this.generateBmsModelParameters(),
            isSwitchedOn: true
        };
    }

    private updateBmsModelOutput(output: SGBmsModelOutput): SGBmsModelOutput {
        return {
            voltage: output.voltage + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            cellsVoltage: output.cellsVoltage + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            cellsAvgVoltage: output.cellsAvgVoltage + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            current: output.current + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            cellsTemperature: output.cellsTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            balanceTemperature: output.balanceTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            switchTemperature: output.switchTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            batteryMaxTemp: output.batteryMaxTemp + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            batteryMaxTempNumber: output.batteryMaxTempNumber,
            cellMinVoltage: output.cellMinVoltage + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            cellMinVoltageNumber: output.cellMinVoltageNumber,
            maxDisplace: output.maxDisplace + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            qs: output.qs + SGMockDataGeneratorUtil.generateDouble(-1, 1),
            soc: output.soc + SGMockDataGeneratorUtil.generateDouble(-1, 1)
        };
    }

    private generateBmsModelOutput(): SGBmsModelOutput {
        return {
            voltage: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cellsVoltage: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cellsAvgVoltage: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            current: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cellsTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            balanceTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            switchTemperature: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            batteryMaxTemp: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            batteryMaxTempNumber: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cellMinVoltage: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            cellMinVoltageNumber: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            maxDisplace: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            qs: SGMockDataGeneratorUtil.generateDouble(0, 10000),
            soc: SGMockDataGeneratorUtil.generateDouble(0, 10000)
        };
    }

    private generateBmsModelParameters(): SGBmsModelParameters {
        return {
            capacity: SGMockDataGeneratorUtil.generateDouble(0, 200),
            cellVoltage: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateBmsModelInput(): SGBmsModelInput {
        return {
            consumedCurrent: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateRuModel(): SGRuModel {
        return {
            output: this.generateRuModelOutput(),
            input: this.generateRuModelInput(),
            parameters: this.generateRuModelParameters(),
            isSwitchedOn: true
        };
    }

    private updateRuModelOutput(output: SGRuModelOutput): SGRuModelOutput {
        return {
            cpuTemperature: output.cpuTemperature + SGMockDataGeneratorUtil.generateDouble(-1, 1)
        };
    }

    private generateRuModelOutput(): SGRuModelOutput {
        return {
            cpuTemperature: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateRuModelParameters(): SGRuModelParameters {
        return {
            ambientTemperature: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateRuModelInput(): SGRuModelInput {
        return {};
    }

    private setNextStatus(): void {
        this.applicationStatus = this.applicationStatusTransitions[this.applicationStatus];
    }

    private getFirstModelStartProps(): SGApplicationStartModels {
        this.modelOutputs.leftWing;
        return {
            leftWing: {
                ...this.modelOutputs.leftWing
            },
            rightWing: {
                ...this.modelOutputs.rightWing
            }
        };
    }
}
