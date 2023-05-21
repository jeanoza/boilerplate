import { generateAccessToken, verifyToken } from "./jwt";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken");
describe("jwt", () => {
  let signMock = jwt.sign as jest.Mock;

  afterEach(() => {
    signMock.mockRestore();
  });

  it("should return a token", async () => {
    signMock.mockReturnValue("mocked-token");
    const payload = { id: 1, email: "test@example.com" };
    const result = generateAccessToken(payload);

    expect(result).toBe("mocked-token");
    expect(signMock).toHaveBeenCalledTimes(1);
    expect(signMock).toBeCalledWith(payload, undefined, { expiresIn: "1h" });
  });
  it("should throw a error when jwt.sign throw error", async () => {
    signMock.mockImplementation(() => {
      throw new Error("sign function error");
    });
    const payload = { id: 1, email: "test@example.com" };

    expect(() => generateAccessToken(payload)).toThrowError(
      "sign function error"
    );
    expect(signMock).toHaveBeenCalledTimes(1);
    expect(signMock).toBeCalledWith(payload, undefined, { expiresIn: "1h" });
  });
});
