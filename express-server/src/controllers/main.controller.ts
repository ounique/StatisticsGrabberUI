import {Request, Response} from "express";
import {SGMockController, SGMockControllerMethod, SGMockRequest} from "../decorators/controller.decorator";
import {SGBmsModel} from "../../../src/app/models/core/bms-model.model";
import {SGMockDataGeneratorUtil} from "../utils/generator.util";

@SGMockController({
    path: "/api/model"
})
export class SGMainController {

    @SGMockRequest({
        path: "/bmsModel",
        method: SGMockControllerMethod.GET
    })
    private getBMSModelResponse(request: Request, response: Response): void {
        response.status(200).json(<SGBmsModel>{
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
        });
    }
}
