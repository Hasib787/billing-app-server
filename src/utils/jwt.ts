import jwt from "jsonwebtoken";
import { IUser } from "../types/user";

// Usually the time of the token between 5 minutes - 15 minutes
export function generateAccessToken(user: IUser) {
	return jwt.sign(
		{ userId: user.id },
		process.env.JWT_ACCESS_SECRET as string,
		{
			expiresIn: "5m",
		}
	);
}

export function generateRefreshToken(user: IUser, jti: string) {
	return jwt.sign(
		{
			userId: user.id,
			jti,
		},
		process.env.JWT_REFRESH_SECRET as string,
		{
			expiresIn: "24h",
		}
	);
}

export function generateTokens(user: IUser, jti: string) {
	const accessToken = generateAccessToken(user);
	const refreshToken = generateRefreshToken(user, jti);

	return {
		accessToken,
		refreshToken,
	};
}
