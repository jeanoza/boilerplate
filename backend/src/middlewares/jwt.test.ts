import { generateAccessToken, verifyToken } from "./jwt";
import { sign, verify } from "jsonwebtoken";

jest.mock("jsonwebtoken");
describe("jwt", () => {
  const env = process.env;
  const payload = { id: 1, email: "test@example.com" };
  const token = "mocked-token";

  beforeAll(() => {
    process.env = { ...env };
    process.env.JWT_SECRET = "jwt-secret";
  });
  afterAll(() => {
    process.env = env;
  });
  describe("generateAccessToken", () => {
    const signMock = sign as jest.Mock;

    afterEach(() => {
      signMock.mockRestore();
    });
    it("should return a token", () => {
      signMock.mockReturnValue(token);

      const result = generateAccessToken(payload);

      expect(result).toBe(token);
      expect(signMock).toHaveBeenCalledTimes(1);
      expect(signMock).toHaveBeenCalledWith(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    });
    it("should throw a error when jwt.sign throw error", () => {
      signMock.mockImplementation(() => {
        throw new Error("sign function error");
      });
      // const payload = { id: 1, email: "test@example.com" };

      expect(() => generateAccessToken(payload)).toThrowError(
        "sign function error"
      );
      expect(signMock).toHaveBeenCalledTimes(1);
      expect(signMock).toHaveBeenCalledWith(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    });
  });
  describe("verifyToken", () => {
    const verifyMock = verify as jest.Mock;
    afterEach(() => {
      verifyMock.mockRestore();
    });
    it("should return a object<id:number, email:string> when token is correct", () => {
      verifyMock.mockReturnValue(payload);

      const result = verifyToken(token);

      expect(result).toStrictEqual(payload);
      expect(verifyMock).toHaveBeenCalledTimes(1);
      expect(verifyMock).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    });
    it("should throw a error if verify failed", () => {
      verifyMock.mockImplementation(() => {
        throw new Error("verify function error");
      });

      expect(() => verifyToken(token)).toThrowError("verify function error");
      expect(verifyMock).toHaveBeenCalledTimes(1);
      expect(verifyMock).toHaveBeenCalledWith(token, process.env.JWT_SECRET);
    });
  });
});
