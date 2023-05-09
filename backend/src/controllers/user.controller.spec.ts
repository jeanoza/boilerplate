import { Request, Response } from "express";
import UserController from "./user.controller";
import { UserService } from "../services/user.service";
import { expect, describe, beforeEach, it, jest } from "@jest/globals";
import { User } from "../entities/user.entity";
import { DeleteResult } from "typeorm";

describe("UserController", () => {
  let userController: UserController;
  let userService: UserService;
  let req: Request;
  let res: Response<any, Record<string, any>>;

  //mocks entity
  const user: User = new User();
  user.firstName = "John";
  user.lastName = "Doe";
  user.age = 18;
  user.email = "john@gmail.com";
  const user2: User = new User();
  user2.firstName = "Jean-Paul";
  user2.lastName = "Sartre";
  user2.age = 81;
  user2.email = "jean.paul@gmail.com";
  const users: User[] = [user, user2];

  beforeEach(() => {
    //mocks service functions
    userService = {
      findAll: jest.fn(),
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
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

      await userController.findAll(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return empty array when no user in db", async () => {
      jest.spyOn(userService, "findAll").mockResolvedValueOnce([]);
      await userController.findAll(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
    });
    it("should return an error when typeorm throw an error", async () => {
      jest
        .spyOn(userService, "findAll")
        .mockRejectedValueOnce(new Error("Server error"));

      await userController.findAll(req, res);

      expect(userService.findAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Server error" });
    });
  });

  describe("findById", () => {
    it("should return a user", async () => {
      req = { params: { id: 1 } } as unknown as Request;

      jest.spyOn(userService, "findById").mockResolvedValueOnce(user);

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
    it("should return an error if no user corresponding to id", async () => {
      req = { params: { id: 1 } } as unknown as Request;
      jest
        .spyOn(userService, "findById")
        .mockRejectedValueOnce(new Error("User not found"));

      await userController.findById(req, res);

      expect(userService.findById).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
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
    it("should returns an error if no user corresponding to email", async () => {
      req = { params: { email: "john@gmail.com" } } as unknown as Request;
      jest
        .spyOn(userService, "findByEmail")
        .mockRejectedValueOnce(new Error("User not found"));

      await userController.findByEmail(req, res);

      expect(userService.findByEmail).toHaveBeenCalledWith("john@gmail.com");
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "User not found" });
    });
  });

  describe("create", () => {
    it("sholud return a user", async () => {
      req = { body: user } as unknown as Request;

      jest.spyOn(userService, "create").mockResolvedValueOnce(user);

      await userController.create(req, res);

      expect(userService.create).toHaveBeenCalledWith(user);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(user);
    });
    it("sholud return an error when fail on validation", async () => {
      jest
        .spyOn(userService, "create")
        .mockRejectedValueOnce(new Error("Contains null attribut"));

      await userController.create(req, res);

      expect(userService.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Contains null attribut",
      });
    });
  });

  describe("delete", () => {
    it("sholud delete a user", async () => {
      const id = 1;
      req = { params: { id } } as unknown as Request;

      jest
        .spyOn(userService, "delete")
        .mockResolvedValueOnce({ affected: 1 } as DeleteResult);

      await userController.delete(req, res);

      expect(userService.delete).toHaveBeenCalledWith(id);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });
  });
});
