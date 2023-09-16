import { Http } from "../../globals";
import { codeAnswer, controllers, methodHttp } from "../../globals/constants/constants";
import {IHttp, IContacts} from '../../typesAndInterfaces/interfaces';

const getAll = async (): Promise<IHttp.Get<IContacts.Db>> => await Http.get(controllers.contacts, methodHttp.get);
const getByIdUser = async (id: number): Promise<IHttp.Get<IContacts.Db>> => {
	const request = await Http.get<IContacts.Db>(controllers.contacts, methodHttp.get);
	if (request.code === codeAnswer.ok) {
		const contacts = request.data?.filter(contact => contact.idUser === id)
		request.data = contacts ? contacts : undefined;
	}
	return request;
}

export {
	getAll,
	getByIdUser
}