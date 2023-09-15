import { IHttp } from '../../typesAndInterfaces/interfaces';
import { TBasic, TEntitiesDb } from '../../typesAndInterfaces/types';
import {apiURL} from '../constants/constants';

const request = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers, method: TBasic.MethodHttp, data?: {[key: string]: string}): Promise<IHttp.Get<T>> => {
	const url = `${apiURL}/${controller}`;
	
	const options: IHttp.RequestOptions = {
		method,
		headers:{
			'Content-Type':'application/json'
		}
	};
	if (data) options.body = JSON.stringify(data)

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
};

const get = async <T extends TEntitiesDb.Objects>(controller: TBasic.Controllers, method: TBasic.MethodHttp, data?: {[key: string]: string}): Promise<IHttp.Get<T>> => await request(controller, method, data);
// const getCount = async (controller: TypeController, data: any) => await request(controller, Constants.methodHttp.getCount, data);
// const add = async (controller: TypeController, data: any) => await request(controller, Constants.methodHttp.add, data);
// const update = async (controller: TypeController, data: any) => await request(controller, Constants.methodHttp.update, data);
// const remove = async (controller: TypeController, data: any) => await request(controller, Constants.methodHttp.delete, data);



export {
	get,
	// getCount,
	// add,
	// update,
	// remove,
	// request
};