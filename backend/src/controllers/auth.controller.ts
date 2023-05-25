import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { generateAccessToken } from "../middlewares/jwt";
import { LoginUserDto } from "../dtos/login-user.dto";
import { CreateUserDto } from "../dtos/create-user.dto";

export class AuthController {
  constructor(private readonly userService: UserService) {}

  async getAccessToken(req: Request, res: Response) {
    try {
      const key = "accessToken";
      const { cookie } = req.headers;

      const accessToken = cookie
        ?.split("; ")
        ?.find((el) => el.includes(key))
        ?.slice(key.length + 1); // to splice after "=" ex:accessToken=...
      res.json({ accessToken });
    } catch (error) {
      res.json({ error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const createUserDto: CreateUserDto = req.body;
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

  async login(req: Request, res: Response) {
    try {
      const loginUserDto: LoginUserDto = req.body;

      const user = await this.userService.findByEmailAndPassword(loginUserDto);

      const accessToken = generateAccessToken({
        id: user.id,
        email: user.email,
      });

      //FIXME: after test delete token2
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 1000, // to config in env
      });

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
