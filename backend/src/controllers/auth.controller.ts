import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { generateAccessToken } from "../middlewares/jwt";

export class AuthController {
  constructor(private readonly userService: UserService) {}

  async register(req: Request, res: Response) {
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
      const existAlready = error.message === "User already exist";
      //409 conflict when user exist already
      const code = existAlready ? 409 : 500;
      res.status(code).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response) {}
}
