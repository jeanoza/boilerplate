import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { hash, compare } from 'bcrypt';
import { LoginUserDto } from '../dtos/login-user.dto';

export class UserService {
	constructor(private readonly userRepository: Repository<User>) {}

	async findAll() {
		return await this.userRepository.find();
	}
	async findById(id: number) {
		const user = await this.userRepository.findOne({ where: { id } });
		if (!user) throw new Error('User not found');
		return user;
	}
	async findByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email } });
		if (!user) throw new Error('User not found');
		return user;
	}

	async findByEmailAndPassword(loginUserDto: LoginUserDto) {
		const ERROR_MSG = 'Wrong email or password';

		//verify user exist by mail
		const user = await this.userRepository.findOne({
			where: { email: loginUserDto.email },
		});
		if (!user) throw new Error(ERROR_MSG);

		//verify user exist by password
		const isValidPassword = await compare(loginUserDto.password, user.password);
		if (!isValidPassword) throw new Error(ERROR_MSG);

		return user;
	}

	async create(createUserDto: CreateUserDto) {
		const existUser = await this.userRepository.findOne({
			where: { email: createUserDto.email },
		});
		if (existUser) throw new Error('User already exist');

		createUserDto.password = await hash(createUserDto.password, 12);
		return await this.userRepository.save(createUserDto);
	}
	async update(body: User, id: number) {
		const user = await this.findById(id);
		return await this.userRepository.save({ ...user, ...body });
	}
	async delete(id: number) {
		return await this.userRepository.delete(id);
	}
}
