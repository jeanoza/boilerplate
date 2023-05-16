import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dtos/create-user.dto";
import { validate } from "class-validator";

export async function validateCreateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    const createUserDto = new CreateUserDto();
    createUserDto.nickName = body.nickName;
    createUserDto.firstName = body.firstName;
    createUserDto.lastName = body.lastName;
    createUserDto.email = body.email;
    createUserDto.age = body.age;

    const errors = await validate(createUserDto);

    if (errors.length) return res.status(403).json({ errors });
    req.body = createUserDto;
    next();
  } catch (error) {
    // console.error("Error during validation:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
