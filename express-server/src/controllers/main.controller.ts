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
            server1: true,
            server2: false,
            server3: true,
            server4: true
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
        path: "/modelConfiguration[:]update",
        method: SGMockControllerMethod.POST
    })
    private updateModelParameters(request: Request, response: Response): void {
        const wing = request.query.wing as string;
        const modelType = request.query.modelType as string;
        const number = request.query.number as string;
        const data = request.body;

        this.mockMainService.updateModelParameters(
            modelType as SGModelName,
            wing as SGModelOrientation,
            Number(number),
            data
        );
        response.status(200).json();
    }

    @SGMockRequest({
        path: "/application[:]start",
        method: SGMockControllerMethod.POST
    })
    private startApplication(request: Request, response: Response): void {
        response.status(200).json(this.mockMainService.updateAppStatus());
    }

    @SGMockRequest({
        path: "/application[:]stop",
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
