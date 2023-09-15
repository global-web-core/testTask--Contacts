import { Http } from "../../globals";
import { controllers, methodHttp } from "../../globals/constants/constants";
import {IHttp, IContacts} from '../../typesAndInterfaces/interfaces';

const getAll = async (): Promise<IHttp.Get<IContacts.Db>> => await Http.get(controllers.contacts, methodHttp.get);

export {
	getAll
}