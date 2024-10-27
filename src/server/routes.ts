import { Router } from "express";
import { AmadeusRoutes } from "./amadeus/routes";

export class AppRoutes {
    static get routes(): Router {
        const router = Router();
        router.use("/api", AmadeusRoutes.routes);

        return router;
    }
}
