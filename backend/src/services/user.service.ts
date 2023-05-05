import { Repository } from "typeorm";
import { User } from "../entities/user";

export class UserService {
  constructor(private userRepository: Repository<User>) {}

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
}
