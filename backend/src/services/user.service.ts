import { Repository } from "typeorm";
import { User } from "../entities/User";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

  async findAll() {
    return this.userRepository.find();
  }
  async findById(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) throw new Error("Not found user");
    return user;
  }
}
