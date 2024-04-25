import {Request, Response} from "express";
import {SGMockController, SGMockControllerMethod, SGMockRequest} from "../decorators/controller.decorator";

@SGMockController({
    path: "/api/model"
})
export class SGMainController {

    @SGMockRequest({
        path: "/bankruptcies",
        method: SGMockControllerMethod.GET
    })
    private getBMSModelResponse(request: Request, response: Response): void {
        response.status(200).json({

        });
    }
}
