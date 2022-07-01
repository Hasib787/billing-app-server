import { IFilterPayment, IPayment } from "../../types/user";
import db from "../../utils/db";

export function givePayment({ userId, paidAmount }: IPayment) {
	return db.billing.create({
		data: {
			userId,
			paidAmount,
		},
	});
}

export function findBillingById(id: string) {
	return db.billing.findUnique({
		where: {
			id,
		},
	});
}

export function updatePayment(id: string, paidAmount: number) {
	return db.billing.update({
		where: {
			id,
		},
		data: {
			paidAmount,
		},
	});
}

export function deletePayment(id: string) {
	return db.billing.delete({
		where: {
			id,
		},
	});
}

export function findAllBilling(filter: IFilterPayment) {
	return db.billing.findMany({
		skip: Number(filter.skip),
		take: Number(filter.take),
		include: {
			User: true,
		},
		where: {
			User: {
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
		},
		orderBy: {
			id: "desc",
		},
	});
}
