import { IUsers } from "../../typesAndInterfaces/interfaces";

export enum UserAction {
  ADD = 'USER/ADD',
	CLEAR = 'USER/CLEAR',
}

interface IAddUserAction {
  type: UserAction.ADD;
  payload: IUsers.Db;
}

interface IClearAllUsersAction {
  type: UserAction.CLEAR;
}

export type TUserAction = IAddUserAction | IClearAllUsersAction;

export const addUser = (payload: IUsers.Db): IAddUserAction => ({
  type: UserAction.ADD,
  payload,
});

export const clearUser = (): IClearAllUsersAction => ({
  type: UserAction.CLEAR,
});