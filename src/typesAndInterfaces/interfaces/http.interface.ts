import {TBasic, TEntitiesDb} from '../types';

export interface Get<ObjectFromDB extends TEntitiesDb.Objects> {
	code: TBasic.CodeAnswer;
	data: ObjectFromDB[] | undefined;
}

export interface RequestOptions {
	method: TBasic.MethodHttp;
  headers: {
    'Content-Type': string;
    [key: string]: string;
  };
  body?: string | FormData;
}