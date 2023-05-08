import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { UserService } from "./user.service";

describe("UserService", () => {
  let userRepository: Repository<User>;
  let userService: UserService;

  beforeEach(() => {
    userRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
    } as unknown as Repository<User>;

    userService = new UserService(userRepository);
  });

  describe("create", () => {
    it("should create and return a new user", async () => {
      const body = {
        firstName: "John",
        lastName: "Doe",
        age: 30,
        email: "johndoe@example.com",
      };
      const createdUser = new User();
      createdUser.id = 1;
      createdUser.firstName = body.firstName;
      createdUser.lastName = body.lastName;
      createdUser.age = body.age;
      createdUser.email = body.email;

      jest.spyOn(userRepository, "save").mockResolvedValueOnce(createdUser);

      const result = await userService.create(body as User);
      expect(result).toEqual(createdUser);
      expect(userRepository.save).toHaveBeenCalledWith(body);
    });

    it("should throw an error if user is not created", async () => {
      const body = {
        firstName: "kyubong",
        lastName: "choi",
        age: -1,
        email: "johndoe.example",
      };

      await expect(userService.create(body as User)).rejects.toThrow(
        "Failed create user"
      );
    });
  });
});
