import { isEmail, isString } from 'class-validator'

export class UserRegisterDto {
	@isEmail({}, { message: 'Неверно указан email'});
	email: string;

	@isString({ message: 'Не указан пароль'})
	password: string;

	@isString({ message: 'Не указано имя'})
	name: string;
}
