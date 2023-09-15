const enum namePages {
	login = "login",
	listContacts = "listContacts",
}

const enum controllers {
	users = "users",
	contacts = "contacts",
}

const enum methodHttp {
	get = "get",
	post = "post"
}

const enum codeAnswer {
	ok = 200,
	bad = 404
}

const apiURL = 'http://localhost:5000';

export {
	namePages,
	controllers,
	methodHttp,
	apiURL,
	codeAnswer
}