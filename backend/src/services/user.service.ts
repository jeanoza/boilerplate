import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

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
  async create(user: User): Promise<User> {
    //validation must be done before controller using validator middle ware...
    return await this.userRepository.save(user);
  }
  async update(body: User, id: number): Promise<User> {
    const user = await this.findById(id);
    return await this.userRepository.save({ ...user, ...body });
  }
}
