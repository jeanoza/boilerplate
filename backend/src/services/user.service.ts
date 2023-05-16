import { DeleteResult, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/create-user.dto";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll() {
    return await this.userRepository.find();
  }
  async findById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    return user;
  }
  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (user) throw new Error("User already exist");

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
