import * as validator from "class-validator";
import { NextFunction, Request, Response } from "express";
import { validateCreateUser } from "./user.validator";
import { CreateUserDto } from "../dtos/create-user.dto";

describe("validateCreateUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  beforeEach(() => {
    req = {
      body: {
        nickName: "JohnDoe",
        firstName: "John",
        lastName: "Doe",
        email: "jdoe@gmail.com",
        age: 25,
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });
  it("should validate and modify the request body", async () => {
    // Mock the class-validator's validate function
    jest.spyOn(validator, "validate").mockResolvedValue([]);

    await validateCreateUser(req as Request, res as Response, next);

    // Verify that the request body has been modified
    expect(req.body).toBeInstanceOf(CreateUserDto);
    expect(req.body.nickName).toBe("JohnDoe");
    expect(req.body.firstName).toBe("John");
    expect(req.body.lastName).toBe("Doe");
    expect(req.body.age).toBe(25);

    // Verify that the next function has been called
    expect(next).toHaveBeenCalledTimes(1);

    // Verify that response methods were not called
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return validation errors", async () => {
    // Mock the class-validator's validate function to return errors

    jest
      .spyOn(validator, "validate")
      .mockResolvedValue([
        "Error 1",
        "Error 2",
      ] as unknown as validator.ValidationError[]);

    await validateCreateUser(req as Request, res as Response, next);

    // Verify that the response status and json methods were called
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ errors: ["Error 1", "Error 2"] });

    // Verify that the request body has not been modified
    expect(req.body).not.toBeInstanceOf(CreateUserDto);

    // Verify that the next function has not been called
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle internal server errors", async () => {
    // Mock an error during validation
    jest
      .spyOn(validator, "validate")
      .mockRejectedValue(new Error("Validation error"));

    await validateCreateUser(req as Request, res as Response, next);

    // Verify that the response status and json methods were called
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });

    // Verify that the request body has not been modified
    expect(req.body).not.toBeInstanceOf(CreateUserDto);

    // Verify that the next function has not been called
    expect(next).not.toHaveBeenCalled();
  });
});
