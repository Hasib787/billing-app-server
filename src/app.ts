import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import * as middlewares from "./middlewares";
import api from "./api";

import { JwtPayload } from "jsonwebtoken";

require("dotenv").config();

declare global {
	namespace Express {
		export interface Request {
			payload?: string | JwtPayload;
		}
	}
}


const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({
		message: "App is running",
	});
});

app.use("/api", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
