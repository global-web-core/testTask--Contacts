import { namePages } from "../../globals/constants/constants";
import { TBasic } from "../../typesAndInterfaces/types";
import { TPageAction, PageAction } from "./page-actions";

interface PageState {
  current: TBasic.Pages;
}

const initialState: PageState = {
  current: namePages.login,
};

const pageReducer = (state = initialState, action: TPageAction): PageState => {
  switch (action.type) {
    case PageAction.CHANGE:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};

export { pageReducer, PageAction };
export type { PageState };