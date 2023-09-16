const text = {
 fillFields: "Пожалуйста, заполните все поля",
 authIsNotCorrect: "Логин или пароль не верные",
 nameUser: "Имя пользователя",
 password: "Пароль",
 login: "Войти",
 auth: "Авторизация",
 logout: "Выйти",
 contacts: "Контакты",
 listEmpty: "Список пуст",
 search: "Поиск",
 name: "Имя",
 email: "Email",
 phoneNumber: "Телефон",
 updateContact: "Обновить контакт",
 addContact: "Добавить контакт",
 cancelEdit: "Отменить редактирование",
}

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
	text,
	namePages,
	controllers,
	methodHttp,
	apiURL,
	codeAnswer
}