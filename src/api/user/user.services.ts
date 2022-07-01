import bcrypt from "bcrypt";
import { IUserPassword, IFilterUser } from "../../types/user";
import db from "../../utils/db";

export function findUserByEmail(email: string) {
	return db.user.findUnique({
		where: {
			email,
		},
	});
}

export function createUserByEmailAndPassword(user: IUserPassword) {
	user.password = bcrypt.hashSync(user.password, 12);
	return db.user.create({
		data: user,
	});
}

export function findUserById(id: string) {
	return db.user.findUnique({
		where: {
			id,
		},
	});
}

export function findAllUsers(filter: IFilterUser) {
	return db.user.findMany({
		skip: Number(filter.skip),
		take: Number(filter.take),
		where: {
			fullName: {
				contains: filter.fullName,
				mode: "insensitive",
			},
			email: {
				contains: filter.email,
				mode: "insensitive",
			},
			phoneNumber: {
				contains: filter.phoneNumber,
				mode: "insensitive",
			},
		},
		select: {
			id: true,
			email: true,
			fullName: true,
			phoneNumber: true,
		}
	});
}
