import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";

export default class UserController {
  constructor(private userService: UserService) {}

  async findAll(req: Request, res: Response, next?: NextFunction) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      // console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
  async findById(req: Request, res: Response, next?: NextFunction) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      // console.error(error);
      res.status(404).json({ error: error.message });
    }
  }
  async findByEmail(req: Request, res: Response, next?: NextFunction) {
    try {
      const email = req.params.email;
      const user = await this.userService.findByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      // console.error(error);
      res.status(404).json({ error: error.message });
    }
  }
  async create(req: Request, res: Response, next?: NextFunction) {
    try {
      const { body } = req;
      const user = await this.userService.create(body);
      res.status(200).json(user);
    } catch (error) {
      // console.log(error);
      res.status(404).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response, next?: NextFunction) {
    try {
      const {
        body,
        params: { id },
      } = req;
      const user = await this.userService.update(body, Number(id));
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  async delete(req: Request, res: Response, next?: NextFunction) {
    try {
      const {
        params: { id },
      } = req;
      const { affected } = await this.userService.delete(Number(id));
      if (affected === 0)
        return res.status(404).json({ error: "User not found" });
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
