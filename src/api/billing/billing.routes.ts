import express from "express";
import { IFilterPayment, IUser } from "../../types/user";
import { findUserById } from "../user/user.services";
import { deletePayment, findAllBilling, findBillingById, givePayment, updatePayment } from './billing.service';

const router = express.Router();

router.post("/add-billing", async (req, res, next) => {
	try {
		const { userId, paidAmount } = req.body;

		if (!userId) {
			res.status(400);
			throw new Error("You must provide the user id.");
		}

		const user: IUser | null = await findUserById(userId);

		if (!user) {
			res.status(400);
			throw new Error("User not found.");
        }
        
        if (user?.password) delete user.password;

		const payment = await givePayment({ userId, paidAmount });

		res.json({ payment, user });
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.patch("/update-billing/:id", async (req, res, next) => { 
    try {
        const { id } = req.params;
        const { paidAmount } = req.body;

        if (!id) {
            res.status(400);
            throw new Error("You must provide the billing id.");
        }

        if (!paidAmount) {
			res.status(400);
			throw new Error("You must provide the paid amount.");
		}

        const payment = await findBillingById(id);

        if (!payment) { 
            res.status(400);
			throw new Error("Billing not found.");
        }

        const updatedPayment = await updatePayment(id, paidAmount);

        res.json(updatedPayment);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.delete("/delete-billing/:id", async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) {
			res.status(400);
			throw new Error("You must provide the billing id.");
		}

		const payment = await findBillingById(id);

		if (!payment) {
			res.status(400);
			throw new Error("Billing not found.");
		}

        const deletedPayment = await deletePayment(id);

		res.json(deletedPayment);
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.get("/billing-list", async (req, res, next) => { 
    try {
        const { skip = 0, take = 10, fullName, email, phoneNumber }: IFilterPayment = req.query;
        const payments = await findAllBilling({
			skip,
			take,
			fullName,
			email,
			phoneNumber,
		});
        res.json(payments);
    } catch (error) {
        console.log(error);
		next(error);
    }
})

export default router;
