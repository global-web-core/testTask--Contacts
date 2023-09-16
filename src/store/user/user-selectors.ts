import { RootState } from "../store";

export const userSelect = (state: RootState): RootState["user"] => state.user;