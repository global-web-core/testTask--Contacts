export interface Db {
	id: number;
	idUser: number;
	name: string;
	email: string;
	phone: string;
}

export interface Form {
	id?: number;
	idUser?: number;
	name?: string;
	email?: string;
	phone?: string;
}

export interface Add {
	idUser: number;
	name: string;
	email: string;
	phone: string;
}