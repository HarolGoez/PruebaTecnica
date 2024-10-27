import type { Request, Response } from "express";
import { formatErrorMessage } from "../../helpers";
import { ErrorValidationMessage } from "../../interfaces";
import { type AmadeusAction } from "../../actions";

export class AmadeusController {
    private amadeusAction: AmadeusAction;
    constructor(amadeusAction: AmadeusAction) {
        this.amadeusAction = amadeusAction;
    }

    public checkHotels = async (req: Request, res: Response) => {
        const inputParameter = req.body;

        const hotels = await this.amadeusAction.searchHotelsInCity(inputParameter);

        return res.status(200).json(hotels);
    };
}
