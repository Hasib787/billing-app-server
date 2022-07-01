import express from "express";

import auth from "./auth/auth.routes";
import user from "./user/user.routes";
import billing from "./billing/billing.routes";

const router = express.Router();

router.use("/", auth);
router.use("/", user);
router.use("/", billing);

export default router;
