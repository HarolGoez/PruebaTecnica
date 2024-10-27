import { Router, Request, Response } from "express";
import { AmadeusController } from "./controller";
import { AmadeusAction } from "../../actions";
import { ValidateTypeMiddleware } from "../../middleware/validateType.middleware";

export class AmadeusRoutes {
    static get routes(): Router {
        const router = Router();

        const amadeusAction = new AmadeusAction();
        const amadeusController = new AmadeusController(amadeusAction);

        router.use(ValidateTypeMiddleware.validType());

        router.get("/search-hotels", amadeusController.checkHotels);

        return router;
    }
}
