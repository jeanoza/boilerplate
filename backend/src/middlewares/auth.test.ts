import { generateToken, verifyToken } from "./auth";
import { verify, sign } from "jsonwebtoken";

describe("auth", () => {
  const env = process.env;
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...env };
    process.env.JWT_SECRET = "jwt-secret";
  });

  afterEach(() => {
    process.env = env;
  });
  it("should return a token", async () => {
    const payload = { id: 1, email: "test@example.com" };

    const expected = sign(payload, "jwt-secret", {
      expiresIn: "1h",
    });
    const result = generateToken(payload);

    expect(result).toStrictEqual(expected);
  });
});
