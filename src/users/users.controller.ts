import {BaseController} from "../common/base.controller";
import {LoggerService} from "../logger/logger.service";
import {NextFunction, Request, Response} from "express";
import {HTTPError} from "../errors/http-error.class";

export class UsersController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this.bindRoutes([
            {path: '/register', func: this.doRegister, method: 'post'},
            {path: '/login', func: this.doLogin, method: 'post'},
        ]);
    }
    
    public async doRegister(req: Request, res: Response, next: NextFunction) {
        return this.ok(res, 'Register');
    }

    public async doLogin(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'ошибка авторизации','Пользователь не авторизован'));
    }
    
}