import {IsEmail, IsString} from "class-validator";

export class UserLoginDto {
	
	@IsEmail({}, {message: 'Некорректный email'})
	email: string;
	
	@IsString({message: 'Пароль должен быть строкой'})
	password: string;
}
