import { Repository } from "typeorm";
import { User } from "../entities/user.entity";

export class UserService {
  constructor(private readonly userRepository: Repository<User>) {}

  async findAll() {
    return this.userRepository.find();
  }
  async findById(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error("User not found");
    return user;
  }
  async findByEmail(email: string) {
    // console.log("HERE", email);
    const user = this.userRepository.findOne({ where: { email } });

    if (!user) throw new Error("User not found");
    return user;
  }
  async create(body: User): Promise<User> {
    const user = new User();
    user.firstName = body.firstName;
    user.lastName = body.lastName;
    user.age = body.age;
    user.email = body.email;
    if (!user) throw new Error("Failed create user");
    return await this.userRepository.save(user);
  }
}
