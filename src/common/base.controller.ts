import { Response, Router } from 'express';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './../logger/logger.interface';
import { ExpressReturnType, IControllerRoute } from './route.interface';

@injectable()
export abstract class BaseController {
	private readonly _router: Router;

	constructor(private logger: ILogger) {
		this._router = Router();
		this.logger = logger;
	}

	get router(): Router {
		return this._router;
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201).send();
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	protected bindRoutes(routes: IControllerRoute[]): void {
		for (const route of routes) {
			this.logger.log(`Binding route [${route.method}] ${route.path}`);

			const middleware = route.middlewares?.map((m) => m.execute.bind(m)) || [];
			const handler = route.func.bind(this);
			const pipeline = middleware ? [...middleware, handler] : handler;
			this._router[route.method](route.path, pipeline);
		}
	}
}
