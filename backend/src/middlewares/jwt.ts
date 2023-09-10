import { Secret, sign, verify } from 'jsonwebtoken';

interface Payload {
  id: number;
  email: string;
}

export function generateAccessToken(payload: Payload) {
	return sign(payload, process.env.JWT_SECRET as Secret, { expiresIn: '1h' });
}

//TODO: it will be implemented after understand more advantage and usage of refresh token
// export function generateRefreshToken(payload: Payload) {
//   const token = sign(payload, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
//   return token;
// }

export function verifyToken(token: string) {
	return verify(token, process.env.JWT_SECRET as Secret);
}
