import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

export default class UserController {
  constructor(private userService: UserService) {}

  async findAll(req: Request, res: Response, next?: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      // console.error(error);
      res.status(404).json(error);
    }
  }
  async findById(req: Request, res: Response, next?: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      // console.error(error);
      res.status(404).json(error);
    }
  }
  async findByEmail(req: Request, res: Response, next?: NextFunction) {
    try {
      const email = req.params.email;
      const user = await this.userService.findByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      // console.error(error);
      res.status(404).json(error);
    }
  }
  async create(req: Request, res: Response, next?: NextFunction) {
    try {
      const { body } = req;
      // const user: User = new User();
      // user.firstName = body.firstName;
      // user.lastName = body.lastName;
      // user.email = body.email;
      // user.age = body.age;
      // const result = user.save();
      // console.log(result);
    } catch (error) {
      // console.log(error);
      res.status(404).json(error);
    }
  }
}
