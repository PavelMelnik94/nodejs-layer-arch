import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import {IUserRepository} from "./users.repository.interface";
import {UserModel} from "@prisma/client";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UserRepository) private usersRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}

		return await this.usersRepository.create(newUser);
	}

	async validateUser({password, email}: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) return false;
		
		const newUser = new User(existedUser.email, existedUser.name, existedUser.password);
		return newUser.comparePassword(password);
		
	}
}
