import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { ErrorValidationMessage } from "../interfaces";
import { formatErrorMessage } from "../helpers";
import { getEnvs } from "../config/envs";

export class ValidateTypeMiddleware {
    static validType() {


        return (req: Request, res: Response, next: NextFunction) => {


            const iataCodeSchema = z.string().regex(/^[A-Z]{3}$/, {
                message: "Invalid IATA code format. Must be a three-letter uppercase code.",
            });

            const schema = z
                .object({
                    cityCode: iataCodeSchema,
                    checkInDate: z.string().date(),
                    checkOutDate: z.string().date(),
                    guests: z.number().min(1).max(10).int(),
                    roomQuantity: z.number().min(1).max(10).int(),
                })
                .refine((data) => new Date(data.checkOutDate) > new Date(data.checkInDate), {
                    message: "check-in date cannot be after check-out date",
                    path: ["checkOutDate"],
                })
                .refine(
                    (data) => {
                        const yesterday = new Date();
                        yesterday.setDate(yesterday.getDate() - 1);
                        return new Date(data.checkInDate) >= yesterday;
                    },
                    {
                        message: "The check-in date cannot be earlier than today",
                        path: ["checkInDate"],
                    }
                )
                .refine(
                    (data) => {
                        const checkIn = new Date(data.checkInDate);
                        const checkOut = new Date(data.checkOutDate);
                        const diffInMonths =
                            (checkOut.getFullYear() - checkIn.getFullYear()) * 12 +
                            (checkOut.getMonth() - checkIn.getMonth());
                        return diffInMonths <= 3;
                    },
                    {
                        message: "The difference between check-in and check-out dates cannot exceed 3 months",
                        path: ["checkInDate"],
                    }
                );

            const bodySchema = schema.safeParse(req.body);
            const { success, error } = bodySchema;

            if (!success) {
                const DataJson: ErrorValidationMessage[] = JSON.parse(error.message);
                const errorMessage = formatErrorMessage(DataJson);

                return res.status(400).json(errorMessage);
            }

            const { api_key, api_secret } = getEnvs();

            if (!api_key || !api_secret) {
                return res.status(401).json({ error: "You cant use this endpoint until configure the envs" });
            }
            if (api_key === "" || api_secret === "") {
                return res.status(401).json({ error: "You cant use this endpoint until configure the envs" });
            }


            next();
        };
    }
}
