import { Http } from "../../globals";
import { codeAnswer, controllers } from "../../globals/constants/constants";
import {IHttp, IContacts} from '../../typesAndInterfaces/interfaces';

const getAll = async (): Promise<IHttp.Get<IContacts.Db>> => await Http.get(controllers.contacts);
const getByIdUser = async (id: number): Promise<IHttp.Get<IContacts.Db>> => {
	const request = await Http.get<IContacts.Db>(controllers.contacts);
	if (request.code === codeAnswer.ok) {
		const contacts = request.data?.filter(contact => contact.idUser === id)
		request.data = contacts ? contacts : undefined;
	}
	return request;
}

const add = async (data: IContacts.Add) => await Http.add<IContacts.Add, IContacts.Db>(controllers.contacts, data);
const update = async (data: IContacts.Db) => await Http.update<IContacts.Db, IContacts.Db>(controllers.contacts, data);
const removeById = async (id: number) => await Http.remove(controllers.contacts, id);

export {
	getAll,
	getByIdUser,
	add,
	removeById,
	update
}