import * as validator from "class-validator";
import { NextFunction, Request, Response } from "express";
import { validateCreateUser } from "./user.validator";
import { CreateUserDto } from "../dtos/create-user.dto";

describe("validateCreateUser", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let errorSpy: jest.SpyInstance;

  const mockValidate = jest.spyOn(validator, "validate");

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
    errorSpy = jest.spyOn(console, "error");
    errorSpy.mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("should validate and modify the request body", async () => {
    // Mock the class-validator's validate function

    mockValidate.mockResolvedValue([]);

    await validateCreateUser(req as Request, res as Response, next);

    expect(req.body).toBeInstanceOf(CreateUserDto);
    expect(req.body.nickName).toBe("JohnDoe");
    expect(req.body.firstName).toBe("John");
    expect(req.body.lastName).toBe("Doe");
    expect(req.body.age).toBe(25);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it("should return validation errors", async () => {
    // Mock the class-validator's validate function to return errors
    mockValidate.mockResolvedValue([
      "Error 1",
      "Error 2",
    ] as unknown as validator.ValidationError[]);

    await validateCreateUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ errors: ["Error 1", "Error 2"] });
    expect(req.body).not.toBeInstanceOf(CreateUserDto);
    expect(next).not.toHaveBeenCalled();
  });

  it("should handle internal server errors ", async () => {
    // Mock an error during validation
    mockValidate.mockRejectedValue(new Error("Validation error"));

    await validateCreateUser(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
    expect(req.body).not.toBeInstanceOf(CreateUserDto);
    expect(next).not.toHaveBeenCalled();
  });
  it("should log with console.error ", async () => {
    // Mock an error during validation
    const error = new Error("Validation error");
    mockValidate.mockRejectedValue(error);

    await validateCreateUser(req as Request, res as Response, next);

    expect(errorSpy).toHaveBeenCalled();
    expect(errorSpy).toBeCalledWith("Error during validation:", error);
  });
});
