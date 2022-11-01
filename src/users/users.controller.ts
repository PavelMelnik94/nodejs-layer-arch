import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error.class';
import { ILogger } from './../logger/logger.interface';
import { TYPES } from './../types';
import { IUserController } from './users.controller.interface';
@injectable()
export class UsersController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', func: this.login, method: 'post' },
			{ path: '/login', func: this.register, method: 'post' },
		]);
	}

	public async register(
		_req: Request,
		res: Response,
		_next: NextFunction,
	): Promise<Response<any, Record<string, any>>> {
		return this.ok(res, 'Register');
	}

	public async login(_req: Request, _res: Response, next: NextFunction): Promise<void> {
		next(new HTTPError(401, 'ошибка авторизации', 'Пользователь не авторизован'));
	}
}
