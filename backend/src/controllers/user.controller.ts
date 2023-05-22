import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { generateAccessToken } from "../middlewares/jwt";

export default class UserController {
  constructor(private readonly userService: UserService) {}

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  }
  async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const user = await this.userService.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async findByEmail(req: Request, res: Response) {
    try {
      const email = req.params.email;
      const user = await this.userService.findByEmail(email);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
  async create(req: Request, res: Response) {
    try {
      const createUserDto = req.body;
      const user = await this.userService.create(createUserDto);
      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000, // to config in env
      });
      res.status(201).json({ success: true });
    } catch (error) {
      const code = error.message === "User already exist" ? 409 : 404;
      res.status(code).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
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
  async delete(req: Request, res: Response) {
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
