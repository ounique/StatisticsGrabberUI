import {Request, Response} from "express";
import {SGMockController, SGMockControllerMethod, SGMockRequest} from "../decorators/controller.decorator";
import {SGServerStatus} from "../../../src/app/models/core/server.model";
import {SGMockMainService} from "../services/main.service";
import {SGModelName, SGModelOrientation} from "../../../src/app/models/core/app.model";

@SGMockController({
    path: "/api"
})
export class SGMainController {

    public mockMainService: SGMockMainService = new SGMockMainService();

    @SGMockRequest({
        path: "/health",
        method: SGMockControllerMethod.GET
    })
    private healthCheck(request: Request, response: Response): void {
        response.status(200).json(<SGServerStatus>{
            applicationStatus: this.mockMainService.getApplicationStatus(),
            apiGateway: true,
            leftWing: true,
            rightWing: true,
            system: true
        })
    }

    @SGMockRequest({
        path: "/charts-configuration",
        method: SGMockControllerMethod.GET
    })
    private getChartsConfiguration(request: Request, response: Response): void {
        response.status(200)
            .json(this.mockMainService.getChartsConfiguration());
    }

    @SGMockRequest({
        path: "/charts-configuration",
        method: SGMockControllerMethod.POST
    })
    private updateChartsConfiguration(request: Request, response: Response): void {
        const data = request.body;

        response.status(200)
            .json(this.mockMainService.updateChartsConfiguration(data));
    }

    @SGMockRequest({
        path: "/output",
        method: SGMockControllerMethod.GET
    })
    private getModelsOutputResponse(request: Request, response: Response): void {
        this.mockMainService.updateModelOutputs();

        response.status(200).json(
            this.mockMainService.getModelsOutput()
        );
    }

    @SGMockRequest({
        path: "/updateDeviceInputParameters/:device",
        method: SGMockControllerMethod.POST
    })
    private updateDeviceInputParameters(request: Request, response: Response): void {
        const data = request.body;
        const [wing, modelName, n] = request.params.device.split("_");

        this.mockMainService.updateModelParameters(
            modelName as SGModelName,
            wing as SGModelOrientation,
            Number(n),
            data
        );

        response.status(200).json();
    }


    @SGMockRequest({
        path: "/changeDeviceAvailability/:device",
        method: SGMockControllerMethod.POST
    })
    private changeDeviceAvailability(request: Request, response: Response): void {
        const [wing, modelName, n] = request.params.device.split("_");
        this.mockMainService.updateDeviceAvailability(modelName as SGModelName, wing as SGModelOrientation, Number(n))
        response.status(200).json();
    }

    @SGMockRequest({
        path: "/start",
        method: SGMockControllerMethod.POST
    })
    private startApplication(request: Request, response: Response): void {
        response.status(200).json(this.mockMainService.updateAppStatus());
    }

    @SGMockRequest({
        path: "/stop",
        method: SGMockControllerMethod.POST
    })
    private stopApplication(request: Request, response: Response): void {
        response.status(200).json(this.mockMainService.updateAppStatus());
    }

    @SGMockRequest({
        path: "/initial-conditions",
        method: SGMockControllerMethod.GET
    })
    private getInitialConditions(request: Request, response: Response): void {
        response.status(200).json(this.mockMainService.getModelStartProps());
    }
}
