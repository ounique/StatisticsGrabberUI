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

export class SGMockMainService {

    private modelOutputs: SGModelsOutput = {
        leftWing: this.generateWingData(),
        rightWing: this.generateWingData()
    };

    public updateModelOutputs(): void {
        this.modelOutputs = {
            leftWing: this.updateWingModelOutputs(this.modelOutputs.leftWing),
            rightWing: this.updateWingModelOutputs(this.modelOutputs.rightWing),
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
                    output: this.generateRuModelOutput()
                };
            }),
            bms: wing.bms.map((model: SGBmsModel) => {
                return {
                    ...model,
                    output: this.generateBmsModelOutput()
                };
            }),
            impellers: wing.impellers.map((model: SGImpellerModel) => {
                return {
                    ...model,
                    output: this.generateImpellerModelOutput()
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
            parameters: this.generateImpellerModelParameters()
        };
    }

    private generateImpellerModelOutput(): SGImpellerModelOutput {
        return {
            angleSpeed: SGMockDataGeneratorUtil.generateDouble(0, 10000),
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
            destinationAngleSpeed: SGMockDataGeneratorUtil.generateDouble(0, 200),
            sourceVoltage: SGMockDataGeneratorUtil.generateDouble(0, 200)
        };
    }

    private generateBmsModel(): SGBmsModel {
        return {
            output: this.generateBmsModelOutput(),
            input: this.generateBmsModelInput(),
            parameters: this.generateBmsModelParameters()
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
            parameters: this.generateRuModelParameters()
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
}
