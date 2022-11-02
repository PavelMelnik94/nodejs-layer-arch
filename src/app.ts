import { json } from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from '../config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private userController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter, // @inject(TYPES.ConfigService) private ConfigService: IConfigService,
	) {
		this.app = express();
		this.port = 8000;
	}

	private useRoutes(): void {
		this.app.use('/users', this.userController.router);
	}

	private useMiddleware(): void {
		this.app.use(json());
		this.app.use(cors());
	}

	private useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server running at port ${this.port}`);
	}
}
