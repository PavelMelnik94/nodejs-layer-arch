import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ExeptionFilter } from "./errors/exeption.filter";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";
@injectable()
export class App {
    app: Express;
    server: Server;
    port: number;

    constructor(
        @inject(TYPES.ILogger) private logger: ILogger,
        @inject(TYPES.UsersController) private userController: UsersController,
        @inject(TYPES.ExceptionFilter) private exceptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
    }

    private useRoutes() {
        this.app.use("/users", this.userController.router);
    }

    private useExceptionFilters() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
    }

    public async init() {
        this.useRoutes();
        this.useExceptionFilters();
        this.server = this.app.listen(this.port);
        this.logger.log(`Server running at port ${this.port}`);
    }
}
