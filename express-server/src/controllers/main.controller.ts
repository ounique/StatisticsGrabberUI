import {Request, Response} from "express";
import {SGMockController, SGMockControllerMethod, SGMockRequest} from "../decorators/controller.decorator";
import {SGServerApplicationStatus, SGServerStatus} from "../../../src/app/models/core/server.model";
import {SGMockMainService} from "../services/main.service";

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
            applicationStatus: SGServerApplicationStatus.IDLE,
            server1: true,
            server2: false,
            server3: true,
            server4: true
        })
    }

    @SGMockRequest({
        path: "/output",
        method: SGMockControllerMethod.GET
    })
    private getModelsOutputResponse(request: Request, response: Response): void {
        response.status(200).json(
            this.mockMainService.getModelsOutput()
        );
    }
}
