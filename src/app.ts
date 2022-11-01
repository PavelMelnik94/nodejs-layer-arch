import { ILogger } from "./logger/logger.interface";
import express, { Express } from "express";
import { Server } from "http";
import { UsersController } from "./users/users.controller";
import { ExeptionFilter } from "./errors/exeption.filter";

export class App {
    app: Express;
    server: Server;
    port: number;
    logger: ILogger;
    userController: UsersController;
    exceptionFilter: ExeptionFilter;

    constructor(
        logger: ILogger,
        userController: UsersController,
        exceptionFilter: ExeptionFilter
    ) {
        this.app = express();
        this.port = 8000;
        this.logger = logger;
        this.userController = userController;
        this.exceptionFilter = exceptionFilter;
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
