import express from "express";
import { JwtPayload } from "jsonwebtoken";
import { isAuthenticated } from "../../middlewares";
import { IFilterUser, IUser } from "../../types/user";
import { findAllUsers, findUserById } from "./user.services";

const router = express.Router();

router.get("/profile", isAuthenticated, async (req, res, next) => {
	try {
		const { userId } = req.payload as JwtPayload;
		const user: IUser | null = await findUserById(userId!);
		if (user?.password) delete user.password;
		res.json(user);
	} catch (err) {
		next(err);
	}
});

router.get("/user-list", async (req, res, next) => {
	try {
		const {
			skip = 0,
			take = 10,
			fullName,
			email,
			phoneNumber,
		}: IFilterUser = req.query;
		const users = await findAllUsers({
			skip,
			take,
			fullName,
			email,
			phoneNumber,
		});
		res.json(users);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

export default router;
