import { IRefreshTokenWhiteList } from "../../types/user";

import db from "../../utils/db";
import { hashToken } from "../../utils/hashToken";

// used when we create a refresh token.
export function addRefreshTokenToWhitelist({
	jti,
	refreshToken,
	userId,
}: IRefreshTokenWhiteList) {
	try {
		return db.refreshToken.create({
			data: {
				jti,
				hashedToken: hashToken(refreshToken),
				userId,
			},
		});
	} catch (error) {
		console.log(error)
	}
	
}

// used to check if the token sent by the client is in the database.
export function findRefreshTokenById(id: string) {
	return db.refreshToken.findUnique({
		where: {
			id,
		},
	});
}

// soft delete tokens after usage.
export function deleteRefreshToken(id: string) {
	return db.refreshToken.update({
		where: {
			id,
		},
		data: {
			revoked: true,
		},
	});
}

export function revokeTokens(userId: string) {
	return db.refreshToken.updateMany({
		where: {
			userId,
		},
		data: {
			revoked: true,
		},
	});
}
