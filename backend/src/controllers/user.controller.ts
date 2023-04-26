import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export default class UserController {
  constructor(private userService: UserService) {}

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(404).json({ error: "Internal server error" });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const user = await this.userService.findById(Number(req.params.id));
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: "User not found" });
    }
  }
}
