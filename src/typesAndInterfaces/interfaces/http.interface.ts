import {TBasic, TEntitiesDb} from '../types';

export interface Get<ObjectFromDB extends TEntitiesDb.Objects> {
	code: TBasic.CodeAnswer;
	data: ObjectFromDB[] | undefined;
}

export interface Add<ObjectFromDB extends TEntitiesDb.Objects> {
	code: TBasic.CodeAnswer;
	data: ObjectFromDB | undefined;
}

export interface Delete {
	code: TBasic.CodeAnswer;
	data: Record<string, never> | undefined;
}

export interface RequestOptions {
	method: TBasic.MethodHttp;
  headers: {
    'Content-Type': string;
    [key: string]: string;
  };
  body?: string | FormData;
}