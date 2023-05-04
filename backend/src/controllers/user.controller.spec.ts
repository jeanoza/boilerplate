import { Request, Response } from "express";
import UserController from "./user.controller";
import { UserService } from "../services/user.service";
import { expect, describe, beforeEach, it, jest } from "@jest/globals";
import { User } from "../entities/User";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;
  let req: Request;
  let res: Response<any, Record<string, any>>;

  beforeEach(() => {
    userService = {
      findAll: jest.fn(),
      findById: jest.fn(),
    } as unknown as UserService;
    userController = new UserController(userService);
    req = { params: { id: 1 } } as unknown as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe("findById", () => {
    it("should return a user", async () => {
      const user: User = { id: 1, firstName: "John", lastName: "Doe", age: 18 };
      jest.spyOn(userService, "findById").mockResolvedValueOnce(user);
      res.json = jest.fn<any>().mockReturnValueOnce(res);

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });

    it("should return an error if the user is not found", async () => {
      jest
        .spyOn(userService, "findById")
        .mockRejectedValueOnce(new Error("User not found"));
      res.status = jest.fn<any>().mockReturnValueOnce(res);
      res.json = jest.fn<any>().mockReturnValueOnce(res);

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("findAll", () => {
    it("should return all user ");
  });
});
