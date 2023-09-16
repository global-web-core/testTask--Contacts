import { TBasic } from "../../typesAndInterfaces/types";

export enum PageAction {
  CHANGE = 'PAGE/CHANGE'
}

interface IChangePageAction {
  type: PageAction.CHANGE;
  payload: TBasic.Pages;
}

export type TPageAction = IChangePageAction;

export const changePage = (payload: TBasic.Pages): IChangePageAction => ({
  type: PageAction.CHANGE,
  payload,
});