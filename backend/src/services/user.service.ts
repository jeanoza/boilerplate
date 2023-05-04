import { Repository } from "typeorm";
import { User } from "../entities/User";
import { AppDataSource } from "../data-source";

export class UserService {
  private userRepository: Repository<User>;
  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
  async findAll() {
    //try catch
    return this.userRepository.find();
  }
  async findById(id: number) {
    try {
      const user = this.userRepository.findOne({ where: { id } });
      if (!user) throw new Error("Not found user");
      return user;
    } catch (error) {
      throw new Error("An error occurred while getting the user");
    }
  }
}
