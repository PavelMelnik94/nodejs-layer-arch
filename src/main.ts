import { Container, ContainerModule, interfaces } from 'inversify';
import { ConfigService } from '../config/config.service';
import { IConfigService } from '../config/config.service.interface';
import { App } from './app';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';
import { IUserController } from './users/users.controller.interface';
import { UsersService } from './users/users.service';
import { IUserService } from './users/users.service.interface';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UsersController).to(UsersController);
	bind<IUserService>(TYPES.UsersService).to(UsersService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
