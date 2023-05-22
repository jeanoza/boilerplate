import { generateAccessToken, verifyToken } from "./jwt";
import { sign } from "jsonwebtoken";

jest.mock("jsonwebtoken");
describe("jwt", () => {
  const env = process.env;
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
    it("should return a token", async () => {
      signMock.mockReturnValue("mocked-token");
      const payload = { id: 1, email: "test@example.com" };
      const result = generateAccessToken(payload);

      expect(result).toBe("mocked-token");
      expect(signMock).toHaveBeenCalledTimes(1);
      expect(signMock).toBeCalledWith(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    });
    it("should throw a error when jwt.sign throw error", () => {
      signMock.mockImplementation(() => {
        throw new Error("sign function error");
      });
      const payload = { id: 1, email: "test@example.com" };

      expect(() => generateAccessToken(payload)).toThrowError(
        "sign function error"
      );
      expect(signMock).toHaveBeenCalledTimes(1);
      expect(signMock).toBeCalledWith(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
    });
  });
  // describe("verifyToken", () => {
  //   const verifyMock = jwt.verify as jest.Mock;
  //   it("should return true when token is correct", () => {
  //     verifyMock;
  //   });
  // });
});
