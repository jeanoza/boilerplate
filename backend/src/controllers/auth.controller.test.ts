import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthController } from "./auth.controller";
import { User } from "../entities/user.entity";
import * as auth from "../middlewares/jwt";

describe("AuthController", () => {
  let authController: AuthController;
  let userService: UserService;
  let req: Request;
  let res: Response<any, Record<string, any>>;

  //env in test
  const env = process.env;

  //mocks entity
  const user: User = new User();
  user.firstName = "John";
  user.lastName = "Doe";
  user.age = 18;
  user.email = "john@gmail.com";
  user.password = "test password";

  beforeEach(() => {
    //mocks service functions
    userService = {
      create: jest.fn(),
    } as unknown as UserService;
    authController = new AuthController(userService);
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    } as unknown as Response;

    jest.resetModules();
    process.env = { ...env };
    process.env.JWT_SECRET = "jwt-secret";
  });

  afterEach(() => {
    process.env = env;
  });
  describe("register", () => {
    it("sholud return a user", async () => {
      req = { body: user } as unknown as Request;
      jest.spyOn(userService, "create").mockResolvedValueOnce(user);
      jest.spyOn(auth, "generateAccessToken").mockReturnValueOnce("test-token");

      await authController.register(req, res);

      expect(userService.create).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true });
      expect(res.cookie).toHaveBeenCalledWith("accessToken", "test-token", {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000,
      });
    });
    it("sholud return an error(404) when fail on validation", async () => {
      jest
        .spyOn(userService, "create")
        .mockRejectedValue(new Error("Contains null attribut"));

      await authController.register(req, res);

      expect(userService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Contains null attribut",
      });
    });

    it("sholud return an error(409) when input email exist already in db", async () => {
      jest
        .spyOn(userService, "create")
        .mockRejectedValue(new Error("User already exist"));

      await authController.register(req, res);

      expect(userService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({
        error: "User already exist",
      });
    });
  });
});
