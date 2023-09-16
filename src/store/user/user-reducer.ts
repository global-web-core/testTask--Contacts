import { IUsers } from "../../typesAndInterfaces/interfaces";
import { TUserAction, UserAction } from "./user-actions";

interface UserState {
  data: IUsers.Db | null;
}

const initialState: UserState = {
  data: null,
};

const userReducer = (state = initialState, action: TUserAction): UserState => {
  switch (action.type) {
    case UserAction.ADD:
      return {
        ...state,
        data: action.payload,
      };
		case UserAction.CLEAR:
      return {
        ...state,
        data: null,
      };
    default:
      return state;
  }
};

export { userReducer, UserAction };
export type { UserState };