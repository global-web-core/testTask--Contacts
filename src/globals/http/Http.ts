import { IHttp } from '../../typesAndInterfaces/interfaces';
import { TBasic, TEntitiesDb } from '../../typesAndInterfaces/types';
import {apiURL, methodHttp} from '../constants/constants';

const fetchData = async <T extends TEntitiesDb.Objects>(url: string, options: IHttp.RequestOptions): Promise<IHttp.Get<T> | IHttp.Add<T>> => {
	const response = await fetch(url, options).catch((error) => console.log('Error fetch with server!!!', error));
	if (!response) {
		console.log('Error connection with server!!!');
	}
	if (response?.ok) {
		try {
			const json = await response.json();
			return {code: 200, data: json};
		} catch {
			console.log('Error parse JSON!!!')
		}
	}
	return {code: 404, data:undefined};
}

const requestGet = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers, method: typeof methodHttp["get"]): Promise<IHttp.Get<T>> => {
	const url = `${apiURL}/${controller}`;
	
	const options = {
		method,
		headers:{
			'Content-Type':'application/json'
		}
	};

	return fetchData(url, options) as Promise<IHttp.Get<T>>;
};

const requestAdd = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers, method: typeof methodHttp["post"], data: TEntitiesDb.ObjectsAdd): Promise<IHttp.Add<T>> => {
	const url = `${apiURL}/${controller}`;
	
	const options: IHttp.RequestOptions = {
		method,
		headers:{
			'Content-Type':'application/json'
		}
	};
	if (data) options.body = JSON.stringify(data)

	return fetchData(url, options) as Promise<IHttp.Add<T>>;
};

const requestDelete = async (controller: TBasic.Controllers, method: typeof methodHttp["delete"], id: number): Promise<IHttp.Delete> => {
	const url = `${apiURL}/${controller}/${id}`;
	
	const options: IHttp.RequestOptions = {
		method,
		headers:{
			'Content-Type':'application/json'
		}
	};

	return fetchData(url, options) as Promise<IHttp.Delete>;
};
const requestUpdate = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers, method: typeof methodHttp["put"], data: TEntitiesDb.Objects): Promise<IHttp.Add<T>> => {
	const url = `${apiURL}/${controller}/${data.id}`;
	
	const options: IHttp.RequestOptions = {
		method,
		headers:{
			'Content-Type':'application/json'
		}
	};
	if (data) options.body = JSON.stringify(data)

	return fetchData(url, options) as Promise<IHttp.Add<T>>;
};

const get = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers): Promise<IHttp.Get<T>> => await requestGet(controller, methodHttp.get);
const add = async <T extends TEntitiesDb.ObjectsAdd, R extends TEntitiesDb.Objects>(controller: TBasic.Controllers, data: T): Promise<IHttp.Add<R>> => await requestAdd(controller, methodHttp.post, data);
const update = async <T extends TEntitiesDb.Objects, R extends TEntitiesDb.Objects>(controller: TBasic.Controllers, data: T): Promise<IHttp.Add<R>> => await requestUpdate(controller, methodHttp.put, data);
const remove = async (controller: TBasic.Controllers, id: number) => await requestDelete(controller, methodHttp.delete, id);



export {
	get,
	add,
	update,
	remove,
};