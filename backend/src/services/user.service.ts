import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}
  // private userRepository = AppDataSource.getRepository(User);

  async findAll() {
    return this.userRepository.find();
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
    const { firstName, lastName, age, email } = user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!firstName || !lastName || age < 0 || !emailRegex.test(email))
      throw new Error("Failed create user");
    return await this.userRepository.save(user);
  }
}
