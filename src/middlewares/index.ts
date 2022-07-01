import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
}

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	/* eslint-enable no-unused-vars */
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack:
			process.env.NODE_ENV === "production" ? "🥞" : err.stack,
	});
}

export function isAuthenticated(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const { authorization } = req.headers;

	if (!authorization) {
		res.status(401);
		throw new Error("Un-Authorized!");
	}

	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		token = req.headers.authorization.replace("Bearer ", "");
	}

    if (!token) {
        res.status(401);
		throw new Error("Un-Authorized!");
	}

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_ACCESS_SECRET as string
		);
		req.payload = payload;
	} catch (err: any) {
		res.status(401);
		if (err.name === "TokenExpiredError") {
			throw new Error(err.name);
		}
		throw new Error("Un-Authorized!");
	}

	return next();
}
