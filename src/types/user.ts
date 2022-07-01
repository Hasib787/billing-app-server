export interface IUser {
	id: string;
	email: string;
	password?: string;
    fullName: string;
    phoneNumber: string;
}

export interface IUserPassword {
	id: string;
	email: string;
	password: string;
	fullName: string;
	phoneNumber: string;
}

export interface IRefreshTokenWhiteList {
	jti: string;
	refreshToken: string;
	userId: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IFilterUser {
	skip?: number;
	take?: number;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
}

export interface IPayment {
	userId: string;
	paidAmount: number;
}

export interface IFilterPayment {
	skip?: number;
	take?: number;
	fullName?: string;
	email?: string;
	phoneNumber?: string;
}