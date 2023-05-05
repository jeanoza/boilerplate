import { Request, Response } from "express";
import UserController from "./user.controller";
import { UserService } from "../services/user.service";
import { expect, describe, beforeEach, it, jest } from "@jest/globals";
import { User } from "../entities/user.entity";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;
  let req: Request;
  let res: Response<any, Record<string, any>>;
  const user: User = {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    age: 18,
    email: "john@gmail.com",
  };
  const users: User[] = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      age: 18,
      email: "john@gmail.com",
    },
    {
      id: 2,
      firstName: "Jean",
      lastName: "Sartre",
      age: 19,
      email: "jean.paul@gmail.com",
    },
  ];

  beforeEach(() => {
    userService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
    } as unknown as UserService;
    userController = new UserController(userService);
    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  describe("findAll", () => {
    it("should return all user if there is at least one user in db", async () => {
      jest.spyOn(userService, "findAll").mockResolvedValueOnce(users);
      // res.json = jest.fn<any>().mockReturnValueOnce(res);

      await userController.findAll(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });
  describe("findAll", () => {
    it("should return empty array when no user in db", async () => {
      jest.spyOn(userService, "findAll").mockResolvedValueOnce([]);
      await userController.findAll(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
  });

  describe("findById", () => {
    it("should return a user", async () => {
      req = { params: { id: 1 } } as unknown as Request;

      jest.spyOn(userService, "findById").mockResolvedValueOnce(user);
      // res.json = jest.fn<any>().mockReturnValueOnce(res);

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
    it("should return an error if no user corresponding to id", async () => {
      req = { params: { id: 1 } } as unknown as Request;
      jest
        .spyOn(userService, "findById")
        .mockRejectedValueOnce("User not found");
      // res.status = jest.fn<any>().mockReturnValueOnce(res);
      // res.json = jest.fn<any>().mockReturnValueOnce(res);

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("User not found");
    });
  });

  describe("findByEmail", () => {
    it("should return a user", async () => {
      req = { params: { email: "john@gmail.com" } } as unknown as Request;
      jest.spyOn(userService, "findByEmail").mockResolvedValueOnce(user);

      await userController.findByEmail(req, res);

      expect(userService.findByEmail).toHaveBeenCalledWith("john@gmail.com");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
  });

  describe("findByEmail", () => {
    it("should return an error if no user corresponding to email", async () => {
      req = { params: { email: "john@gmail.com" } } as unknown as Request;
      jest
        .spyOn(userService, "findByEmail")
        .mockRejectedValueOnce("User not found");

      await userController.findByEmail(req, res);

      expect(userService.findByEmail).toHaveBeenCalledWith("john@gmail.com");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith("User not found");
    });
  });
});
