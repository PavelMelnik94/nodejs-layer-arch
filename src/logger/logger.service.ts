import {injectable} from 'inversify';
import 'reflect-metadata';
import {Logger} from 'tslog';
import {ILogger} from './logger.interface';

@injectable()
export class LoggerService implements ILogger {
	public logger: Logger;

	constructor() {
		this.logger = new Logger({
			displayInstanceName: false,
			displayFunctionName: false,
			displayLoggerName: false,
			displayFilePath: 'hidden',
		});
	}

	log(...args: unknown[]): void {
		this.logger.info(...args);
	}

	error(...args: unknown[]): void {
		this.logger.error(...args);
	}

	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
