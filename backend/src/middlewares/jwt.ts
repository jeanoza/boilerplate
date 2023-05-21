import { sign, verify } from "jsonwebtoken";

interface Payload {
  id: number;
  email: string;
}

export function generateToken(payload: Payload) {
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}

export function verifyToken() {}
