import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../types";
import { ILogger } from "./../logger/logger.interface";
import { IExceptionFilter } from "./exception.filter.interface";
import { HTTPError } from "./http-error.class";
@injectable()
export class ExeptionFilter implements IExceptionFilter {
    constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

    catch(
        err: Error | HTTPError,
        _req: Request,
        res: Response,
        _next: NextFunction
    ) {
        if (err instanceof HTTPError) {
            this.logger.error(
                `[${err.context}] Ошибка (${err.statusCode}):  ${err.message}`
            );
            res.status(err.statusCode).send({ error: err.message });
        } else {
            this.logger.error(`Error: ${err.message}`);
            res.status(500).send({ error: err.message });
        }
    }
}
